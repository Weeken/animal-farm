import { VIEW_OFFSET, withGrid, BaseRect } from '../../../utils'
import { Boundary } from '../../fixed-things/Boundary'
import { BaseCow, BaseCowConfig } from './BaseCow'

export type BottomCowInfo = Pick<BaseCowConfig, 'x' | 'y' | 'action' | 'color' | 'height' | 'width' | 'boundary'>

interface BoundaryBlock extends BaseRect {
	id: string
}

export class CowBottom extends BaseCow {
	id = ''

	boundary?: Boundary
	boundaryBlock?: BoundaryBlock

	constructor(config: BottomCowInfo) {
		super({
			...config,
			animations: {
				sleeping: {
					imgY: withGrid(9),
					imgHeight: withGrid(1),
					height: withGrid(1),
					interval: 60,
					totalFrames: 4,
					ctx: window.myGameGlobalData.ctx.down
				},
				standing: {
					imgY: withGrid(1),
					imgHeight: withGrid(1),
					height: withGrid(1),
					interval: 40,
					totalFrames: 3,
					ctx: window.myGameGlobalData.ctx.down
				}
			}
		})

		this.id = 'cowBottom-' + config.x + '-' + config.y
		this.y = config.y + VIEW_OFFSET.y + withGrid(1)

		if (config.boundary) {
			this.boundary = config.boundary
			this.boundaryBlock = {
				id: 'boundaryItem-' + config.x + '-' + config.y,
				x: config.x + withGrid(0.2),
				y: config.y + withGrid(1.2),
				width: withGrid(1.6),
				height: withGrid(0.6)
			}
			this.boundary.addItem({
				...this.boundaryBlock
			})
		}
	}
}
