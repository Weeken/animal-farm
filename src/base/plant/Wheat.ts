import { Movable } from '../Movable'
// import WheatImg from '../../assets/wheat.png'
import { VIEW_OFFSET, withGrid } from '../../utils'
import { PlantField } from '../Field/PlantField'

export type PlantState = 'gemmiparous' | 'growing' | 'fruitful' | 'mature'

export interface WheatConfig {
	x: number
	y: number
	width?: number
	height?: number
	state?: PlantState
	field: PlantField
}

export class Wheat extends Movable {
	x = 0
	y = 0
	width = 0
	height = 0
	// src = WheatImg
	image: HTMLImageElement
	ctx: CanvasRenderingContext2D
	state: PlantState = 'gemmiparous'
	field: PlantField
	id: string = ''
	createTime = 0
	constructor(config: WheatConfig) {
		super({ x: config.x, y: config.y })
		this.x = config.x
		this.y = config.y
		this.width = config.width || withGrid(1)
		this.height = config.height || withGrid(1)
		this.ctx = window.myGameGlobalData.ctx.middle
		this.image = (window.myGameGlobalData.assets.crop as LoadedAssets).wheat as HTMLImageElement
		this.state = config.state || 'gemmiparous'
		this.field = config.field
		this.id = `wheat-${this.x}-${this.y}`
		this.createTime = +new Date()
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
				0,
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
