import { VIEW_OFFSET, withGrid } from '../../utils'
import { Movable } from '../Movable'
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
	action?: COW_ACTION
	color?: COW_COLOR
}

export class Cow extends Movable {
	x = 0
	y = 0
	width = 0
	height = 0
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement

	currentAction: COW_ACTION = COW_ACTION.STANDING
	color: COW_COLOR = COW_COLOR.YELLOW

	sleeping: Animation | null = null
	standing: Animation | null = null

	constructor(config: CowConfig) {
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

		this.ctx = window.myGameGlobalData.ctx.middle
		this.width = config.width || withGrid(2)
		this.height = config.height || withGrid(2)
		this.currentAction = config.action || COW_ACTION.STANDING
		this.color = config.color || COW_COLOR.YELLOW
		this.image = imgMap[this.color]
		this.sleeping = this.createAnimation(withGrid(8), 4, 60)
		this.standing = this.createAnimation(0, 3, 40)
	}

	createAnimation(imgY: number, totalFrames: number, interval = 30) {
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
			image: this.image
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
