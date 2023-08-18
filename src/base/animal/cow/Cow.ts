import { Boundary } from '../../fixed-things/Boundary'
import { CowBottom } from './CowBottom'
import { CowTop } from './CowTop'
import { BaseCowConfig } from './BaseCow'

export type CowInfo = Pick<BaseCowConfig, 'x' | 'y' | 'action' | 'color'>

export interface CowConfig {
	cows: CowInfo[]
	boundary: Boundary
}

export interface FullCow {
	id: string
	top: CowTop
	bottom: CowBottom
}

export class Cow {
	top: CowTop[] = []
	bottom: CowBottom[] = []
	fullCow: FullCow[] = []
	boundary: Boundary
	constructor(config: CowConfig) {
		this.boundary = config.boundary
		config.cows.forEach(info => {
			const top = new CowTop({ ...info, boundary: config.boundary })
			const bottom = new CowBottom({ ...info, boundary: config.boundary })
			this.top.push(top)
			this.bottom.push(bottom)
			this.fullCow.push({
				id: `cow-${info.x}-${info.y}`,
				top,
				bottom
			})
		})
	}

	createCow(info: CowInfo) {
		const top = new CowTop({ ...info, boundary: this.boundary })
		const bottom = new CowBottom({ ...info, boundary: this.boundary })
		this.top.push(top)
		this.bottom.push(bottom)
		this.fullCow.push({
			id: `cow-${info.x}-${info.y}`,
			top,
			bottom
		})
	}

	removeCow(id: string) {
		this.top = this.top.filter(item => item.id !== id)
		this.bottom = this.bottom.filter(item => item.id !== id)
		this.fullCow = this.fullCow.filter(item => item.id !== id)
	}
}
