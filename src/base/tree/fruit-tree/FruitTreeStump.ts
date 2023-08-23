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
		const position = { x: withGrid(config.x), y: withGrid(config.y) }
		const ctx = window.myGameGlobalData.ctx.down
		super({
			...config,
			animations: {
				static: fruitTreeAnimations(position, ctx).static.stump,
				growUp: fruitTreeAnimations(position, ctx).growUp.stump,
				leftShake: fruitTreeAnimations(position, ctx).leftShake.stump,
				rightShake: fruitTreeAnimations(position, ctx).rightShake.stump
			}
		})
		this.id = `treeStump-${config.x}-${config.y}`
		this.boundary = config.boundary
		this.boundaryBlock = {
			id: 'boundaryItem-' + withGrid(config.x + 1) + '-' + withGrid(config.y + 2),
			x: withGrid(config.x + 1),
			y: withGrid(config.y + 2),
			width: withGrid(1),
			height: withGrid(0.8)
		}
		this.boundary.addItem({
			...this.boundaryBlock
		})
	}
}
