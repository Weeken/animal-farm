import { BaseCow, BaseCowConfig } from './BaseCow'
import { cowAnimations } from './animationConfig'

export type TopCowInfo = Pick<BaseCowConfig, 'x' | 'y' | 'action' | 'color' | 'height' | 'width' | 'boundary'>

export class CowTop extends BaseCow {
	id = ''

	constructor(config: TopCowInfo) {
		super({
			...config,
			animations: {
				sleeping: cowAnimations(window.myGameGlobalData.ctx.upper).sleeping.top,
				standing: cowAnimations(window.myGameGlobalData.ctx.upper).standing.top,
				walking: cowAnimations(window.myGameGlobalData.ctx.upper).walking.top,
				eating: cowAnimations(window.myGameGlobalData.ctx.upper).eating.top,
				chewing: cowAnimations(window.myGameGlobalData.ctx.upper).chewing.top,
				smiling: cowAnimations(window.myGameGlobalData.ctx.upper).smiling.top,
				lyingDown: cowAnimations(window.myGameGlobalData.ctx.upper).lyingDown.top
			}
		})

		this.id = 'cowTop-' + config.x + '-' + config.y
	}
}
