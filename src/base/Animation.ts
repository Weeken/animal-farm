export interface AnimationConfig {
	totalFrames: number
	currentFrame?: number
	interval?: number

	x: number
	y: number
	imgX?: number
	imgY?: number
	width: number
	height: number
	imgWidth?: number
	imgHeight?: number
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement
}

export class Animation {
	totalFrames = 4
	currentFrame = 0
	interval = 20
	timer = 0

	x = 0
	y = 0
	imgX = 0
	imgY = 0
	width = 0
	height = 0
	imgWidth = 0
	imgHeight = 0
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement

	isPlaying = false
	isShowRect = true

	constructor(config: AnimationConfig) {
		this.totalFrames = config.totalFrames
		this.currentFrame = config.currentFrame || 0
		this.interval = config.interval || 20

		this.x = config.x
		this.y = config.y
		this.imgX = config.imgX || 0
		this.imgY = config.imgY || 0
		this.y = config.y
		this.width = config.width
		this.imgWidth = config.imgWidth || config.width
		this.height = config.height
		this.imgHeight = config.imgHeight || config.height
		this.ctx = config.ctx
		this.image = config.image
	}

	draw() {
		if (this.isShowRect) {
			this.ctx.fillStyle = 'rgba(0, 0, 255, 0.2)'
			this.ctx.fillRect(this.x, this.y, this.width, this.height)
		}
		// console.log(this.currentFrame)
		this.ctx.drawImage(
			this.image,
			this.currentFrame * this.imgWidth,
			this.imgY,
			this.imgWidth,
			this.imgHeight,
			this.x,
			this.y,
			this.width,
			this.height
		)
	}

	play() {
		!this.isPlaying && (this.isPlaying = true)
		this.timer++
		if (this.timer % this.interval === 0) {
			if (this.currentFrame < this.totalFrames - 1) {
				this.currentFrame++
			} else {
				this.currentFrame = 0
				this.timer = 0
			}
		}
		this.draw()
	}
}
