import { withGrid, VIEW_OFFSET } from '../../utils'
import { Movable } from '../Movable'

export interface BoundaryInfo {
	x: number
	y: number
	width?: number
	height?: number
}

export class BoundaryItem extends Movable {
	x = 0
	y = 0
	width = 0
	height = 0
	ctx: CanvasRenderingContext2D
	id: string = ''
	constructor(props: BoundaryInfo) {
		super({ x: props.x, y: props.y })
		this.x = props.x
		this.y = props.y
		this.ctx = window.myGameGlobalData.ctx.down
		this.width = props.width || withGrid(1)
		this.height = props.height || withGrid(1)
		this.id = 'boundaryItem-' + props.x + '-' + props.y
	}

	// drawLine() {
	// 	this.ctx.beginPath()
	// 	const leftTop = { x: this.x + VIEW_OFFSET.x, y: this.y + VIEW_OFFSET.y }
	// 	const rightTop = { x: this.x + VIEW_OFFSET.x + this.width, y: this.y + VIEW_OFFSET.y }
	// 	const leftBottom = { x: this.x + VIEW_OFFSET.x, y: this.y + VIEW_OFFSET.y + this.height }
	// 	const rightBottom = { x: this.x + VIEW_OFFSET.x + this.width, y: this.y + VIEW_OFFSET.y + this.height }
	// 	this.ctx.moveTo(leftTop.x, leftTop.y)
	// 	this.ctx.lineTo(rightTop.x, rightTop.y)
	// 	this.ctx.lineTo(rightBottom.x, rightBottom.y)
	// 	this.ctx.lineTo(leftBottom.x, leftBottom.y)
	// 	this.ctx.closePath()
	// 	this.ctx.stroke()
	// 	this.ctx.font = 'bold 16px Microsoft Yahei'
	// 	this.ctx.fillStyle = 'black'
	// 	this.ctx.fillText(`(${this.x}, ${this.y})`, this.x + VIEW_OFFSET.x, this.y + VIEW_OFFSET.y)
	// }

	draw() {
		this.ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'
		this.ctx.fillRect(this.x + VIEW_OFFSET.x, this.y + VIEW_OFFSET.y, this.width, this.height)
	}
}
