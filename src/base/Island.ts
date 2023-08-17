import { Movable } from './Movable'

interface IslandMapConfig {
	x: number
	y: number
}

export class Island extends Movable {
	x = 0
	y = 0
	image: HTMLImageElement
	ctx: CanvasRenderingContext2D
	constructor(config: IslandMapConfig) {
		super({ x: config.x, y: config.y })
		this.x = config.x
		this.y = config.y
		this.image = window.myGameGlobalData.assets.island as HTMLImageElement
		this.ctx = window.myGameGlobalData.ctx.down
	}
	draw() {
		this.ctx.drawImage(this.image, this.x, this.y)
	}
}
