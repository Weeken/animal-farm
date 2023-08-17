import { Wheat, WheatConfig } from './Wheat'
// import TomatoImg from '../../assets/tomato.png'

export class Tomato extends Wheat {
	constructor(config: WheatConfig) {
		super(config)
		this.image = (window.myGameGlobalData.assets.crops as LoadedAssets).tomato as HTMLImageElement
		this.id = `tomato-${this.x}-${this.y}`
	}
}
