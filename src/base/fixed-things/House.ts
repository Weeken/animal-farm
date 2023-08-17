import { Player } from '../newPlayer'
import { VIEW_OFFSET, isHitting } from '../../utils'
import { Movable } from '../Movable'

interface HouseConfig {
	player?: Player
	x: number
	y: number
	width: number
	height: number
}

export class House extends Movable {
	ctx: CanvasRenderingContext2D
	player: Player | undefined
	image: HTMLImageElement

	x = 0
	y = 0
	width = 0
	height = 0

	isShow = true

	constructor(config: HouseConfig) {
		super({ x: config.x, y: config.y })
		this.player = config.player || undefined
		this.x = config.x
		this.y = config.y
		this.width = config.width
		this.height = config.height
		this.ctx = window.myGameGlobalData.ctx.upper
		this.image = (window.myGameGlobalData.assets.building as LoadedAssets).houseRoot as HTMLImageElement
	}

	draw() {
		let width = this.width
		if (this.player && isHitting(this.player.collisionGrid, this)) {
			width = 0
		}
		this.ctx.drawImage(
			this.image,
			0,
			0,
			width,
			this.height,
			this.x + VIEW_OFFSET.x,
			this.y + VIEW_OFFSET.y,
			width,
			this.height
		)
	}
}
