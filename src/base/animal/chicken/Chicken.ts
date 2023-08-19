import { Boundary } from '../../fixed-things/Boundary'
import { BaseChicken, ChickenInfo } from './BaseChicken'

interface ChickenConfig {
	chickens: ChickenInfo[]
	boundary: Boundary
}

export class Chicken {
	chickens: BaseChicken[]
	boundary: Boundary

	constructor(config: ChickenConfig) {
		this.boundary = config.boundary
		this.chickens = config.chickens.map(info => {
			const chicken = new BaseChicken({
				...info,
				boundary: config.boundary
			})
			return chicken
		})
	}
}
