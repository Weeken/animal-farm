import { DropItem } from './DropItem'

export class Drop {
	list: DropItem[] = []

	addDrops(drop: DropItem) {
		this.list.push(drop)
	}

	removeDrop(id: string) {
		this.list = this.list.filter(item => item.id !== id)
	}
}
