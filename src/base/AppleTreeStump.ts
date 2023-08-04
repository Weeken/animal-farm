import { Tree, TreeConfig } from './Tree'
import { Boundary } from './Boundary'
import { withGrid } from '../utils'

interface AppleTreeConfig extends TreeConfig {
	boundary?: Boundary
}

export class AppleTreeStump extends Tree {
	boundary: Boundary | undefined = undefined
	constructor(config: AppleTreeConfig) {
		super(config)
		this.boundary = config.boundary
		if (this.boundary) {
			this.boundary.addItem({
				x: config.x,
				y: config.y + withGrid(0.5),
				ctx: this.ctx,
				width: withGrid(1),
				height: withGrid(0.5)
			})
		}
	}
}
