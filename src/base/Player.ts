import { VIEW_OFFSET, withGrid, BaseRect, Position, screenCenter, ROLE_WIDTH, ROLE_HEIGHT } from '../utils'
// import PlayerImg from '../assets/premium-player.png'
import { Animation, AnimationConfig } from './Animation'

// interface PlayerConfig {}

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
	image: HTMLImageElement
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
	standingDown: Animation
	standingUp: Animation
	standingLeft: Animation
	standingRight: Animation
	// 行走动画
	movingDown: Animation
	movingUp: Animation
	movingLeft: Animation
	movingRight: Animation
	// 挖土动画
	diggingDown: Animation
	diggingUp: Animation
	diggingLeft: Animation
	diggingRight: Animation
	// 砍伐动画
	cuttingDown: Animation
	cuttingUp: Animation
	cuttingLeft: Animation
	cuttingRight: Animation
	// 浇水动画
	wateringDown: Animation
	wateringUp: Animation
	wateringLeft: Animation
	wateringRight: Animation

	constructor() {
		this.ctx = window.myGameGlobalData.ctx.middle
		this.image = window.myGameGlobalData.assets.player as HTMLImageElement
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

		this.standingDown = this.createAnimation(0, 8)
		this.standingUp = this.createAnimation(withGrid(3), 8)
		this.standingLeft = this.createAnimation(withGrid(6), 8)
		this.standingRight = this.createAnimation(withGrid(9), 8)
		//
		this.movingDown = this.createAnimation(withGrid(12))
		this.movingUp = this.createAnimation(withGrid(15))
		this.movingRight = this.createAnimation(withGrid(18))
		this.movingLeft = this.createAnimation(withGrid(21))
		//
		this.diggingDown = this.createAnimation(withGrid(36))
		this.diggingUp = this.createAnimation(withGrid(39))
		this.diggingLeft = this.createAnimation(withGrid(42))
		this.diggingRight = this.createAnimation(withGrid(45))
		//
		this.cuttingDown = this.createAnimation(withGrid(48))
		this.cuttingUp = this.createAnimation(withGrid(51))
		this.cuttingLeft = this.createAnimation(withGrid(54))
		this.cuttingRight = this.createAnimation(withGrid(57))
		//
		this.wateringDown = this.createAnimation(withGrid(60), 8)
		this.wateringUp = this.createAnimation(withGrid(63), 8)
		this.wateringLeft = this.createWateringAnimation(withGrid(66), 8, true)
		this.wateringRight = this.createWateringAnimation(withGrid(69))
	}

	createWateringAnimation(imgY: number, interval = 8, isLeft = false) {
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
			image: this.image
		}
		return new Animation(animationConfig)
	}

	createAnimation(imgY: number, interval = 4) {
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
			image: this.image
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
			this.diggingCount++
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
