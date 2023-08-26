import { Movable } from '../Movable'
import { VIEW_OFFSET, withGrid } from '../../utils'
import { PlantField } from '../Field/PlantField'
import { PlantType, plantPosition } from './position'

export type PlantState = 'gemmiparous' | 'growing' | 'fruitful' | 'mature'

export interface PlantConfig {
	// x: number
	// y: number
	width?: number
	height?: number
	state?: PlantState
	type: PlantType
	field: PlantField
}

export class Plant extends Movable {
	x = 0
	y = 0
	width = 0
	height = 0
	image: HTMLImageElement
	ctx: CanvasRenderingContext2D
	state: PlantState = 'gemmiparous'
	field: PlantField
	type: PlantType
	id: string = ''
	createTime = 0
	constructor(config: PlantConfig) {
		super({ x: config.field.x, y: config.field.y })
		// this.x = config.x + VIEW_OFFSET.x
		// this.y = config.y + VIEW_OFFSET.y - withGrid(0.2)
		this.x = config.field.x
		this.y = config.field.y
		this.width = config.width || withGrid(1)
		this.height = config.height || withGrid(1)
		this.ctx = window.myGameGlobalData.ctx.down
		this.image = window.myGameGlobalData.assets.farmingPlant as HTMLImageElement
		this.state = config.state || 'gemmiparous'
		this.type = config.type
		this.field = config.field
		this.createTime = +new Date()
		this.id = `plant-${this.createTime}`
	}

	growUp() {
		if (this.state === 'mature') return
		if (Date.now() - this.createTime >= 30000) {
			if (this.state === 'gemmiparous') {
				this.state = 'growing'
				this.createTime = Date.now()
			} else if (this.state === 'growing') {
				this.state = 'fruitful'
				this.createTime = Date.now()
			} else if (this.state === 'fruitful') {
				this.state = 'mature'
			}
		}
	}

	draw() {
		const positionX = this.x + VIEW_OFFSET.x
		const positionY = this.y + VIEW_OFFSET.y - withGrid(0.2)
		const framePositionX = {
			gemmiparous: 0,
			growing: withGrid(1),
			fruitful: withGrid(2),
			mature: withGrid(3)
		}

		this.growUp()

		if (this.field) {
			// this.ctx.fillStyle = 'rgba(0, 0, 255, 0.2)'
			// this.ctx.fillRect(positionX, positionY, this.width, this.height)
			this.ctx.drawImage(
				this.image,
				framePositionX[this.state],
				withGrid(plantPosition[this.type].y),
				this.width,
				this.height,
				positionX,
				positionY,
				this.width,
				this.height
			)
		}
	}
}
