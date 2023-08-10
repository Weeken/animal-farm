import { loadImage, withGrid, VIEW_HEIGHT, screenCenter } from '../utils'
import ItemDockImg from '../assets/item-dock.png'
import { Material, type MaterialType } from './Material'

interface ItemDockConfig {
	ctx: CanvasRenderingContext2D
}

export class ItemDock {
	x = screenCenter.x - withGrid(6)
	y = VIEW_HEIGHT - withGrid(2.4)
	width = withGrid(12)
	height = withGrid(3)
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement | null = null
	isShow = false
	list: Material[] = []
	constructor(config: ItemDockConfig) {
		this.ctx = config.ctx
	}

	draw() {
		if (!this.isShow) return
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

	switch() {
		this.isShow = !this.isShow
		this.list.forEach(item => {
			item.isShow = this.isShow
		})
	}

	addItem(type: MaterialType) {
		const target: Material | undefined = this.list.find(item => item.type === type)
		if (target) {
			target.count += 1
		} else {
			this.list.push(
				new Material({
					ctx: this.ctx,
					position: {
						x: this.x + withGrid(1) + withGrid(1) * this.list.length,
						y: this.y + withGrid(1)
						// x: this.x + withGrid(1) * this.list.length - 1,
						// y: this.y + withGrid(1)
					},
					count: 1,
					type
				})
			)
		}
	}
}
