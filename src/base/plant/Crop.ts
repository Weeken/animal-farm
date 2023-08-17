import { Field } from '../Field/Field'
import { PlantField } from '../Field/PlantField'
import { Tomato } from './Tomato'
import { Wheat } from './Wheat'

interface CropConfig {
	field: Field
}

export class Crop {
	wheats: Wheat[] = []
	tomatoes: Tomato[] = []
	field: Field
	constructor(config: CropConfig) {
		this.field = config.field
	}

	addWheat(field: PlantField) {
		const newWheat = new Wheat({
			x: field.x,
			y: field.y,
			field
		})
		if (field.isEmpty) {
			this.wheats.push(newWheat)
			field.isEmpty = false
			return newWheat
		} else {
			return null
		}
	}

	addTomato(field: PlantField) {
		const newTomato = new Tomato({
			x: field.x,
			y: field.y,
			field
		})
		if (field.isEmpty) {
			this.tomatoes.push(newTomato)
			field.isEmpty = false
			return newTomato
		} else {
			return null
		}
	}
}
