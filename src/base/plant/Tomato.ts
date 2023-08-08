import { Wheat, WheatConfig } from './Wheat'
import TomatoImg from '../../assets/tomato.png'

export class Tomato extends Wheat {
	constructor(config: WheatConfig) {
		super(config)
		this.src = TomatoImg
		this.id = `tomato-${this.x}-${this.y}`
	}
}
