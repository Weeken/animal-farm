import { withGrid, VIEW_HEIGHT, screenCenter } from '../utils'
// import ItemDockImg from '../assets/item-dock.png'
import { Material } from './material/Material'
import { MaterialType } from './material/position'

// interface ItemDockConfig {
// 	ctx: CanvasRenderingContext2D
// }

export class ItemDock {
	x = screenCenter.x - withGrid(6)
	y = VIEW_HEIGHT - withGrid(2.4)
	width = withGrid(12)
	height = withGrid(3)
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement
	isShow = false
	list: Material[] = []
	constructor() {
		this.ctx = window.myGameGlobalData.ctx.upper
		this.image = window.myGameGlobalData.assets.itemDock as HTMLImageElement
	}

	draw() {
		if (!this.isShow) return
		this.ctx.drawImage(this.image, this.x, this.y)
	}

	switch() {
		this.isShow = !this.isShow
		this.list.forEach(item => {
			item.isShow = this.isShow
		})
	}

	addItem(type: MaterialType, count?: number) {
		const target: Material | undefined = this.list.find(item => item.type === type)
		if (target) {
			target.count += count || 1
		} else {
			this.list.push(
				new Material({
					ctx: this.ctx,
					position: {
						x: this.x + withGrid(1) + withGrid(1) * this.list.length,
						y: this.y + withGrid(1)
					},
					count: count || 1,
					type,
					isShow: this.isShow
				})
			)
		}
	}
}
