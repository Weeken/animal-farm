import { VIEW_OFFSET, withGrid } from '../../utils'
import { Movable } from '../Movable'
import { Animation, AnimationConfig } from '../Animation'

export enum CHICKEN_ACTION {
	SLEEPING = 'sleeping',
	STANDING = 'standing'
}

export enum CHICKEN_COLOR {
	YELLOW = 'yellow',
	BLUE = 'blue',
	GREEN = 'green',
	RED = 'red',
	BROWN = 'brown'
}

export interface ChickenConfig {
	x: number
	y: number
	width?: number
	height?: number
	action?: CHICKEN_ACTION
	color?: CHICKEN_COLOR
}

export class Chicken extends Movable {
	x = 0
	y = 0
	width = 0
	height = 0
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement

	currentAction: CHICKEN_ACTION = CHICKEN_ACTION.STANDING
	color: CHICKEN_COLOR = CHICKEN_COLOR.YELLOW

	sleeping: Animation | null = null
	standing: Animation | null = null

	constructor(config: ChickenConfig) {
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

		this.ctx = window.myGameGlobalData.ctx.middle
		this.width = config.width || withGrid(1)
		this.height = config.height || withGrid(1)
		this.currentAction = config.action || CHICKEN_ACTION.STANDING
		this.color = config.color || CHICKEN_COLOR.YELLOW
		this.image = imgMap[this.color]
		this.sleeping = this.createAnimation(0, 4, 60)
		this.standing = this.createAnimation(withGrid(1), 7)
	}

	createAnimation(imgY: number, totalFrames: number, interval = 30) {
		const animationConfig: AnimationConfig = {
			totalFrames: totalFrames,
			interval: interval,
			x: this.x,
			y: this.y,
			imgX: 0,
			rightImgY: imgY,
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
		if (this.currentAction === CHICKEN_ACTION.SLEEPING && this.sleeping) {
			this.sleeping.x = this.x
			this.sleeping.y = this.y
			this.sleeping.play()
		} else if (this.currentAction === CHICKEN_ACTION.STANDING && this.standing) {
			this.standing.x = this.x
			this.standing.y = this.y
			this.standing.play()
		}
	}
}
