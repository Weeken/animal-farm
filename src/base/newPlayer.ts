import { loadImage, VIEW_OFFSET, withGrid, BaseRect, Position, screenCenter, ROLE_WIDTH, ROLE_HEIGHT } from '../utils'
import PlayerImg from '../assets/premium-player.png'
import { Animation, AnimationConfig } from './Animation'

interface PlayerConfig {
	ctx: CanvasRenderingContext2D
}

export enum ACTION {
	STANDING = 'standing',
	MOVING = 'moving',
	DIGGING = 'digging',
	CUTTING = 'cutting',
	WATERING = 'watering'
}

export enum DIRECTION {
	DOWN = 'down',
	UP = 'up',
	LEFT = 'left',
	RIGHT = 'right'
}

export class Player {
	image: HTMLImageElement | null = null
	ctx: CanvasRenderingContext2D
	// 固定在视窗中间的位置
	position: Position = {
		x: screenCenter.x,
		y: screenCenter.y
	}
	// 相对于地图的坐标
	x = screenCenter.x - VIEW_OFFSET.x
	y = screenCenter.y - VIEW_OFFSET.y

	// 宽高
	width = ROLE_WIDTH
	height = ROLE_HEIGHT

	// 朝向
	towardDirection = DIRECTION.DOWN

	// 当前方向的下一格
	nextGrid: BaseRect = {
		x: 0,
		y: 0,
		width: withGrid(1),
		height: withGrid(1)
	}

	// 碰撞检测位置大小
	collisionGrid: BaseRect = {
		x: 0,
		y: 0,
		width: withGrid(1),
		height: withGrid(1)
	}

	// 当前动作
	currentAction = ACTION.STANDING

	//
	diggingCount = 0

	// 站立动画
	standingDown: Animation | null = null
	standingUp: Animation | null = null
	standingLeft: Animation | null = null
	standingRight: Animation | null = null
	// 行走动画
	movingDown: Animation | null = null
	movingUp: Animation | null = null
	movingLeft: Animation | null = null
	movingRight: Animation | null = null
	// 挖土动画
	diggingDown: Animation | null = null
	diggingUp: Animation | null = null
	diggingLeft: Animation | null = null
	diggingRight: Animation | null = null
	// 砍伐动画
	cuttingDown: Animation | null = null
	cuttingUp: Animation | null = null
	cuttingLeft: Animation | null = null
	cuttingRight: Animation | null = null
	// 浇水动画
	wateringDown: Animation | null = null
	wateringUp: Animation | null = null
	wateringLeft: Animation | null = null
	wateringRight: Animation | null = null

	constructor(config: PlayerConfig) {
		this.ctx = config.ctx
		this.nextGrid = {
			x: this.x + withGrid(1),
			y: this.y + withGrid(1),
			width: withGrid(1),
			height: withGrid(1)
		}
		this.collisionGrid = {
			x: this.x + withGrid(1),
			y: this.y + withGrid(1),
			width: withGrid(1),
			height: withGrid(1)
		}
		loadImage(PlayerImg).then(img => {
			this.image = img
			this.standingDown = this.createAnimation(img, 0, 8)
			this.standingUp = this.createAnimation(img, withGrid(3), 8)
			this.standingLeft = this.createAnimation(img, withGrid(6), 8)
			this.standingRight = this.createAnimation(img, withGrid(9), 8)
			//
			this.movingDown = this.createAnimation(img, withGrid(12))
			this.movingUp = this.createAnimation(img, withGrid(15))
			this.movingRight = this.createAnimation(img, withGrid(18))
			this.movingLeft = this.createAnimation(img, withGrid(21))
			//
			this.diggingDown = this.createAnimation(img, withGrid(36))
			this.diggingUp = this.createAnimation(img, withGrid(39))
			this.diggingLeft = this.createAnimation(img, withGrid(42))
			this.diggingRight = this.createAnimation(img, withGrid(45))
			//
			this.cuttingDown = this.createAnimation(img, withGrid(48))
			this.cuttingUp = this.createAnimation(img, withGrid(51))
			this.cuttingLeft = this.createAnimation(img, withGrid(54))
			this.cuttingRight = this.createAnimation(img, withGrid(57))
			//
			this.wateringDown = this.createAnimation(img, withGrid(60), 8)
			this.wateringUp = this.createAnimation(img, withGrid(63), 8)
			this.wateringLeft = this.createWateringAnimation(img, withGrid(66), 8, true)
			this.wateringRight = this.createWateringAnimation(img, withGrid(69))
		})
	}

	createWateringAnimation(img: HTMLImageElement, imgY: number, interval = 8, isLeft = false) {
		const animationConfig: AnimationConfig = {
			totalFrames: 8,
			interval: interval,
			x: !isLeft ? this.position.x : this.position.x - withGrid(1),
			y: this.position.y,
			imgX: 0,
			imgY: imgY,
			imgWidth: withGrid(4),
			imgHeight: withGrid(3),
			width: withGrid(4),
			height: this.height,
			ctx: this.ctx,
			image: img || this.image
		}
		return new Animation(animationConfig)
	}

	createAnimation(img: HTMLImageElement, imgY: number, interval = 4) {
		const animationConfig: AnimationConfig = {
			totalFrames: 8,
			interval: interval,
			x: this.position.x,
			y: this.position.y,
			imgX: 0,
			imgY: imgY,
			imgWidth: withGrid(3),
			imgHeight: withGrid(3),
			width: this.width,
			height: this.height,
			ctx: this.ctx,
			image: img || this.image
		}
		return new Animation(animationConfig)
	}

	selectAction(action: ACTION) {
		this.currentAction = action
	}

	resetToStanding() {
		this.currentAction = ACTION.STANDING
	}

	action() {
		if (this.currentAction === ACTION.STANDING) {
			switch (this.towardDirection) {
				case DIRECTION.DOWN:
					this.standingDown?.play()
					break
				case DIRECTION.UP:
					this.standingUp?.play()
					break
				case DIRECTION.LEFT:
					this.standingLeft?.play()
					break
				case DIRECTION.RIGHT:
					this.standingRight?.play()
					break
				default:
					this.standingDown?.play()
					break
			}
		} else if (this.currentAction === ACTION.MOVING) {
			switch (this.towardDirection) {
				case DIRECTION.DOWN:
					this.movingDown?.play()
					break
				case DIRECTION.UP:
					this.movingUp?.play()
					break
				case DIRECTION.LEFT:
					this.movingLeft?.play()
					break
				case DIRECTION.RIGHT:
					this.movingRight?.play()
					break
				default:
					this.movingDown?.play()
					break
			}
		} else if (this.currentAction === ACTION.DIGGING) {
			switch (this.towardDirection) {
				case DIRECTION.DOWN:
					this.diggingDown?.play()
					break
				case DIRECTION.UP:
					this.diggingUp?.play()
					break
				case DIRECTION.LEFT:
					this.diggingLeft?.play()
					break
				case DIRECTION.RIGHT:
					this.diggingRight?.play()
					break
				default:
					this.diggingDown?.play()
					break
			}
		} else if (this.currentAction === ACTION.CUTTING) {
			switch (this.towardDirection) {
				case DIRECTION.DOWN:
					this.cuttingDown?.play()
					break
				case DIRECTION.UP:
					this.cuttingUp?.play()
					break
				case DIRECTION.LEFT:
					this.cuttingLeft?.play()
					break
				case DIRECTION.RIGHT:
					this.cuttingRight?.play()
					break
				default:
					this.cuttingDown?.play()
					break
			}
		} else if (this.currentAction === ACTION.WATERING) {
			switch (this.towardDirection) {
				case DIRECTION.DOWN:
					this.wateringDown?.play()
					break
				case DIRECTION.UP:
					this.wateringUp?.play()
					break
				case DIRECTION.LEFT:
					this.wateringLeft?.play()
					break
				case DIRECTION.RIGHT:
					this.wateringRight?.play()
					break
				default:
					this.wateringDown?.play()
					break
			}
		}
	}
}