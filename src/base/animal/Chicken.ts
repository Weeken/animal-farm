import { loadImage, VIEW_OFFSET, withGrid } from '../../utils'
import { Movable } from '../Movable'
import Chicken_yellow from '../../assets/chicken-default.png'
import Chicken_blue from '../../assets/chicken-blue.png'
import Chicken_green from '../../assets/chicken-green.png'
import Chicken_brown from '../../assets/chicken-brown.png'
import Chicken_red from '../../assets/chicken-red.png'
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
	ctx: CanvasRenderingContext2D
	action?: CHICKEN_ACTION
	color?: CHICKEN_COLOR
}

const imgMap = {
	[CHICKEN_COLOR.YELLOW]: Chicken_yellow,
	[CHICKEN_COLOR.BLUE]: Chicken_blue,
	[CHICKEN_COLOR.GREEN]: Chicken_green,
	[CHICKEN_COLOR.RED]: Chicken_red,
	[CHICKEN_COLOR.BROWN]: Chicken_brown
}
export class Chicken extends Movable {
	x = 0
	y = 0
	width = 0
	height = 0
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement | null = null

	currentAction: CHICKEN_ACTION = CHICKEN_ACTION.STANDING
	color: CHICKEN_COLOR = CHICKEN_COLOR.YELLOW

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
		this.color = config.color || CHICKEN_COLOR.YELLOW
		loadImage(imgMap[this.color]).then(img => {
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
