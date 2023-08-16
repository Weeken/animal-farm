import { loadImage, VIEW_OFFSET, withGrid } from '../../utils'
import { Movable } from '../Movable'
import ChickenImg from '../../assets/chicken-default.png'
import { Animation, AnimationConfig } from '../Animation'

export enum CHICKEN_ACTION {
	SLEEPING = 'sleeping',
	STANDING = 'standing'
}

export interface ChickenConfig {
	x: number
	y: number
	width?: number
	height?: number
	ctx: CanvasRenderingContext2D
	action?: CHICKEN_ACTION
}
export class Chicken extends Movable {
	x = 0
	y = 0
	width = 0
	height = 0
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement | null = null

	currentAction: CHICKEN_ACTION = CHICKEN_ACTION.STANDING

	sleeping: Animation | null = null
	standing: Animation | null = null

	constructor(config: ChickenConfig) {
		super({ x: config.x, y: config.y })
		this.x = config.x + VIEW_OFFSET.x
		this.y = config.y + VIEW_OFFSET.y

		this.ctx = config.ctx
		this.width = config.width || withGrid(1)
		this.height = config.height || withGrid(1)
		this.currentAction = config.action || CHICKEN_ACTION.STANDING
		loadImage(ChickenImg).then(img => {
			this.sleeping = this.createAnimation(img, 0, 4, 60)
			this.standing = this.createAnimation(img, withGrid(1), 7)
		})
	}

	createAnimation(img: HTMLImageElement, imgY: number, totalFrames: number, interval = 30) {
		const animationConfig: AnimationConfig = {
			totalFrames: totalFrames,
			interval: interval,
			x: this.x,
			y: this.y,
			imgX: 0,
			imgY: imgY,
			imgWidth: withGrid(1),
			imgHeight: withGrid(1),
			width: this.width,
			height: this.height,
			ctx: this.ctx,
			image: img || this.image
		}
		return new Animation(animationConfig)
	}

	action() {
		if (this.currentAction === CHICKEN_ACTION.SLEEPING) {
			this.sleeping?.play(this.x, this.y)
		} else if (this.currentAction === CHICKEN_ACTION.STANDING) {
			this.standing?.play(this.x, this.y)
		}
	}
}
