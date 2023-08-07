import { Movable } from '../Movable'
import { loadImage, VIEW_OFFSET } from '../../utils'

export type TreeState = 'bearFruit' | 'noFruit' | 'common'

export interface TreeInfo {
	x: number
	y: number
	state: TreeState
	matureTime?: number
}

export interface TreeConfig {
	x: number
	y: number
	width: number
	height: number
	src: string
	ctx: CanvasRenderingContext2D
	state: TreeState
	matureTime?: number
}

export class Tree extends Movable {
	x = 0
	y = 0
	width = 0
	height = 0
	src = ''
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement | null = null
	state: TreeState = 'common'

	// 成熟时间--30分钟
	matureTime = 0
	createTime = 0

	isBeingCut = false
	offset = 1
	shakeDirection = 'right'
	shakeFrequency = 5
	shakeGap = 0
	shakeCount = 0
	cuttingCount = 0
	cuttingGap = 0

	constructor(config: TreeConfig) {
		super({ x: config.x, y: config.y })
		this.x = config.x
		this.y = config.y

		this.src = config.src
		this.ctx = config.ctx
		this.width = config.width
		this.height = config.height

		this.createTime = +new Date()
		this.state = config.state
		this.matureTime = config.matureTime || 0
	}

	draw() {
		return new Promise(resolve => {
			let x = 0
			let positionX = this.x + VIEW_OFFSET.x
			if (this.state === 'common') {
				x = 0
			} else {
				if (this.state === 'noFruit') {
					x = 0
					if (Date.now() > this.createTime + this.matureTime) {
						// 此刻时间大于生成时间加上成熟所需时间就显示有果实图片
						this.state = 'bearFruit'
						x = this.width
					}
				} else {
					x = this.width
				}
			}

			// 被砍的时候抖动
			if (this.isBeingCut) {
				// 左右晃动
				if (this.shakeGap <= this.shakeFrequency && this.shakeDirection === 'right') {
					positionX += this.offset
					this.shakeGap++
					if (this.shakeGap > this.shakeFrequency) {
						this.shakeGap = 0
						this.shakeDirection = 'left'
					}
				} else if (this.shakeGap <= this.shakeFrequency && this.shakeDirection === 'left') {
					positionX -= this.offset
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

					if (this.shakeCount >= 2) {
						this.cuttingGap = 0
						this.isBeingCut = false
						this.shakeCount = 0
						this.cuttingCount++ // 被砍了几次
					}
				}
			}

			if (this.image) {
				this.ctx.drawImage(
					this.image,
					x,
					0,
					this.width,
					this.height,
					positionX,
					this.y + VIEW_OFFSET.y,
					this.width,
					this.height
				)
			} else {
				this.src &&
					loadImage(this.src).then(img => {
						this.image = img
						this.ctx.drawImage(
							this.image,
							x,
							0,
							this.width,
							this.height,
							positionX,
							this.y + VIEW_OFFSET.y,
							this.width,
							this.height
						)
					})
			}

			resolve(this.image)
		})
	}
}
