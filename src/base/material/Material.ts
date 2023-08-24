import { Position, withGrid } from '../../utils'
import { MaterialType, materialPosition } from './position'

export interface MaterialConfig {
	type: MaterialType
	count: number
	position: Position
	ctx: CanvasRenderingContext2D
	isShow: boolean
}

export class Material {
	type: MaterialType
	count = 1
	position: Position
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement
	isShow = false
	constructor(config: MaterialConfig) {
		this.type = config.type
		this.count = config.count
		this.position = config.position
		this.ctx = config.ctx
		this.isShow = config.isShow
		this.image = window.myGameGlobalData.assets.materials as HTMLImageElement
	}

	draw() {
		if (!this.isShow) return
		this.ctx.drawImage(
			this.image,
			withGrid(materialPosition[this.type].x),
			withGrid(materialPosition[this.type].y),
			withGrid(1),
			withGrid(1),
			this.position.x + 4,
			this.position.y + 10,
			withGrid(1) - 20,
			withGrid(1) - 20
		)
		this.ctx.font = 'bold 16px Microsoft Yahei'
		this.ctx.fillStyle = 'white'
		this.ctx.fillText(`${this.count}`, this.position.x + withGrid(1) - 20, this.position.y + withGrid(1) - 10)
	}
}
