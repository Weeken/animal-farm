import { VIEW_OFFSET, withGrid } from '../../../utils'
import { Animation, AnimationConfig } from '../../Animation'
import { Movable } from '../../Movable'
import { AnimationInfo } from './animationConfig'

export type TreeType = 'common' | 'apple' | 'peach' | 'pear' | 'orange'

enum TREE_ACTION {
	GROW_UP = 'growUp',
	BEING_CUTTING_LEFT = 'beingCuttingLeft',
	BEING_CUTTING_RIGHT = 'beingCuttingRight'
}

export interface BaseTreeConfig {
	x: number
	y: number
	width?: number
	height?: number
	type: TreeType
	// state: TreeState
	// matureTime?: number
	// image: HTMLImageElement
	ctx: CanvasRenderingContext2D
	animations: {
		growUp: AnimationInfo
	}
}

export class BaseTree extends Movable {
	x: number
	y: number
	width: number = withGrid(3)
	height: number = withGrid(3)

	image: HTMLImageElement
	ctx: CanvasRenderingContext2D
	type: TreeType

	currentAction: TREE_ACTION = TREE_ACTION.GROW_UP

	animations: {
		growUp: AnimationInfo
	}

	growUp: Animation

	constructor(config: BaseTreeConfig) {
		super({ x: withGrid(config.x), y: withGrid(config.y) })

		const treeImgs = window.myGameGlobalData.assets.fruitTree as LoadedAssets
		this.x = withGrid(config.x) + VIEW_OFFSET.x
		this.y = withGrid(config.y) + VIEW_OFFSET.y
		this.type = config.type
		this.image = treeImgs[config.type] as HTMLImageElement
		this.ctx = config.ctx

		this.animations = config.animations

		this.growUp = this.createAnimation({ ...this.animations.growUp, image: this.image })
	}

	createAnimation(config: AnimationConfig) {
		return new Animation(config)
	}

	action() {
		if (this.currentAction === TREE_ACTION.GROW_UP) {
			this.growUp.x = this.x
			this.growUp.y = this.y
			this.growUp.playOnce()
		}
	}
}
