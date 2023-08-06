import { Tree, TreeConfig } from './Tree'
import { Boundary } from './Boundary'
import { withGrid } from '../utils'
import { Player } from './Player'
import { AppleTree } from './AppleTree'

interface AppleTreeConfig extends TreeConfig {
	boundary: Boundary
	player: Player
	parent: AppleTree
	id: string
}

interface BoundaryBlock {
	id: string
	x: number
	y: number
	width: number
	height: number
}

export class AppleTreeStump extends Tree {
	boundary: Boundary
	player: Player
	parent: AppleTree

	boundaryBlock: BoundaryBlock

	cuttingCount: number = 0
	id: string = ''
	constructor(config: AppleTreeConfig) {
		super(config)
		this.boundary = config.boundary
		this.player = config.player
		this.parent = config.parent
		this.id = config.id
		this.boundaryBlock = {
			id: 'boundaryItem-' + config.x + '-' + (config.y + withGrid(0.5)),
			x: config.x,
			y: config.y + withGrid(0.5),
			width: withGrid(1),
			height: withGrid(0.5)
		}
		if (this.boundary) {
			this.boundary.addItem({
				...this.boundaryBlock,
				ctx: this.ctx
			})
		}
	}
}
