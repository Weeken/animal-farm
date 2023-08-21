import { withGrid } from '../../../utils'
import { BaseTree, BaseTreeConfig } from './BaseTree'
import { fruitTreeAnimations } from './animationConfig'

type FruitTreeTopConfig = Pick<BaseTreeConfig, 'x' | 'y' | 'type'>

export class FruitTreeStump extends BaseTree {
	width: number = withGrid(3)
	height: number = withGrid(3)
	id: string = ''
	constructor(config: FruitTreeTopConfig) {
		super({
			...config,
			ctx: window.myGameGlobalData.ctx.down,
			animations: {
				growUp: fruitTreeAnimations({ x: withGrid(config.x), y: withGrid(config.y) }, window.myGameGlobalData.ctx.down)
					.growUp.stump
			}
		})
	}
}
