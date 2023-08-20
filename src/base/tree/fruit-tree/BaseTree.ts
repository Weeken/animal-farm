import { withGrid } from '../../../utils'
import { Movable } from '../../Movable'

export type TreeType = 'common' | 'apple' | 'peach' | 'pear' | 'orange'

export interface BaseTreeConfig {
	x: number
	y: number
	width?: number
	height?: number
	type: TreeType
	// state: TreeState
	// matureTime?: number
	// image: HTMLImageElement
	// ctx: CanvasRenderingContext2D
}

export class BaseTree extends Movable {
	x: number
	y: number
	width: number = withGrid(3)
	height: number = withGrid(3)

	image: HTMLImageElement
	type: TreeType

	constructor(config: BaseTreeConfig) {
		super({ x: config.x, y: config.y })

		const treeImgs = window.myGameGlobalData.assets.fruitTree as LoadedAssets
		this.x = config.x
		this.y = config.y
		this.type = config.type
		this.image = treeImgs[config.type] as HTMLImageElement
	}
}
