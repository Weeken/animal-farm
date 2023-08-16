import { withGrid, loadImage, VIEW_OFFSET } from '../../utils'
import { MaterialType, MaterialImagesMap } from '../Material'
import { Movable } from '../Movable'

export interface DropConfig {
	type: MaterialType
	x: number
	y: number
	count: number
	ctx: CanvasRenderingContext2D
}

export class DropItem extends Movable {
	type: MaterialType
	count = 1
	x = 0
	y = 0
	width = withGrid(1)
	height = withGrid(1)
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement | null = null

	distance = 5
	movingDistance = 0
	gap = 0
	direction: 'up' | 'down' = 'up'
	id = ''

	constructor(config: DropConfig) {
		super({ x: config.x, y: config.y })
		this.type = config.type
		this.count = config.count
		this.x = config.x
		this.y = config.y
		this.ctx = config.ctx
		this.id = `drop-${this.x}-${this.y}`
	}

	draw() {
		return new Promise(resolve => {
			let positionY = this.y + 4 + VIEW_OFFSET.y
			// 上下晃动动画
			this.gap++
			if (this.gap % 10 === 0) {
				if (this.direction === 'up') {
					if (this.movingDistance < this.distance) {
						this.movingDistance++
					} else {
						this.direction = 'down'
						this.gap = 0
					}
				} else {
					if (this.movingDistance > 0) {
						this.movingDistance--
					} else {
						this.direction = 'up'
						this.gap = 0
					}
				}
			}
			positionY += this.movingDistance
			if (this.image) {
				this.ctx.drawImage(
					this.image,
					0,
					0,
					withGrid(1),
					withGrid(1),
					this.x + 4 + VIEW_OFFSET.x,
					positionY,
					withGrid(1) - 20,
					withGrid(1) - 20
				)
			} else {
				loadImage(MaterialImagesMap[this.type]).then(img => {
					this.image = img
					this.ctx.drawImage(
						this.image,
						0,
						0,
						withGrid(1),
						withGrid(1),
						this.x + 4 + VIEW_OFFSET.x,
						positionY,
						withGrid(1) - 20,
						withGrid(1) - 20
					)
				})
			}
			resolve(this.image)
		})
	}
}
