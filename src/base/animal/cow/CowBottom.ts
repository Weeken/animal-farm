import { VIEW_OFFSET, withGrid } from '../../../utils'
import { BaseCow, BaseCowConfig } from './BaseCow'
import { cowAnimations } from './animationConfig'

export type BottomCowInfo = Pick<BaseCowConfig, 'x' | 'y' | 'action' | 'color' | 'height' | 'width' | 'boundary'>

export class CowBottom extends BaseCow {
	id = ''

	// boundary?: Boundary
	// boundaryBlock?: BoundaryBlock

	constructor(config: BottomCowInfo) {
		super({
			...config,
			animations: {
				sleeping: cowAnimations(window.myGameGlobalData.ctx.down).sleeping.bottom,
				standing: cowAnimations(window.myGameGlobalData.ctx.down).standing.bottom,
				walking: cowAnimations(window.myGameGlobalData.ctx.down).walking.bottom
			}
		})

		this.id = 'cowBottom-' + config.x + '-' + config.y
		this.y = config.y + VIEW_OFFSET.y + withGrid(1)
	}
}
