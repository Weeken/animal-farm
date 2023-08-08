import { Field } from '../Field/Field'
import { PlantField } from '../Field/PlantField'
import { Tomato } from './Tomato'
import { Wheat } from './Wheat'

interface CropConfig {
	field: Field
	ctx: CanvasRenderingContext2D
}

export class Crop {
	wheats: Wheat[] = []
	tomatoes: Tomato[] = []
	field: Field
	ctx: CanvasRenderingContext2D
	constructor(config: CropConfig) {
		this.field = config.field
		this.ctx = config.ctx
	}

	addWheat(field: PlantField) {
		const newWheat = new Wheat({
			x: field.x,
			y: field.y,
			ctx: this.ctx,
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
			ctx: this.ctx,
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
