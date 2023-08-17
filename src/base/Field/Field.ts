import { withGrid, BaseRect } from '../../utils'
import { Boundary } from '../fixed-things/Boundary'
import { Bridge } from '../fixed-things/Bridge'
import { PlantField } from './PlantField'

interface FieldConfig {
	boundary: Boundary
	bridges: Bridge[]
}

interface Position {
	x: number
	y: number
}

export class Field {
	plantFields: PlantField[] = []
	boundary: Boundary
	bridges: Bridge[]
	constructor(config: FieldConfig) {
		this.boundary = config.boundary
		this.bridges = config.bridges
	}

	isCover(position: Position, item: BaseRect) {
		return (
			position.x + withGrid(1) > item.x &&
			position.x < item.x + item.width &&
			position.y + withGrid(1) > item.y &&
			position.y < item.y + item.height
		)
	}

	checkCanSetField(position: Position) {
		let canSet = true
		if (this.plantFields.find(field => field.x === position.x && field.y === position.y)) {
			canSet = false
			return canSet
		}
		// 不能相互覆盖
		if (this.plantFields.length > 0) {
			for (let i = 0; i < this.plantFields.length; i++) {
				const fieldItem = this.plantFields[i]
				if (this.isCover(position, fieldItem)) {
					canSet = false
					break
				}
			}
		}
		// 不能覆盖不能走得地方
		for (let i = 0; i < this.boundary.list.length; i++) {
			const boundary = this.boundary.list[i]
			if (this.isCover(position, boundary)) {
				canSet = false
				break
			}
		}
		// 不能覆盖桥
		for (let i = 0; i < this.bridges.length; i++) {
			const bridge = this.bridges[i]
			if (this.isCover(position, bridge)) {
				canSet = false
				break
			}
		}
		// console.log('canset', canSet)
		return canSet
	}

	addField(position: Position) {
		// console.log('%c [ position ]-46', 'font-size:13px; background:pink; color:#bf2c9f;', position)
		// const x = Math.ceil(position.x / withGrid(1))
		// const y = Math.ceil(position.y / withGrid(1))
		const newPlantField = new PlantField({
			x: position.x,
			y: position.y
		})
		if (this.checkCanSetField(position)) {
			this.plantFields.push(newPlantField)
			// console.log('plantFields', this.plantFields)
			return newPlantField
		} else {
			return null
		}
	}

	removeField(id: string) {
		this.plantFields = this.plantFields.filter(field => field.id !== id)
	}
}
