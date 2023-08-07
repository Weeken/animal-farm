import { Movable } from '../Movable'
import FieldImg from '../../assets/vegetable-field-1.png'
import { loadImage, VIEW_OFFSET, withGrid } from '../../utils'

// type PlantState = 'gemmiparous' | 'growing' | 'fruitful' | 'mature'

interface PlantFieldConfig {
	x: number
	y: number
	width?: number
	height?: number
	ctx: CanvasRenderingContext2D
	// state: PlantState
}

export class PlantField extends Movable {
	x = 0
	y = 0
	width = withGrid(1)
	height = withGrid(1)
	src = FieldImg
	image: HTMLImageElement | null = null
	ctx: CanvasRenderingContext2D
	isEmpty = true
	id = ''
	constructor(config: PlantFieldConfig) {
		super({ x: config.x, y: config.y })
		this.x = config.x
		this.y = config.y
		this.width = config.width || withGrid(1)
		this.height = config.height || withGrid(1)
		this.ctx = config.ctx
		this.id = `field-${this.x}-${this.y}`
	}
	draw() {
		return new Promise(resolve => {
			const positionX = this.x + VIEW_OFFSET.x
			const positionY = this.y + VIEW_OFFSET.y
			if (this.image) {
				this.ctx.drawImage(this.image, 0, 0, 120, 120, positionX, positionY, this.width, this.height)
			} else {
				this.src &&
					loadImage(this.src).then(img => {
						this.image = img
						this.ctx.drawImage(this.image, 0, 0, 120, 120, positionX, positionY, this.width, this.height)
					})
			}
			resolve(this.image)
		})
	}
}
