import { Movable } from "./Movable"
import { Player } from "./Player"
import { loadImage, withGrid, VIEW_OFFSET, isHitting } from "../utils"

interface SmallDoorConfig {
  player?: Player
  src: string
  x: number
  y: number
  width: number
  height: number
  ctx: CanvasRenderingContext2D
}

export class SmallDoor extends Movable {
  ctx: CanvasRenderingContext2D
  player: Player | undefined
  door: HTMLImageElement | null = null
  src = ''

  x = 0
  y = 0
  width = 0
  height = 0

  // 开门动画
  frames = 3
  currentFrame = 0
  gap = 0
  isOpened = false

  constructor(config: SmallDoorConfig) {
    super({ x: config.x, y: config.y })
    this.player = config.player || undefined
    this.x = config.x
    this.y = config.y
    this.width = config.width
    this.height = config.height
    this.ctx = config.ctx
    this.src = config.src
  }

  draw () {
    return new Promise((resolve) => {
      
      if (this.player && isHitting(this.player, this)) {
        this.gap ++
        if (this.gap % 10 === 0) {
          if (!this.isOpened && this.currentFrame < this.frames - 1) {
            this.currentFrame ++
            if (this.currentFrame === this.frames - 1) this.isOpened = true
          }
        }
      } else {
        this.currentFrame = 0
        this.isOpened = false
      }
      if (this.door) {
        this.ctx.drawImage(this.door, this.currentFrame * this.width, 0, withGrid(1), withGrid(1), this.x + VIEW_OFFSET.x, this.y + VIEW_OFFSET.y, withGrid(1), withGrid(1))
      } else {
        loadImage(this.src).then((img) => {
          this.door = img
          this.ctx.drawImage(img, this.currentFrame * this.width, 0, withGrid(1), withGrid(1), this.x + VIEW_OFFSET.x, this.y + VIEW_OFFSET.y, withGrid(1), withGrid(1))
        })
      }
      resolve(this.door)
    })
  }
}