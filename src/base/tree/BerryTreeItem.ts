// import { loadImage, VIEW_OFFSET, withGrid } from '../utils'
import { Tree, TreeState } from './Tree'
import { Boundary } from '../fixed-things/Boundary'
import { hours, BaseRect, withGrid } from '../../utils'

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

interface BoundaryBlock extends BaseRect {
	id: string
}

export class BerryTreeItem extends Tree {
	boundary: Boundary
	id: string
	boundaryBlock: BoundaryBlock

	cuttingCount: number = 0

	constructor(config: BerryConfig) {
		super(config)
		this.id = `berryTree-${config.x}-${config.y}`

		this.matureTime = hours(0.5)
		this.boundary = config.boundary
		this.boundaryBlock = {
			id: 'boundaryItem-' + config.x + '-' + config.y,
			x: config.x,
			y: config.y,
			width: withGrid(1),
			height: withGrid(1)
		}
		this.boundary.addItem({
			...this.boundaryBlock,
			ctx: this.ctx
		})
	}
}
