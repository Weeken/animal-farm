import { VIEW_OFFSET, withGrid, BaseRect } from '../../../utils'
import { Movable } from '../../Movable'
import { Animation, AnimationConfig } from '../../Animation'
import { Boundary } from '../../fixed-things/Boundary'
import { BoundaryItem } from '../../fixed-things/BoundaryItem'
import { walkingAround } from './AnimationConfig'

export enum CHICKEN_ACTION {
	SLEEPING = 'sleeping',
	STANDING = 'standing',
	WALKING = 'walking',
	EATING = 'eating'
}

export enum CHICKEN_COLOR {
	YELLOW = 'yellow',
	BLUE = 'blue',
	GREEN = 'green',
	RED = 'red',
	BROWN = 'brown'
}

export interface BaseChickenConfig {
	x: number
	y: number
	width?: number
	height?: number
	action?: CHICKEN_ACTION
	color?: CHICKEN_COLOR
	boundary: Boundary
}

export type ChickenInfo = Pick<BaseChickenConfig, 'x' | 'y' | 'action' | 'color'>

interface BoundaryBlock extends BaseRect {
	id: string
}

export class BaseChicken extends Movable {
	x = 0
	y = 0
	width = 0
	height = 0
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement
	boundary: Boundary
	boundaryBlock: BoundaryBlock
	targetBoundary?: BoundaryItem

	currentAction: CHICKEN_ACTION = CHICKEN_ACTION.STANDING
	color: CHICKEN_COLOR = CHICKEN_COLOR.YELLOW

	sleeping: Animation
	standing: Animation
	walking: Animation
	walkingTimer: number = 0
	eating: Animation

	constructor(config: BaseChickenConfig) {
		super({ x: config.x, y: config.y })

		const chickenImgs = (window.myGameGlobalData.assets.animal as LoadedAssets).chicken as LoadedAssets

		const imgMap = {
			[CHICKEN_COLOR.YELLOW]: chickenImgs.yellow as HTMLImageElement,
			[CHICKEN_COLOR.BLUE]: chickenImgs.blue as HTMLImageElement,
			[CHICKEN_COLOR.GREEN]: chickenImgs.green as HTMLImageElement,
			[CHICKEN_COLOR.RED]: chickenImgs.red as HTMLImageElement,
			[CHICKEN_COLOR.BROWN]: chickenImgs.brown as HTMLImageElement
		}

		this.x = config.x + VIEW_OFFSET.x
		this.y = config.y + VIEW_OFFSET.y

		this.boundary = config.boundary
		this.boundaryBlock = {
			id: 'boundaryItem-' + config.x + '-' + config.y,
			x: config.x,
			y: config.y,
			width: withGrid(1),
			height: withGrid(1)
		}
		this.boundary.addItem({
			...this.boundaryBlock
		})
		this.targetBoundary = this.boundary.getItem(this.boundaryBlock.id)

		this.ctx = window.myGameGlobalData.ctx.middle
		this.width = config.width || withGrid(1)
		this.height = config.height || withGrid(1)
		this.currentAction = config.action || CHICKEN_ACTION.STANDING
		this.color = config.color || CHICKEN_COLOR.YELLOW
		this.image = imgMap[this.color]
		this.sleeping = this.createAnimation(0, 4, 60)
		this.standing = this.createAnimation(withGrid(1), 7)
		this.walking = this.createAnimation(withGrid(2), 8, 10, withGrid(3))
		this.eating = this.createAnimation(withGrid(12), 6, 10, withGrid(13))
	}

	createAnimation(rightImgY: number, totalFrames: number, interval = 30, leftImgY?: number) {
		const animationConfig: AnimationConfig = {
			totalFrames: totalFrames,
			interval: interval,
			x: this.x,
			y: this.y,
			imgX: 0,
			leftImgY: leftImgY || rightImgY,
			rightImgY: rightImgY,
			imgWidth: withGrid(1),
			imgHeight: withGrid(1),
			width: this.width,
			height: this.height,
			ctx: this.ctx,
			image: this.image
		}
		return new Animation(animationConfig)
	}

	action() {
		if (this.currentAction === CHICKEN_ACTION.SLEEPING) {
			this.sleeping.x = this.x
			this.sleeping.y = this.y
			this.sleeping.play()
		} else if (this.currentAction === CHICKEN_ACTION.STANDING) {
			this.standing.x = this.x
			this.standing.y = this.y
			this.standing.play()
		} else if (this.currentAction === CHICKEN_ACTION.WALKING) {
			walkingAround.call(this)
		}
	}
}
