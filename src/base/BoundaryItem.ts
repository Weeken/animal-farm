import { withGrid, VIEW_OFFSET } from '../utils'
import { Movable } from './Movable'

export interface BoundaryInfo {
	x: number
	y: number
	ctx: CanvasRenderingContext2D
	width?: number
	height?: number
}

export class BoundaryItem extends Movable {
	x = 0
	y = 0
	width = 0
	height = 0
	ctx: CanvasRenderingContext2D
	constructor(props: BoundaryInfo) {
		super({ x: props.x, y: props.y })
		this.x = props.x
		this.y = props.y
		this.ctx = props.ctx
		this.width = props.width || withGrid(1)
		this.height = props.height || withGrid(1)
	}

	draw() {
		this.ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'
		this.ctx.fillRect(this.x + VIEW_OFFSET.x, this.y + VIEW_OFFSET.y, this.width, this.height)
	}
}
