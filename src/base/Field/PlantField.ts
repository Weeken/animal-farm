import { Movable } from '../Movable'
// import FieldImg from '../../assets/vegetable-field-1.png'
import { VIEW_OFFSET, withGrid } from '../../utils'

// type PlantState = 'gemmiparous' | 'growing' | 'fruitful' | 'mature'

interface PlantFieldConfig {
	x: number
	y: number
	width?: number
	height?: number
}

export class PlantField extends Movable {
	x = 0
	y = 0
	width = withGrid(1)
	height = withGrid(1)
	// src = FieldImg
	image: HTMLImageElement
	ctx: CanvasRenderingContext2D
	isEmpty = true
	id = ''
	constructor(config: PlantFieldConfig) {
		super({ x: config.x, y: config.y })
		this.x = config.x
		this.y = config.y
		this.width = config.width || withGrid(1)
		this.height = config.height || withGrid(1)
		this.ctx = window.myGameGlobalData.ctx.down
		this.image = (window.myGameGlobalData.assets.building as LoadedAssets).field as HTMLImageElement
		this.id = `field-${Date.now()}`
	}
	draw() {
		const positionX = this.x + VIEW_OFFSET.x
		const positionY = this.y + VIEW_OFFSET.y
		this.ctx.drawImage(this.image, 0, 0, 120, 120, positionX, positionY, this.width, this.height)
	}
}
