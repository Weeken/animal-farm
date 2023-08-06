import { Player } from './Player'
import { Boundary } from './Boundary'
import { BoundaryItem } from './BoundaryItem'
import { getPositionFormIdStr, isHitting } from '../utils'
import { AppleTree, FullTree } from './AppleTree'

interface ControllerConfig {
	movableObjects: any[]
	player: Player
	boundary: Boundary
	appleTrees: AppleTree
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
	boundary: Boundary
	appleTrees: AppleTree
	constructor(config: ControllerConfig) {
		this.movableObjects = config.movableObjects
		this.player = config.player
		this.boundary = config.boundary
		this.appleTrees = config.appleTrees
	}

	checkHitting(direction: { x?: number; y?: number }) {
		let canMoving = true

		for (let i = 0; i < this.boundary.list.length; i++) {
			const boundary = this.boundary.list[i]
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

	findTargetBoundary(direction: { x?: number; y?: number }) {
		let target: BoundaryItem | null = null

		for (let i = 0; i < this.boundary.list.length; i++) {
			const boundary = this.boundary.list[i]
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
				target = boundary
				break
			}
		}
		return target
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

	handleCuttingDownTree() {
		this.player.selectAction('Cutting')
		let targetTreeBoundary: BoundaryItem | null = null
		if (this.player.movingDirection === 'right') {
			targetTreeBoundary = this.findTargetBoundary({ x: -this.moveStep })
		} else if (this.player.movingDirection === 'left') {
			targetTreeBoundary = this.findTargetBoundary({ x: this.moveStep })
		} else if (this.player.movingDirection === 'up') {
			targetTreeBoundary = this.findTargetBoundary({ y: this.moveStep })
		} else if (this.player.movingDirection === 'down') {
			targetTreeBoundary = this.findTargetBoundary({ y: -this.moveStep })
		}
		const targetTree: FullTree | undefined = this.appleTrees.fullTrees.find(tree => {
			if (targetTreeBoundary && tree.stump.boundaryBlock.id === targetTreeBoundary.id) {
				return tree
			}
		})
		if (targetTree) {
			const position = getPositionFormIdStr(targetTree.id)
			targetTree.stump.isBeingCut = true
			targetTree.top.isBeingCut = true
			// 树被砍3次就移除
			if (targetTree.top.cuttingCount === 2) {
				this.appleTrees.removeTree({ gridX: position.x, gridY: position.y })
				targetTreeBoundary && this.boundary.removeItem(targetTreeBoundary.id)
			}
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
			} else if (e.key === 'o') {
				this.handleCuttingDownTree()
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
