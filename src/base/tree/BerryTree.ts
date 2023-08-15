import { BerryTreeItem } from './BerryTreeItem'
import { TreeInfo } from './Tree'
import { withGrid, getPositionFormIdStr } from '../../utils'
import { Boundary } from '../fixed-things/Boundary'
import BerryTreeImg from '../../assets/berry-tree.png'
import { DropItem } from '../drop/DropItem'

export interface BerryConfig {
	trees: TreeInfo[]
	ctx: CanvasRenderingContext2D
	boundary: Boundary
}

export class BerryTree {
	list: BerryTreeItem[] = []
	ctx: CanvasRenderingContext2D
	constructor(config: BerryConfig) {
		this.ctx = config.ctx
		this.list = config.trees.map(berryTree => {
			const treeItem = new BerryTreeItem({
				src: BerryTreeImg,
				x: withGrid(berryTree.x),
				y: withGrid(berryTree.y),
				width: withGrid(1),
				height: withGrid(1),
				state: berryTree.state,
				ctx: config.ctx,
				boundary: config.boundary
			})
			return treeItem
		})
	}
	removeTree(info: { gridX: number; gridY: number }) {
		// console.log('%c [ info ]-59', 'font-size:13px; background:pink; color:#bf2c9f;', info)
		const tree = this.list.find(item => {
			const position: { x: number; y: number } = getPositionFormIdStr(item.id)
			// console.log('%c [ position ]-71', 'font-size:13px; background:pink; color:#bf2c9f;', position)
			if (info.gridX === position.x && info.gridY === position.y) {
				return item
			}
		})
		if (tree) {
			this.list = this.list.filter(item => item.id !== tree.id)
			return tree
		}
	}
	createDrop(tree: BerryTreeItem) {
		const woods = new DropItem({
			x: tree.x,
			y: tree.y,
			ctx: this.ctx,
			type: 'branch',
			count: 3
		})
		const drops: DropItem[] = [woods]
		if (tree.state === 'bearFruit') {
			drops.push(
				new DropItem({
					x: tree.x + withGrid(0.5),
					y: tree.y + withGrid(0.4),
					ctx: this.ctx,
					type: 'berry',
					count: 3
				})
			)
		}
		return drops
	}
}
