import { Player } from './Player'
import { BoundaryItem } from './BoundaryItem'
import { isHitting } from '../utils'

interface ControllerConfig {
	movableObjects: any[]
	player: Player
	boundaries: BoundaryItem[]
}

export class Controller {
	keyMap = {
		w: { press: false },
		a: { press: false },
		d: { press: false },
		s: { press: false }
	}
	movableObjects: any[] = []
	lastPressedKey = ''
	moveStep: number = 16
	isMoving = false
	player: Player
	boundaries: BoundaryItem[]
	constructor(config: ControllerConfig) {
		this.movableObjects = config.movableObjects
		this.player = config.player
		this.boundaries = config.boundaries
	}

	checkHitting(direction: { x?: number; y?: number }) {
		let canMoving = true

		for (let i = 0; i < this.boundaries.length; i++) {
			const boundary = this.boundaries[i]
			const side: { x?: number; y?: number } = {}
			if (direction.y) {
				side.y = boundary.y + direction.y
			} else if (direction.x) {
				side.x = boundary.x + direction.x
			}
			if (
				isHitting(this.player, {
					...boundary,
					...side
				})
			) {
				canMoving = false
				break
			}
		}
		return canMoving
	}

	handleMove() {
		this.player.selectAction('Moving')

		if (this.keyMap.w.press && this.lastPressedKey === 'w') {
			this.isMoving = this.checkHitting({ y: this.moveStep })
			this.isMoving &&
				this.movableObjects.forEach(movableObj => {
					movableObj.moveUp(this.moveStep)
				})
		} else if (this.keyMap.a.press && this.lastPressedKey === 'a') {
			this.isMoving = this.checkHitting({ x: this.moveStep })
			this.isMoving &&
				this.movableObjects.forEach(movableObj => {
					movableObj.moveLeft(this.moveStep)
				})
		} else if (this.keyMap.d.press && this.lastPressedKey === 'd') {
			this.isMoving = this.checkHitting({ x: -this.moveStep })
			this.isMoving &&
				this.movableObjects.forEach(movableObj => {
					movableObj.moveRight(this.moveStep)
				})
		} else if (this.keyMap.s.press && this.lastPressedKey === 's') {
			this.isMoving = this.checkHitting({ y: -this.moveStep })
			this.isMoving &&
				this.movableObjects.forEach(movableObj => {
					movableObj.moveDown(this.moveStep)
				})
		}
	}

	init() {
		document.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.key === 'w') {
				this.keyMap.w.press = true
				this.lastPressedKey = 'w'
				this.player.movingDirection = 'up'
				this.handleMove()
			} else if (e.key === 'a') {
				this.keyMap.a.press = true
				this.lastPressedKey = 'a'
				this.player.movingDirection = 'left'
				this.handleMove()
			} else if (e.key === 'd') {
				this.keyMap.d.press = true
				this.lastPressedKey = 'd'
				this.player.movingDirection = 'right'
				this.handleMove()
			} else if (e.key === 's') {
				this.keyMap.s.press = true
				this.lastPressedKey = 's'
				this.player.movingDirection = 'down'
				this.handleMove()
			} else if (e.key === 'p') {
				this.player.selectAction('Digging')
				this.player.digging()
			} else if (e.key === 'o') {
				this.player.selectAction('Cutting')
				this.player.cutting()
			}
		})
		document.addEventListener('keyup', (e: KeyboardEvent) => {
			if (e.key === 'w') {
				this.keyMap.w.press = false
			} else if (e.key === 'a') {
				this.keyMap.a.press = false
			} else if (e.key === 'd') {
				this.keyMap.d.press = false
			} else if (e.key === 's') {
				this.keyMap.s.press = false
			} else if (e.key === 'p') {
				//
			}
			this.reset()
		})
	}

	reset() {
		this.isMoving = true
		this.player.selectAction('Standing')
	}
}
