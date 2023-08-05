import { loadImage, VIEW_OFFSET, withGrid } from '../utils'

interface PlayerConfig {
	x: number
	y: number
	width: number
	height: number
	src: string
	ctx: CanvasRenderingContext2D
}

type Action = 'isMoving' | 'isDigging' | 'isCutting' | 'isStanding'

export class Player {
	// 相对于地图的坐标
	x = 0
	y = 0

	src = ''
	// 固定在视窗中间的位置
	position = {
		x: 0,
		y: 0
	}
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement | null = null

	// 行走动画
	frames = 4
	currentFrame = 0
	gap = 0

	// 站、走
	isStanding = true
	isMoving = false
	movingDirection = 'down'

	actionFrames = 2
	currentActionFrame = 0

	// 挖
	isDigging = false

	// 砍
	isCutting = false

	width = 0
	height = 0

	constructor(config: PlayerConfig) {
		this.position.x = config.x
		this.position.y = config.y

		this.x = config.x - VIEW_OFFSET.x
		this.y = config.y - VIEW_OFFSET.y

		this.src = config.src
		this.ctx = config.ctx
		this.width = config.width
		this.height = config.height
	}

	selectAction(action: 'Moving' | 'Digging' | 'Cutting' | 'Standing') {
		const actionTypes: [Action, Action, Action] = ['isMoving', 'isDigging', 'isCutting']
		actionTypes.forEach((act: Action) => {
			if (`is${action}` === act) {
				this[`is${action}`] = true
			} else {
				this[act] = false
			}
		})
	}

	draw() {
		return new Promise(resolve => {
			let frameY = 0
			if (this.movingDirection === 'down') {
				frameY = 0
			} else if (this.movingDirection === 'up') {
				frameY = withGrid(1)
			} else if (this.movingDirection === 'left') {
				frameY = withGrid(2)
			} else {
				frameY = withGrid(3)
			}

			if (this.isMoving) {
				this.gap++
				if (this.gap % 10 === 0) {
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

			if (this.image) {
				this.ctx.fillStyle = 'rgba(0, 0, 255, 0.2)'
				this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
				this.ctx.drawImage(
					this.image,
					this.currentFrame * this.width,
					frameY,
					this.width,
					this.height - 1,
					this.position.x,
					this.position.y,
					this.width,
					this.height
				)
			} else {
				this.src &&
					loadImage(this.src).then(img => {
						this.image = img
						this.ctx.fillStyle = 'rgba(0, 0, 255, 0.2)'
						this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
						this.ctx.drawImage(
							this.image,
							this.currentFrame * this.width,
							frameY,
							this.width,
							this.height - 1,
							this.position.x,
							this.position.y,
							this.width,
							this.height
						)
					})
			}

			resolve(this.image)
		})
	}

	digging() {
		let frameY = 0
		if (this.movingDirection === 'down') {
			frameY = withGrid(4)
		} else if (this.movingDirection === 'up') {
			frameY = withGrid(7)
		} else if (this.movingDirection === 'left') {
			frameY = withGrid(10)
		} else {
			frameY = withGrid(13)
		}

		if (this.isDigging) {
			this.gap++
			if (this.gap % 20 === 0) {
				if (this.currentActionFrame < this.actionFrames - 1) {
					this.currentActionFrame++
				} else {
					this.currentActionFrame = 0
				}
			}
		} else {
			this.currentActionFrame = 0
			this.gap = 0
		}

		if (this.image) {
			this.ctx.drawImage(
				this.image,
				this.currentActionFrame * withGrid(2),
				frameY,
				this.movingDirection === 'right' ? withGrid(3) : withGrid(2),
				withGrid(2),
				this.position.x - withGrid(1),
				this.position.y - withGrid(1),
				this.movingDirection === 'right' ? withGrid(3) : withGrid(2),
				withGrid(2)
			)
		}
	}

	cutting() {
		let frameY = 0
		let frameX = 0
		let frameW = 0
		let frameH = 0
		let positionX = 0
		let positionY = 0
		if (this.movingDirection === 'down') {
			if (this.currentActionFrame === 0) {
				frameX = 0
				frameY = withGrid(16)
				frameW = withGrid(3)
				frameH = withGrid(3)
				positionX = this.position.x - withGrid(1)
				positionY = this.position.y - withGrid(1)
			} else {
				frameX = withGrid(2)
				frameY = withGrid(16)
				frameW = withGrid(3)
				frameH = withGrid(3)
				positionX = this.position.x - withGrid(1)
				positionY = this.position.y - withGrid(1)
			}
		} else if (this.movingDirection === 'up') {
			if (this.currentActionFrame === 0) {
				frameX = 0
				frameY = withGrid(19)
				frameW = withGrid(3)
				frameH = withGrid(3)
				positionX = this.position.x - withGrid(1)
				positionY = this.position.y - withGrid(1)
			} else {
				frameX = withGrid(3)
				frameY = withGrid(19)
				frameW = withGrid(3)
				frameH = withGrid(3)
				positionX = this.position.x - withGrid(1)
				positionY = this.position.y - withGrid(1)
			}
		} else if (this.movingDirection === 'left') {
			if (this.currentActionFrame === 0) {
				frameX = 0
				frameY = withGrid(22)
				frameW = withGrid(3)
				frameH = withGrid(2)
				positionX = this.position.x - withGrid(1)
				positionY = this.position.y - withGrid(1)
			} else {
				frameX = withGrid(3)
				frameY = withGrid(22)
				frameW = withGrid(3)
				frameH = withGrid(2)
				positionX = this.position.x - withGrid(1)
				positionY = this.position.y - withGrid(1)
			}
		} else {
			if (this.currentActionFrame === 0) {
				frameX = 0
				frameY = withGrid(25)
				frameW = withGrid(3) - 8
				frameH = withGrid(2)
				positionX = this.position.x - withGrid(1)
				positionY = this.position.y - withGrid(1)
			} else {
				frameX = withGrid(2)
				frameY = withGrid(25)
				frameW = withGrid(3) - 8
				frameH = withGrid(2)
				positionX = this.position.x - withGrid(1)
				positionY = this.position.y - withGrid(1)
			}
		}

		if (this.isCutting) {
			this.gap++
			if (this.gap % 20 === 0) {
				if (this.currentActionFrame < this.actionFrames - 1) {
					this.currentActionFrame++
				} else {
					this.currentActionFrame = 0
				}
			}
		} else {
			this.currentActionFrame = 0
			this.gap = 0
		}

		if (this.image) {
			this.ctx.fillStyle = 'rgba(0, 0, 255, 0.2)'
			this.ctx.fillRect(positionX, positionY, frameW, frameH)
			this.ctx.drawImage(this.image, frameX, frameY, frameW, frameH, positionX, positionY, frameW, frameH)
		}
	}
}
