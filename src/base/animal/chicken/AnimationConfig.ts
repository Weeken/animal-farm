import { checkHittingBoundary } from '../../../utils'
import { DIRECTION } from '../../Player'
import { BoundaryItem } from '../../fixed-things/BoundaryItem'
import { BaseChicken } from './BaseChicken'

export function walkingAround(this: BaseChicken) {
	const boundaryList = this.boundary.list.filter((item: BoundaryItem) => item.id !== this.boundaryBlock.id)
	const side = this.walking.moveDirection === DIRECTION.RIGHT ? { x: -10 } : { x: 10 }
	const canMove = this.targetBoundary && checkHittingBoundary(boundaryList, this.targetBoundary, side)

	if (canMove) {
		if (this.walking.moveDirection === DIRECTION.RIGHT) {
			this.targetBoundary && (this.targetBoundary.x += 1)
			this.walking.x = this.x += 1
			this.walking.y = this.y
		} else {
			this.targetBoundary && (this.targetBoundary.x -= 1)
			this.walking.x = this.x -= 1
			this.walking.y = this.y
		}
		this.walking.play()
	} else {
		this.eating.x = this.x
		this.eating.y = this.y
		this.eating.play()
		this.walkingTimer++
		if (this.walkingTimer >= this.eating.interval * this.eating.totalFrames * 4) {
			this.walking.turnAround()
			this.eating.turnAround()
			this.walking.play()
			this.walkingTimer = 0
		}
	}
}
