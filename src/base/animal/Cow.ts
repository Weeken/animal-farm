import { loadImage, VIEW_OFFSET, withGrid } from '../../utils'
import { Movable } from '../Movable'
import Cow_yellow from '../../assets/light-cow.png'
import Cow_purple from '../../assets/purple-cow.png'
import Cow_green from '../../assets/green-cow.png'
import Cow_brown from '../../assets/brown-cow.png'
import Cow_pink from '../../assets/pink-cow.png'
import { Animation, AnimationConfig } from '../Animation'

export enum COW_ACTION {
	SLEEPING = 'sleeping',
	STANDING = 'standing'
}

export enum COW_COLOR {
	YELLOW = 'yellow',
	PINK = 'pink',
	GREEN = 'green',
	PURPLE = 'purple',
	BROWN = 'brown'
}

export interface CowConfig {
	x: number
	y: number
	width?: number
	height?: number
	ctx: CanvasRenderingContext2D
	action?: COW_ACTION
	color?: COW_COLOR
}

const imgMap = {
	[COW_COLOR.YELLOW]: Cow_yellow,
	[COW_COLOR.PINK]: Cow_pink,
	[COW_COLOR.GREEN]: Cow_green,
	[COW_COLOR.PURPLE]: Cow_purple,
	[COW_COLOR.BROWN]: Cow_brown
}
export class Cow extends Movable {
	x = 0
	y = 0
	width = 0
	height = 0
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement | null = null

	currentAction: COW_ACTION = COW_ACTION.STANDING
	color: COW_COLOR = COW_COLOR.YELLOW

	sleeping: Animation | null = null
	standing: Animation | null = null

	constructor(config: CowConfig) {
		super({ x: config.x, y: config.y })
		this.x = config.x + VIEW_OFFSET.x
		this.y = config.y + VIEW_OFFSET.y

		this.ctx = config.ctx
		this.width = config.width || withGrid(2)
		this.height = config.height || withGrid(2)
		this.currentAction = config.action || COW_ACTION.STANDING
		this.color = config.color || COW_COLOR.YELLOW
		loadImage(imgMap[this.color]).then(img => {
			this.sleeping = this.createAnimation(img, withGrid(8), 4, 60)
			this.standing = this.createAnimation(img, 0, 3, 40)
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
			imgWidth: withGrid(2),
			imgHeight: withGrid(2),
			width: this.width,
			height: this.height,
			ctx: this.ctx,
			image: img || this.image
		}
		return new Animation(animationConfig)
	}

	action() {
		if (this.currentAction === COW_ACTION.SLEEPING && this.sleeping) {
			this.sleeping.x = this.x
			this.sleeping.y = this.y
			this.sleeping.play()
		} else if (this.currentAction === COW_ACTION.STANDING && this.standing) {
			this.standing.x = this.x
			this.standing.y = this.y
			this.standing.play()
		}
	}
}
