import { loadImage } from "../utils"
import { Movable } from "./Movable"

interface IslandMapConfig {
  src: string // 图像路径
  x: number
  y: number
  ctx: CanvasRenderingContext2D
}

export class IslandMap extends Movable {
  x = 0
  y = 0
  src = ''
  image: HTMLImageElement | null = null
  ctx: CanvasRenderingContext2D
  constructor(config: IslandMapConfig) {
    super({x: config.x, y: config.y})
    this.x = config.x
    this.y = config.y
    this.src = config.src
    this.ctx = config.ctx
  }
  draw () {
    return new Promise((resolve) => {
      if (this.image) {
        this.ctx.drawImage(this.image, this.x, this.y)
      } else {
        this.src && loadImage(this.src).then((img) => {
          this.image = img
          this.ctx.drawImage(img, this.x, this.y)
        })
      }
      resolve(this.image)
    })
  }

  
}