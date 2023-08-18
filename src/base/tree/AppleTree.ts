import { AppleTreeStump } from './AppleTreeStump'
import { AppleTreeTop } from './AppleTreeTop'
import { withGrid, hours, getPositionFormIdStr } from '../../utils'
import { Boundary } from '../fixed-things/Boundary'
import type { TreeState } from './Tree'
import { Player } from '../Player'
import { DropItem } from '../drop/DropItem'

interface AppleTreeConfig {
	boundary: Boundary
	player: Player
	trees: TreeInfo[]
}

interface TreeInfo {
	x: number
	y: number
	state: TreeState
	matureTime?: number
}

export interface FullTree {
	id: string
	top: AppleTreeTop
	stump: AppleTreeStump
}

export class AppleTree {
	treeTops: AppleTreeTop[] = []
	treeStumps: AppleTreeStump[] = []
	fullTrees: FullTree[] = []
	constructor(config: AppleTreeConfig) {
		config.trees.forEach(appleTree => {
			const top = new AppleTreeTop({
				image: ((window.myGameGlobalData.assets.trees as LoadedAssets).appleTree as LoadedAssets)
					.top as HTMLImageElement,
				x: withGrid(appleTree.x),
				y: withGrid(appleTree.y),
				width: withGrid(2),
				height: withGrid(2),
				state: appleTree.state,
				ctx: window.myGameGlobalData.ctx.upper,
				matureTime: appleTree.matureTime || hours(1),
				id: `appleTree-${appleTree.x}-${appleTree.y}`
			})
			const stump = new AppleTreeStump({
				image: ((window.myGameGlobalData.assets.trees as LoadedAssets).appleTree as LoadedAssets)
					.stump as HTMLImageElement,
				x: withGrid(appleTree.x + 0.5),
				y: withGrid(appleTree.y + 1),
				width: withGrid(1),
				height: withGrid(1),
				state: appleTree.state,
				ctx: window.myGameGlobalData.ctx.down,
				boundary: config.boundary,
				matureTime: appleTree.matureTime || hours(1),
				player: config.player,
				parent: this,
				id: `appleTree-${appleTree.x}-${appleTree.y}`
			})
			this.treeTops.push(top)
			this.treeStumps.push(stump)
			this.fullTrees.push({ id: `appleTree-${appleTree.x}-${appleTree.y}`, top, stump })
		})
	}

	removeTree(info: { gridX: number; gridY: number }) {
		// console.log('%c [ info ]-59', 'font-size:13px; background:pink; color:#bf2c9f;', info)
		const tree: AppleTreeTop | undefined = this.treeTops.find(item => {
			const position: { x: number; y: number } = getPositionFormIdStr(item.id)
			// console.log('%c [ position ]-71', 'font-size:13px; background:pink; color:#bf2c9f;', position)
			if (info.gridX === position.x && info.gridY === position.y) {
				return item
			}
		})
		if (tree) {
			this.treeTops = this.treeTops.filter(item => item.id !== tree.id)
			this.treeStumps = this.treeStumps.filter(item => item.id !== tree.id)
			this.fullTrees = this.fullTrees.filter(item => item.id !== tree.id)
			return tree
		}
	}

	createDrop(tree: AppleTreeTop) {
		const woods = new DropItem({
			x: tree.x + withGrid(0.5),
			y: tree.y + withGrid(1),
			type: 'wood',
			count: 3,
			image: (window.myGameGlobalData.assets.materials as LoadedAssets).wood as HTMLImageElement
		})
		const drops: DropItem[] = [woods]
		if (tree.state === 'bearFruit') {
			drops.push(
				new DropItem({
					x: tree.x + withGrid(0.8),
					y: tree.y + withGrid(0.4),
					type: 'apple',
					count: 3,
					image: (window.myGameGlobalData.assets.materials as LoadedAssets).apple as HTMLImageElement
				})
			)
		}
		return drops
	}
}
