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
	top: FruitTreeTop
	stump: FruitTreeStump
}

export class FruitTree {
	list: FullFruitTree[] = []
	treeTop: FruitTreeTop[] = []
	treeStump: FruitTreeStump[] = []

	constructor(config: FruitTreeConfig) {
		config.list.forEach(info => {
			const top = new FruitTreeTop({ ...info })
			const stump = new FruitTreeTop({ ...info })
			this.list.push({ top, stump })
			this.treeTop.push(top)
			this.treeStump.push(stump)
		})
	}
}
