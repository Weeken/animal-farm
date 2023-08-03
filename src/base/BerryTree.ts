import { loadImage, VIEW_OFFSET, withGrid } from '../utils'
import { Movable } from './Movable'
import { Boundary } from './Boundary'

interface BerryConfig {
	x: number
	y: number
	width: number
	height: number
	src: string
	ctx: CanvasRenderingContext2D
	state: 'bearFruit' | 'noFruit'
	boundaries: Boundary[]
}

export class BerryTree extends Movable {
	x = 0
	y = 0
	width = 0
	height = 0
	src = ''
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement | null = null
	state: 'bearFruit' | 'noFruit' = 'noFruit'
	boundaries: Boundary[] = []

	// 成熟时间--30分钟
	matureTime = 1000 * 60 * 30
	createTime = 0

	constructor(config: BerryConfig) {
		super({ x: config.x, y: config.y })
		this.x = config.x + VIEW_OFFSET.x
		this.y = config.y + VIEW_OFFSET.y

		this.src = config.src
		this.ctx = config.ctx
		this.width = config.width
		this.height = config.height

		this.state = config.state
		this.boundaries = config.boundaries
		this.boundaries.push(
			new Boundary({
				x: config.x,
				y: config.y,
				ctx: this.ctx
			})
		)

		this.createTime = +new Date()
	}

	draw() {
		return new Promise(resolve => {
			let x = 0
			if (this.state === 'noFruit') {
				x = 0
				if (Date.now() > this.createTime + this.matureTime) {
					this.state = 'bearFruit'
					x = withGrid(1)
				}
			} else {
				x = withGrid(1)
			}

			if (this.image) {
				this.ctx.drawImage(this.image, x, 0, this.width, this.height, this.x, this.y, this.width, this.height)
			} else {
				this.src &&
					loadImage(this.src).then(img => {
						this.image = img
						this.ctx.drawImage(this.image, x, 0, this.width, this.height, this.x, this.y, this.width, this.height)
					})
			}

			resolve(this.image)
		})
	}
}
