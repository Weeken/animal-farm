import { BaseRect, VIEW_OFFSET, hours, withGrid } from '../../../utils'
import { Movable } from '../../Movable'
import { Boundary } from '../../fixed-things/Boundary'
import { Shake } from './Shake'

export type TreeState = 'bearFruit' | 'noFruit' | 'small'
type BerryTreeType = 'strawberry' | 'grace' | 'blueberry'

export interface BaseBerryConfig {
	x: number
	y: number
	width?: number
	height?: number
	state: TreeState
	type: BerryTreeType
	boundary: Boundary
}

export interface BerryTreeInfo {
	x: number
	y: number
	state: TreeState
	type: BerryTreeType
}

interface BoundaryBlock extends BaseRect {
	id: string
}

export class BaseBerryTree extends Movable {
	x = 0
	y = 0
	width = 0
	height = 0
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement
	state: TreeState = 'small'
	type: BerryTreeType = 'strawberry'
	id: string = ''
	boundary: Boundary
	boundaryBlock: BoundaryBlock

	shake: Shake
	isBeingCut = false

	createTime = 0

	constructor(config: BaseBerryConfig) {
		super({ x: config.x, y: config.y })
		this.x = config.x + VIEW_OFFSET.x
		this.y = config.y + VIEW_OFFSET.y

		this.ctx = window.myGameGlobalData.ctx.down
		this.image = window.myGameGlobalData.assets.berryTree as HTMLImageElement
		this.width = config.width || withGrid(1)
		this.height = config.height || withGrid(1)

		this.state = config.state || 'small'
		this.type = config.type || 'strawberry'
		this.createTime = +new Date()
		this.id = `berryTree-${config.x}-${config.y}`

		this.boundary = config.boundary
		this.boundaryBlock = {
			id: `boundaryItem-${config.x}-${config.y}`,
			x: config.x,
			y: config.y,
			width: withGrid(1),
			height: withGrid(1)
		}
		this.boundary.addItem({
			...this.boundaryBlock
		})

		this.shake = this.createShake()
	}

	growUp() {
		if (this.state === 'bearFruit') return
		if (Date.now() - this.createTime >= hours(0.5)) {
			if (this.state === 'small') {
				this.state = 'noFruit'
				this.createTime = Date.now()
			} else if (this.state === 'noFruit') {
				this.state = 'bearFruit'
			}
		}
	}

	configImgX() {
		let imageX = 0
		if (this.state === 'small') {
			imageX = 0
		} else if (this.state === 'noFruit') {
			imageX = withGrid(1)
		} else {
			if (this.type === 'strawberry') {
				imageX = withGrid(2)
			} else if (this.type === 'grace') {
				imageX = withGrid(3)
			} else {
				imageX = withGrid(4)
			}
		}
		return imageX
	}

	createShake() {
		const config = {
			x: this.x,
			y: this.y,
			imgX: this.configImgX(),
			imgY: 0,
			width: this.width,
			height: this.height,
			image: this.image,
			ctx: this.ctx
		}
		return new Shake(config)
	}

	draw() {
		this.growUp()
		this.shake.imgX = this.configImgX()
		this.shake.x = this.x
		this.shake.y = this.y
		if (this.isBeingCut) {
			this.shake.shake(() => {
				this.isBeingCut = false
			})
		} else {
			this.shake.draw()
		}
	}
}
