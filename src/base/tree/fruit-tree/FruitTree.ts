import { Position, VIEW_OFFSET, withGrid } from '../../../utils'
import { DropItem } from '../../drop/DropItem'
import { Boundary } from '../../fixed-things/Boundary'
import { TreeType } from './BaseTree'
import { FruitTreeStump } from './FruitTreeStump'
import { FruitTreeTop } from './FruitTreeTop'

export interface TreeInfo {
	x: number
	y: number
	type: TreeType
}

interface FruitTreeConfig {
	list: TreeInfo[]
	boundary: Boundary
}

export interface FullFruitTree {
	id: string
	top: FruitTreeTop
	stump: FruitTreeStump
}

export class FruitTree {
	list: FullFruitTree[] = []
	treeTop: FruitTreeTop[] = []
	treeStump: FruitTreeStump[] = []
	boundary: Boundary

	constructor(config: FruitTreeConfig) {
		this.boundary = config.boundary
		config.list.forEach(info => {
			const top = new FruitTreeTop({ ...info })
			const stump = new FruitTreeStump({ ...info, boundary: config.boundary })
			this.list.push({ id: `fruitTree-${info.x}-${info.y}`, top, stump })
			this.treeTop.push(top)
			this.treeStump.push(stump)
		})
	}

	addFruitTree(info: TreeInfo) {
		const id = `fruitTree-${info.x}-${info.y}`
		if (!this.list.find(tree => tree.id === id)) {
			const top = new FruitTreeTop({ ...info })
			const stump = new FruitTreeStump({ ...info, boundary: this.boundary })
			this.list.push({ id, top, stump })
			this.treeTop.push(top)
			this.treeStump.push(stump)
		}
	}

	removeFruitTree(position: Position) {
		const targetTree = this.list.find(tree => tree.id === `fruitTree-${position.x}-${position.y}`)
		if (targetTree) {
			this.list = this.list.filter(tree => tree.id !== `fruitTree-${position.x}-${position.y}`)
			this.treeTop = this.treeTop.filter(tree => tree.id !== `fruitTop-${position.x}-${position.y}`)
			this.treeStump = this.treeStump.filter(tree => tree.id !== `treeStump-${position.x}-${position.y}`)
		}
		return targetTree
	}

	createDrop(tree: FullFruitTree) {
		const woods = new DropItem({
			x: tree.top.x - VIEW_OFFSET.x + withGrid(1),
			y: tree.top.y - VIEW_OFFSET.y + withGrid(2),
			type: 'wood',
			count: 3,
			image: (window.myGameGlobalData.assets.materials as LoadedAssets).wood as HTMLImageElement
		})
		const drops: DropItem[] = [woods]
		// if (tree.state === 'bearFruit') {
		// 	drops.push(
		// 		new DropItem({
		// 			x: withGrid(tree.x + 0.5),
		// 			y: withGrid(tree.y + 0.4),
		// 			type: 'berry',
		// 			count: 3,
		// 			image: (window.myGameGlobalData.assets.materials as LoadedAssets).berry as HTMLImageElement
		// 		})
		// 	)
		// }
		return drops
	}
}
