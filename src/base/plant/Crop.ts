import { Field } from '../Field/Field'
import { PlantField } from '../Field/PlantField'
import { Plant } from './Plant'
import { PlantType } from './position'

interface CropConfig {
	field: Field
}

export class Crop {
	plants: Plant[] = []
	field: Field
	constructor(config: CropConfig) {
		this.field = config.field
	}

	addPlant(type: PlantType, field: PlantField) {
		const newPlant = new Plant({
			// x: field.x,
			// y: field.y,
			field,
			type
		})
		if (field.isEmpty) {
			this.plants.push(newPlant)
			field.isEmpty = false
			return newPlant
		} else {
			return null
		}
	}
}
