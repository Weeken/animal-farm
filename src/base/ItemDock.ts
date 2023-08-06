import { loadImage } from '../utils'
import ItemDockImg from '../assets/item-dock.png'

interface ItemDockConfig {
	x: number
	y: number
	width: number
	height: number
	ctx: CanvasRenderingContext2D
}

export class ItemDock {
	x: number
	y: number
	width: number
	height: number
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement | null = null
	constructor(config: ItemDockConfig) {
		this.x = config.x
		this.y = config.y
		this.width = config.width
		this.height = config.height
		this.ctx = config.ctx
	}

	draw() {
		return new Promise(resolve => {
			if (this.image) {
				this.ctx.drawImage(this.image, this.x, this.y)
			} else {
				loadImage(ItemDockImg).then(img => {
					this.image = img
					this.ctx.drawImage(img, this.x, this.y)
				})
			}
			resolve(this.image)
		})
	}
}
