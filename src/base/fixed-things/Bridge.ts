import { withGrid, VIEW_OFFSET } from '../../utils'
import { Movable } from '../Movable'

export interface BridgeInfo {
	x: number
	y: number
	width?: number
	height?: number
}

export class Bridge extends Movable {
	x = 0
	y = 0
	width = 0
	height = 0
	ctx: CanvasRenderingContext2D
	id: string = ''
	constructor(props: BridgeInfo) {
		super({ x: props.x, y: props.y })
		this.x = props.x
		this.y = props.y
		this.ctx = window.myGameGlobalData.ctx.down
		this.width = props.width || withGrid(1)
		this.height = props.height || withGrid(1)
		this.id = 'bridge--' + props.x + '-' + props.y
	}

	draw() {
		this.ctx.fillStyle = 'rgba(0, 255, 0, 0.0)'
		this.ctx.fillRect(this.x + VIEW_OFFSET.x, this.y + VIEW_OFFSET.y, this.width, this.height)
	}
}
