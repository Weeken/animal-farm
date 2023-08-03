import { loadImage, VIEW_OFFSET, withGrid } from '../utils'
import { Movable } from './Movable'

export interface ChickenConfig {
	x: number
	y: number
	width: number
	frames: number
	height: number
	walkingLeftStartFrame?: number
	src: string
	ctx: CanvasRenderingContext2D
	state: 'standing' | 'moving'
}
export class Chicken extends Movable {
	x = 0
	y = 0
	width = 0
	height = 0
	src = ''
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement | null = null

	isStanding = true
	isMoving = false
	frames = 2
	currentFrame = 0
	gap = 0

	distance = withGrid(3)
	realDistance = 0
	walkingDirection = 'right'
	standingTime = 0
	walkingLeftStartFrame = 3
	state = 'standing'

	constructor(config: ChickenConfig) {
		super({ x: config.x, y: config.y })
		this.x = config.x + VIEW_OFFSET.x
		this.y = config.y + VIEW_OFFSET.y

		this.src = config.src
		this.ctx = config.ctx
		this.width = config.width
		this.height = config.height

		this.frames = config.frames
		this.walkingLeftStartFrame = config.walkingLeftStartFrame || 3
		this.state = config.state
		this.isMoving = config.state === 'moving'
		this.isStanding = config.state === 'standing'
	}

	standing() {
		if (this.isStanding) {
			this.gap++
			if (this.gap % 40 === 0) {
				if (this.currentFrame < this.frames - 1) {
					this.currentFrame++
				} else {
					this.currentFrame = 0
					this.gap = 0
				}
			}
		} else {
			this.currentFrame = 0
			this.gap = 0
		}

		return this.draw()
	}

	draw() {
		return new Promise(resolve => {
			if (this.image) {
				this.ctx.drawImage(
					this.image,
					this.currentFrame * this.width,
					0,
					this.width,
					this.height,
					this.x,
					this.y,
					this.width,
					this.height
				)
			} else {
				this.src &&
					loadImage(this.src).then(img => {
						this.image = img
						this.ctx.drawImage(
							this.image,
							this.currentFrame * this.width,
							0,
							this.width,
							this.height,
							this.x,
							this.y,
							this.width,
							this.height
						)
					})
			}

			resolve(this.image)
		})
	}

	walkStanding() {
		if (this.isStanding && this.walkingDirection === 'right') {
			// 向右走到终点之后
			this.currentFrame = 0
			// 停留2000帧的时间后继续走
			if (this.standingTime >= 200) {
				this.walkingDirection = 'left'
				this.currentFrame = this.walkingLeftStartFrame
				this.gap = 0
				this.isMoving = true
				this.isStanding = false
				this.standingTime = 0
			} else {
				this.isMoving = false
				this.isStanding = true
				this.standingTime += 1
			}
		} else if (this.isStanding && this.walkingDirection === 'left') {
			// 向左走到终点之后
			this.currentFrame = this.walkingLeftStartFrame
			// 停留2000帧的时间后继续走
			if (this.standingTime >= 200) {
				this.walkingDirection = 'right'
				this.currentFrame = 0
				this.gap = 0
				this.isMoving = true
				this.isStanding = false
				this.standingTime = 0
			} else {
				this.isMoving = false
				this.isStanding = true
				this.standingTime += 1
			}
		}
	}

	walking() {
		this.walkStanding()

		if (this.walkingDirection === 'right' && this.realDistance <= this.distance) {
			if (this.isMoving) this.realDistance += 1

			if (this.realDistance > this.distance) {
				this.isMoving = false
				this.isStanding = true
			}
		} else if (this.walkingDirection === 'left' && this.realDistance >= 0) {
			if (this.isMoving) this.realDistance -= 1

			if (this.realDistance < 0) {
				this.isMoving = false
				this.isStanding = true
			}
		}
		if (this.isMoving) {
			this.gap++

			if (this.gap % 16 === 0) {
				if (this.walkingDirection === 'right') {
					if (this.currentFrame < this.frames / 2 - 1) {
						this.currentFrame++
					} else {
						this.currentFrame = 0
					}
					this.x += 16
				} else {
					if (this.currentFrame < this.frames - 1) {
						this.currentFrame++
					} else {
						this.currentFrame = this.walkingLeftStartFrame
					}
					this.x -= 16
				}
			}
		}

		return this.draw()
	}
}
