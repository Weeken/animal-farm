import { BoundaryItem, BoundaryInfo } from './BoundaryItem'

interface BoundaryConfig {
	list: BoundaryInfo[]
}

export class Boundary {
	list: BoundaryItem[]
	constructor(config: BoundaryConfig) {
		this.list = config.list.map(item => {
			return new BoundaryItem(item)
		})
	}

	addItem(info: BoundaryInfo) {
		if (this.list.find(item => item.x === info.x && item.y === info.y) === undefined) {
			this.list.push(new BoundaryItem(info))
		}
	}

	removeItem(info: { x: number; y: number }) {
		const index: number = this.list.findIndex(item => item.x === info.x && item.y === info.y)
		if (index !== -1) {
			this.list.splice(index, 1)
		}
	}
}
