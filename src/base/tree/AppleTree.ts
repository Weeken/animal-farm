import { AppleTreeStump } from './AppleTreeStump'
import { AppleTreeTop } from './AppleTreeTop'
import AppleTreeTopImg from '../../assets/apple-tree-top.png'
import AppleTreeStumpImg from '../../assets/apple-tree-stump.png'
import { withGrid, hours, getPositionFormIdStr } from '../../utils'
import { Boundary } from '../fixed-things/Boundary'
import type { TreeState } from './Tree'
import { Player } from '../Player'
import { Ctx } from '../../utils/canvas'

interface AppleTreeConfig {
	ctx: Ctx
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
				src: AppleTreeTopImg,
				x: withGrid(appleTree.x),
				y: withGrid(appleTree.y),
				width: withGrid(2),
				height: withGrid(2),
				state: appleTree.state,
				ctx: config.ctx.upper,
				matureTime: appleTree.matureTime || hours(1),
				id: `appleTree-${appleTree.x}-${appleTree.y}`
			})
			const stump = new AppleTreeStump({
				src: AppleTreeStumpImg,
				x: withGrid(appleTree.x + 0.5),
				y: withGrid(appleTree.y + 1),
				width: withGrid(1),
				height: withGrid(1),
				state: appleTree.state,
				ctx: config.ctx.down,
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
		const tree = this.treeTops.find(item => {
			const position: { x: number; y: number } = getPositionFormIdStr(item.id)
			// console.log('%c [ position ]-71', 'font-size:13px; background:pink; color:#bf2c9f;', position)
			if (info.gridX === position.x && info.gridY === position.y) {
				return item
			}
		})
		if (tree) {
			this.treeTops = this.treeTops.filter(item => item.id !== tree.id)
			this.treeStumps = this.treeStumps.filter(item => item.id !== tree.id)
		}
	}
}
