import { withGrid, getPositionFormIdStr, VIEW_OFFSET } from '../../../utils'
import { Boundary } from '../../fixed-things/Boundary'
import { DropItem } from '../../drop/DropItem'
import { BaseBerryTree, BerryTreeInfo } from './BaseBerryTree'

export interface BerryConfig {
	trees: BerryTreeInfo[]
	boundary: Boundary
}

export class BerryTree {
	list: BaseBerryTree[] = []
	constructor(config: BerryConfig) {
		this.list = config.trees.map(berryTree => {
			const treeItem = new BaseBerryTree({
				x: withGrid(berryTree.x),
				y: withGrid(berryTree.y),
				state: berryTree.state,
				type: berryTree.type,
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
	// 被砍掉时的掉落
	createCutDrop(tree: BaseBerryTree) {
		const woods = new DropItem({
			x: tree.x - VIEW_OFFSET.x,
			y: tree.y - VIEW_OFFSET.y,
			type: 'bigBranch',
			count: 3
		})
		const drops: DropItem[] = [woods]
		if (tree.state === 'bearFruit') {
			drops.push(
				new DropItem({
					x: tree.x + withGrid(0.5) - VIEW_OFFSET.x,
					y: tree.y + withGrid(0.4) - VIEW_OFFSET.y,
					type: tree.type,
					count: 3
				})
			)
		}
		return drops
	}

	// 被摘时的掉落
	createPickDrop(tree: BaseBerryTree) {
		if (tree.state !== 'bearFruit') return []
		const drops: DropItem[] = []
		if (tree.state === 'bearFruit') {
			drops.push(
				new DropItem({
					x: tree.x + withGrid(0.5) - VIEW_OFFSET.x,
					y: tree.y + withGrid(0.4) - VIEW_OFFSET.y,
					type: tree.type,
					count: 3
				})
			)
		}
		tree.state = 'noFruit'
		return drops
	}
}
