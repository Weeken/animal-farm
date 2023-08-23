import { VIEW_OFFSET, withGrid } from '../../../utils'
import { Animation, AnimationConfig } from '../../Animation'
import { Movable } from '../../Movable'
import { AnimationInfo } from './animationConfig'

export type TreeType = 'common' | 'apple' | 'peach' | 'pear' | 'orange'

export enum TREE_ACTION {
	STATIC = 'static',
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
	// ctx: CanvasRenderingContext2D
	animations: {
		static: AnimationInfo
		growUp: AnimationInfo
		leftShake: AnimationInfo
		rightShake: AnimationInfo
	}
}

export class BaseTree extends Movable {
	x: number
	y: number
	width: number = withGrid(3)
	height: number = withGrid(3)

	image: HTMLImageElement
	// ctx: CanvasRenderingContext2D
	type: TreeType

	currentAction: TREE_ACTION = TREE_ACTION.STATIC

	animations: {
		static: AnimationInfo
		growUp: AnimationInfo
		leftShake: AnimationInfo
		rightShake: AnimationInfo
	}

	static: Animation
	growUp: Animation
	leftShake: Animation
	rightShake: Animation

	isBeingCut = false
	isShaking = false
	cuttingCount: number = 0

	constructor(config: BaseTreeConfig) {
		super({ x: withGrid(config.x), y: withGrid(config.y) })

		const treeImgs = window.myGameGlobalData.assets.fruitTree as LoadedAssets
		this.x = withGrid(config.x) + VIEW_OFFSET.x
		this.y = withGrid(config.y) + VIEW_OFFSET.y
		this.type = config.type
		this.image = treeImgs[config.type] as HTMLImageElement

		this.animations = config.animations

		this.static = this.createAnimation({ ...this.animations.static, image: this.image })
		this.growUp = this.createAnimation({ ...this.animations.growUp, image: this.image })
		this.leftShake = this.createAnimation({ ...this.animations.leftShake, image: this.image })
		this.rightShake = this.createAnimation({ ...this.animations.rightShake, image: this.image })
	}

	createAnimation(config: AnimationConfig) {
		return new Animation({ ...config, isShowRect: false })
	}

	initCutting(cuttingAction: TREE_ACTION.BEING_CUTTING_RIGHT | TREE_ACTION.BEING_CUTTING_LEFT) {
		this.currentAction = cuttingAction
	}

	resetToStatic() {
		this.currentAction = TREE_ACTION.STATIC
	}

	action() {
		if (this.currentAction === TREE_ACTION.STATIC) {
			this.static.x = this.x
			this.static.y = this.y
			this.static.draw()
		} else if (this.currentAction === TREE_ACTION.GROW_UP) {
			this.growUp.x = this.x
			this.growUp.y = this.y
			this.growUp.playOnce()
		} else if (this.currentAction === TREE_ACTION.BEING_CUTTING_RIGHT) {
			this.leftShake.x = this.x
			this.leftShake.y = this.y
			this.leftShake.playOnce(() => {
				this.leftShake.resetPlayOnce()
				this.cuttingCount += 1
				this.resetToStatic()
			})
		} else if (this.currentAction === TREE_ACTION.BEING_CUTTING_LEFT) {
			this.rightShake.x = this.x
			this.rightShake.y = this.y
			this.rightShake.playOnce(() => {
				this.rightShake.resetPlayOnce()
				this.cuttingCount += 1
				this.resetToStatic()
			})
		}
	}
}
