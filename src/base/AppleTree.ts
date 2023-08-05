import { AppleTreeStump } from './AppleTreeStump'
import { AppleTreeTop } from './AppleTreeTop'
import AppleTreeTopImg from '../assets/apple-tree-top.png'
import AppleTreeStumpImg from '../assets/apple-tree-stump.png'
import { withGrid, hours } from '../utils'
import { Boundary } from './Boundary'
import type { TreeState } from './Tree'
import { Player } from './Player'

interface AppleTreeConfig {
	ctx: CanvasRenderingContext2D
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

export class AppleTree {
	treeTops: AppleTreeTop[] = []
	treeStumps: AppleTreeStump[] = []
	constructor(config: AppleTreeConfig) {
		config.trees.forEach(appleTree => {
			this.treeTops.push(
				new AppleTreeTop({
					src: AppleTreeTopImg,
					x: withGrid(appleTree.x),
					y: withGrid(appleTree.y),
					width: withGrid(2),
					height: withGrid(2),
					state: appleTree.state,
					ctx: config.ctx,
					matureTime: appleTree.matureTime || hours(1)
				})
			)
			this.treeStumps.push(
				new AppleTreeStump({
					src: AppleTreeStumpImg,
					x: withGrid(appleTree.x + 0.5),
					y: withGrid(appleTree.y + 1),
					width: withGrid(1),
					height: withGrid(1),
					state: appleTree.state,
					ctx: config.ctx,
					boundary: config.boundary,
					matureTime: appleTree.matureTime || hours(1),
					player: config.player,
					parent: this
				})
			)
		})
	}

	removeTree(info: { x: number; y: number }) {
		console.log('%c [ info ]-59', 'font-size:13px; background:pink; color:#bf2c9f;', info)
		const index: number = this.treeTops.findIndex(item => item.x === info.x && item.y === info.y)
		if (index !== -1) {
			this.treeTops.splice(index, 1)
			this.treeStumps.splice(index, 1)
		}
	}
}
