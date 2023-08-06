import { Tree, TreeConfig } from './Tree'

interface AppleTreeTopConfig extends TreeConfig {
	id: string
}

export class AppleTreeTop extends Tree {
	id: string = ''
	constructor(config: AppleTreeTopConfig) {
		super(config)
		this.id = config.id
	}
}
