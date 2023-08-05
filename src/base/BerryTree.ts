// import { loadImage, VIEW_OFFSET, withGrid } from '../utils'
import { Tree, TreeState } from './Tree'
import { Boundary } from './Boundary'
import { hours } from '../utils'

export interface BerryConfig {
	x: number
	y: number
	width: number
	height: number
	src: string
	ctx: CanvasRenderingContext2D
	state: TreeState
	boundary: Boundary
}

export class BerryTree extends Tree {
	boundary: Boundary

	constructor(config: BerryConfig) {
		super(config)

		this.matureTime = hours(0.5)
		this.boundary = config.boundary
		this.boundary.addItem({
			x: config.x,
			y: config.y,
			ctx: this.ctx
		})
	}
}
