import { withGrid } from '../../../utils'
import { BaseCow, BaseCowConfig } from './BaseCow'

export type TopCowInfo = Pick<BaseCowConfig, 'x' | 'y' | 'action' | 'color' | 'height' | 'width'>

export class CowTop extends BaseCow {
	id = ''

	constructor(config: TopCowInfo) {
		super({
			...config,
			animations: {
				sleeping: {
					imgY: withGrid(8),
					imgHeight: withGrid(1.4),
					height: withGrid(1.4),
					interval: 60,
					totalFrames: 4,
					ctx: window.myGameGlobalData.ctx.upper
				},
				standing: {
					imgY: 0,
					imgHeight: withGrid(1.4),
					height: withGrid(1.4),
					interval: 40,
					totalFrames: 3,
					ctx: window.myGameGlobalData.ctx.upper
				}
			}
		})

		this.id = 'cowTop-' + config.x + '-' + config.y
	}
}
