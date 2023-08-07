import { Movable } from './Movable'
import WheatImg from '../assets/wheat.png'
import { loadImage, VIEW_OFFSET } from '../utils'
import { PlantField } from './Field/PlantField'

export type PlantState = 'gemmiparous' | 'growing' | 'fruitful' | 'mature'

interface WheatConfig {
	x: number
	y: number
	width: number
	height: number
	ctx: CanvasRenderingContext2D
	state: PlantState
	field: PlantField
}

export class Wheat extends Movable {
	x = 0
	y = 0
	width = 0
	height = 0
	src = WheatImg
	image: HTMLImageElement | null = null
	ctx: CanvasRenderingContext2D
	field: PlantField
	constructor(config: WheatConfig) {
		super({ x: config.x, y: config.y })
		this.x = config.x
		this.y = config.y
		this.width = config.width
		this.height = config.height
		this.ctx = config.ctx
		this.field = config.field
	}
	draw() {
		return new Promise(resolve => {
			const positionX = this.x + VIEW_OFFSET.x
			const positionY = this.y + VIEW_OFFSET.y
			if (this.field) {
				if (this.image) {
					this.ctx.drawImage(this.image, 0, 0, this.width, this.height, positionX, positionY, this.width, this.height)
				} else {
					this.src &&
						loadImage(this.src).then(img => {
							this.image = img
							this.ctx.drawImage(
								this.image,
								0,
								0,
								this.width,
								this.height,
								positionX,
								positionY,
								this.width,
								this.height
							)
						})
				}
			}
			resolve(this.image)
		})
	}
}
