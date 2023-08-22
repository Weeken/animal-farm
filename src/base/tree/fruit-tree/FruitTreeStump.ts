import { withGrid, BaseRect } from '../../../utils'
import { Boundary } from '../../fixed-things/Boundary'
import { BaseTree, BaseTreeConfig } from './BaseTree'
import { fruitTreeAnimations } from './animationConfig'

type FruitTreeTopConfig = Pick<BaseTreeConfig, 'x' | 'y' | 'type'> & { boundary: Boundary }

interface BoundaryBlock extends BaseRect {
	id: string
}

export class FruitTreeStump extends BaseTree {
	width: number = withGrid(3)
	height: number = withGrid(3)
	id: string = ''
	boundary: Boundary
	boundaryBlock: BoundaryBlock
	constructor(config: FruitTreeTopConfig) {
		super({
			...config,
			animations: {
				growUp: fruitTreeAnimations({ x: withGrid(config.x), y: withGrid(config.y) }, window.myGameGlobalData.ctx.down)
					.growUp.stump
			}
		})
		this.id = `treeStump-${config.x}-${config.y}`
		this.boundary = config.boundary
		this.boundaryBlock = {
			id: 'boundaryItem-' + withGrid(config.x + 0.9) + '-' + withGrid(config.y + 2),
			x: withGrid(config.x + 0.9),
			y: withGrid(config.y + 2),
			width: withGrid(1.2),
			height: withGrid(0.8)
		}
		this.boundary.addItem({
			...this.boundaryBlock
		})
	}
}
