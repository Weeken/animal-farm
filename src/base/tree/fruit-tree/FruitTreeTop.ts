import { withGrid } from '../../../utils'
import { BaseTree, BaseTreeConfig } from './BaseTree'
import { fruitTreeAnimations } from './animationConfig'

type FruitTreeTopConfig = Pick<BaseTreeConfig, 'x' | 'y' | 'type'>

export class FruitTreeTop extends BaseTree {
	width: number = withGrid(3)
	height: number = withGrid(3)
	id: string = ''
	constructor(config: FruitTreeTopConfig) {
		const position = { x: withGrid(config.x), y: withGrid(config.y) }
		const ctx = window.myGameGlobalData.ctx.upper
		super({
			...config,
			animations: {
				static: fruitTreeAnimations(position, ctx).static.top,
				growUp: fruitTreeAnimations(position, ctx).growUp.top,
				leftShake: fruitTreeAnimations(position, ctx).leftShake.top,
				rightShake: fruitTreeAnimations(position, ctx).rightShake.top
			}
		})
		this.id = `treeTop-${config.x}-${config.y}`
	}
}
