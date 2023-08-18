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

	getItem(id: string) {
		return this.list.find(item => item.id === id)
	}

	removeItem(id: string) {
		this.list = this.list.filter(item => item.id !== id)
	}
}
