import { withGrid, checkHittingBoundary } from '../../../utils'
import { AnimationInfo, BaseCow } from './BaseCow'
import { DIRECTION } from '../../Player'
import { BoundaryItem } from '../../fixed-things/BoundaryItem'

interface CowConfig {
	top: AnimationInfo
	bottom: AnimationInfo
}

interface CowAnimations {
	sleeping: CowConfig
	standing: CowConfig
	walking: CowConfig
}

export const cowAnimations: (ctx: CanvasRenderingContext2D) => CowAnimations = (ctx: CanvasRenderingContext2D) => ({
	sleeping: {
		top: {
			leftImgY: withGrid(12),
			rightImgY: withGrid(12),
			imgHeight: withGrid(1.4),
			height: withGrid(1.4),
			interval: 60,
			totalFrames: 4,
			ctx
		},
		bottom: {
			leftImgY: withGrid(13),
			rightImgY: withGrid(13),
			imgHeight: withGrid(1),
			height: withGrid(1),
			interval: 60,
			totalFrames: 4,
			ctx
		}
	},
	standing: {
		top: {
			leftImgY: 0,
			rightImgY: withGrid(2),
			imgHeight: withGrid(1.4),
			height: withGrid(1.4),
			interval: 40,
			totalFrames: 3,
			ctx
		},
		bottom: {
			leftImgY: withGrid(1),
			rightImgY: withGrid(3),
			imgHeight: withGrid(1),
			height: withGrid(1),
			interval: 40,
			totalFrames: 3,
			ctx
		}
	},
	walking: {
		top: {
			leftImgY: withGrid(4),
			rightImgY: withGrid(6),
			imgHeight: withGrid(1.4),
			height: withGrid(1.4),
			interval: 10,
			totalFrames: 8,
			ctx
		},
		bottom: {
			leftImgY: withGrid(5),
			rightImgY: withGrid(7),
			imgHeight: withGrid(1),
			height: withGrid(1),
			interval: 10,
			totalFrames: 8,
			ctx
		}
	}
})

export function walkingAround(this: BaseCow) {
	const boundaryList = this.boundary.list.filter((item: BoundaryItem) => item.id !== this.boundaryBlock.id)
	const side = this.walking.moveDirection === DIRECTION.RIGHT ? { x: -30 } : { x: 30 }
	const canMove = this.targetBoundary && checkHittingBoundary(boundaryList, this.targetBoundary, side)

	if (canMove) {
		if (this.walking.moveDirection === DIRECTION.RIGHT) {
			this.targetBoundary && (this.targetBoundary.x += 0.5)
			this.walking.x = this.x += 1
			this.walking.y = this.y
		} else {
			this.targetBoundary && (this.targetBoundary.x -= 0.5)
			this.walking.x = this.x -= 1
			this.walking.y = this.y
		}
		this.walking.play()
	} else {
		this.standing.x = this.x
		this.standing.y = this.y
		this.standing.play()
		this.walkingTimer++
		if (this.walkingTimer >= this.standing.interval * this.standing.totalFrames) {
			this.walking.turnAround()
			this.standing.turnAround()
			this.walking.play()
			this.walkingTimer = 0
		}
	}
}
