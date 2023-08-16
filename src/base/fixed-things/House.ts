import { Player } from '../newPlayer'
import { loadImage, VIEW_OFFSET, isHitting } from '../../utils'
import { Movable } from '../Movable'

interface HouseConfig {
	player?: Player
	x: number
	y: number
	width: number
	height: number
	ctx: CanvasRenderingContext2D
	src: string
}

export class House extends Movable {
	ctx: CanvasRenderingContext2D
	player: Player | undefined
	image: HTMLImageElement | null = null
	src = ''

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
		this.ctx = config.ctx
		this.src = config.src
	}

	draw() {
		return new Promise(resolve => {
			let width = this.width
			if (this.player && isHitting(this.player, this)) {
				width = 0
			}
			if (this.image) {
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
			} else {
				this.src &&
					loadImage(this.src).then(img => {
						this.image = img
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
					})
			}
			resolve(this.image)
		})
	}
}
