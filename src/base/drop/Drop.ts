import { DropItem } from './DropItem'

export class Drop {
	list: DropItem[] = []

	addDrops(drop: DropItem) {
		this.list.push(drop)
	}
}
