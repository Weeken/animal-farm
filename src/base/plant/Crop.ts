import { withGrid } from '../../utils'
import { Field } from '../Field/Field'
import { PlantField } from '../Field/PlantField'
import { DropItem } from '../drop/DropItem'
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

	removePlant(id: string) {
		this.plants = this.plants.filter(plant => plant.id !== id)
	}

	createPickDrop(plant: Plant) {
		const drops: DropItem[] = []
		drops.push(
			new DropItem({
				x: plant.x + withGrid(0.3),
				y: plant.y + withGrid(0.2),
				type: plant.type,
				count: 3
			})
		)
		drops.push(
			new DropItem({
				x: plant.x + withGrid(0.4),
				y: plant.y + withGrid(0.5),
				type: `${plant.type}Seed`,
				count: 1
			})
		)
		return drops
	}
}
