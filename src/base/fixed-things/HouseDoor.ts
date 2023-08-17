import { Movable } from '../Movable'
import { Player } from '../newPlayer'
import { withGrid, VIEW_OFFSET, isHitting } from '../../utils'

interface SmallDoorConfig {
	player?: Player
	x: number
	y: number
	width: number
	height: number
}

export class HouseDoor extends Movable {
	ctx: CanvasRenderingContext2D
	player: Player | undefined
	door: HTMLImageElement

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
		this.ctx = window.myGameGlobalData.ctx.middle
		this.door = (window.myGameGlobalData.assets.building as LoadedAssets).houseDoor as HTMLImageElement
	}

	draw() {
		if (this.player && isHitting(this.player.collisionGrid, this)) {
			this.gap++
			if (this.gap % 10 === 0) {
				if (!this.isOpened && this.currentFrame < this.frames - 1) {
					this.currentFrame++
					if (this.currentFrame === this.frames - 1) this.isOpened = true
				}
			}
		} else {
			this.currentFrame = 0
			this.isOpened = false
		}
		this.ctx.drawImage(
			this.door,
			this.currentFrame * this.width,
			0,
			withGrid(1),
			withGrid(1),
			this.x + VIEW_OFFSET.x,
			this.y + VIEW_OFFSET.y,
			withGrid(1),
			withGrid(1)
		)
	}
}
