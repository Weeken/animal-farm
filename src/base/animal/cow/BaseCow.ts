import { Movable } from '../../Movable'
import { Animation, AnimationConfig } from '../../Animation'
import { VIEW_OFFSET, withGrid, BaseRect } from '../../../utils'
import { Boundary } from '../../fixed-things/Boundary'
import { BoundaryItem } from '../../fixed-things/BoundaryItem'
import { walkingAround } from './animationConfig'

export enum COW_ACTION {
	SLEEPING = 'sleeping',
	STANDING = 'standing',
	WALKING = 'walking'
}

export enum COW_COLOR {
	YELLOW = 'yellow',
	PINK = 'pink',
	GREEN = 'green',
	PURPLE = 'purple',
	BROWN = 'brown'
}

interface BoundaryBlock extends BaseRect {
	id: string
}

export type AnimationInfo = Pick<
	AnimationConfig,
	'leftImgY' | 'rightImgY' | 'imgHeight' | 'totalFrames' | 'interval' | 'ctx' | 'height'
>

export interface BaseCowConfig {
	x: number
	y: number
	width?: number
	height?: number
	action?: COW_ACTION
	color?: COW_COLOR
	boundary: Boundary
	animations: {
		sleeping: AnimationInfo
		standing: AnimationInfo
		walking: AnimationInfo
	}
}

export class BaseCow extends Movable {
	x = 0
	y = 0
	width = 0
	height = 0
	// ctx: CanvasRenderingContext2D
	image: HTMLImageElement

	boundary: Boundary
	boundaryBlock: BoundaryBlock
	targetBoundary?: BoundaryItem

	currentAction: COW_ACTION = COW_ACTION.STANDING
	color: COW_COLOR = COW_COLOR.YELLOW

	animations: {
		sleeping: AnimationInfo
		standing: AnimationInfo
		walking: AnimationInfo
	}

	sleeping: Animation
	standing: Animation
	walking: Animation
	walkingTimer: number = 0

	constructor(config: BaseCowConfig) {
		super({ x: config.x, y: config.y })

		const cowImgs = (window.myGameGlobalData.assets.animal as LoadedAssets).cow as LoadedAssets

		const imgMap = {
			[COW_COLOR.YELLOW]: cowImgs.yellow as HTMLImageElement,
			[COW_COLOR.PINK]: cowImgs.pink as HTMLImageElement,
			[COW_COLOR.GREEN]: cowImgs.green as HTMLImageElement,
			[COW_COLOR.PURPLE]: cowImgs.purple as HTMLImageElement,
			[COW_COLOR.BROWN]: cowImgs.brown as HTMLImageElement
		}
		this.x = config.x + VIEW_OFFSET.x
		this.y = config.y + VIEW_OFFSET.y

		// this.ctx = window.myGameGlobalData.ctx.upper
		this.width = config.width || withGrid(2)
		// this.height = config.height || withGrid(1.4)
		this.currentAction = config.action || COW_ACTION.STANDING
		this.color = config.color || COW_COLOR.YELLOW
		this.image = imgMap[this.color]

		this.boundary = config.boundary
		this.boundary = config.boundary
		this.boundaryBlock = {
			id: 'boundaryItem-' + (config.x + withGrid(0.2)) + '-' + (config.y + withGrid(1.2)),
			x: config.x + withGrid(0.2),
			y: config.y + withGrid(1.2),
			width: withGrid(1.6),
			height: withGrid(0.6)
		}
		this.boundary.addItem({
			...this.boundaryBlock
		})
		this.targetBoundary = this.boundary.getItem(this.boundaryBlock.id)

		this.animations = config.animations

		this.sleeping = this.createAnimation(this.animations.sleeping)
		this.standing = this.createAnimation(this.animations.standing)
		this.walking = this.createAnimation(this.animations.walking)
	}

	createAnimation(info: AnimationInfo) {
		const animationConfig: AnimationConfig = {
			totalFrames: info.totalFrames,
			interval: info.interval,
			x: this.x,
			y: this.y,
			imgX: 0,
			leftImgY: info.leftImgY,
			rightImgY: info.rightImgY,
			imgWidth: withGrid(2),
			imgHeight: info.imgHeight, // withGrid(1.4),
			width: this.width,
			height: info.height,
			ctx: info.ctx,
			image: this.image
		}
		return new Animation(animationConfig)
	}

	action() {
		// [this.standing, this.walking, this.standing, this.walking]
		if (this.currentAction === COW_ACTION.SLEEPING) {
			this.sleeping.x = this.x
			this.sleeping.y = this.y
			this.sleeping.play()
		} else if (this.currentAction === COW_ACTION.STANDING) {
			this.standing.x = this.x
			this.standing.y = this.y
			this.standing.play()
		} else if (this.currentAction === COW_ACTION.WALKING) {
			walkingAround.call(this)
		}
	}
}
