interface ShakeConfig {
	x: number
	y: number
	imgX: number
	imgY: number
	width: number
	height: number
	image: HTMLImageElement
	ctx: CanvasRenderingContext2D
}

export class Shake {
	offset = 1
	shakeDirection = 'right'
	shakeFrequency = 5
	shakeGap = 0
	shakeCount = 0
	cuttingCount = 0
	cuttingGap = 0

	x = 0
	y = 0
	imgX = 0
	imgY = 0
	width = 0
	height = 0
	image: HTMLImageElement
	ctx: CanvasRenderingContext2D

	constructor(config: ShakeConfig) {
		this.x = config.x
		this.y = config.y
		this.imgX = config.imgX
		this.imgY = config.imgY
		this.width = config.width
		this.height = config.height
		this.ctx = config.ctx
		this.image = config.image
	}

	draw() {
		this.ctx.drawImage(
			this.image,
			this.imgX,
			this.imgY,
			this.width,
			this.height,
			this.x,
			this.y,
			this.width,
			this.height
		)
	}

	shake(finishCB?: () => void) {
		// 左右晃动
		if (this.shakeGap <= this.shakeFrequency && this.shakeDirection === 'right') {
			this.x += this.offset
			this.shakeGap++
			if (this.shakeGap > this.shakeFrequency) {
				this.shakeGap = 0
				this.shakeDirection = 'left'
			}
		} else if (this.shakeGap <= this.shakeFrequency && this.shakeDirection === 'left') {
			this.x -= this.offset
			this.shakeGap++
			if (this.shakeGap > this.shakeFrequency) {
				this.shakeGap = 0
				this.shakeDirection = 'right'
			}
		}
		// 晃动几次
		this.cuttingGap++
		if (this.cuttingGap % 10 === 0) {
			this.shakeCount++

			if (this.shakeCount >= 3) {
				this.cuttingGap = 0
				// this.isBeingCut = false
				this.shakeCount = 0
				this.cuttingCount++ // 被砍了几次
				finishCB && finishCB()
			}
		}
		this.draw()
	}
}
