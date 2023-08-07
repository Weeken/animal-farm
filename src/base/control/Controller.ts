import { Player } from '../Player'
import { Boundary } from '../fixed-things/Boundary'
import { BoundaryItem } from '../fixed-things/BoundaryItem'
import { getPositionFormIdStr, isHitting, withGrid } from '../../utils'
import { AppleTree, FullTree } from '../tree/AppleTree'
// import { PlantField } from '../Field/PlantField'
import { Field } from '../Field/Field'

interface ControllerConfig {
	movableObjects: any[]
	player: Player
	boundary: Boundary
	appleTrees: AppleTree
	field: Field
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
	field: Field
	constructor(config: ControllerConfig) {
		this.movableObjects = config.movableObjects
		this.player = config.player
		this.boundary = config.boundary
		this.appleTrees = config.appleTrees
		this.field = config.field
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

	findAllDirectionBoundary() {
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
		return targetTreeBoundary
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

	setPlayerNextGrid(direction: 'up' | 'down' | 'left' | 'right') {
		if (direction === 'up') {
			this.player.nextGrid = { ...this.player.nextGrid, x: this.player.x, y: this.player.y - withGrid(1) }
		} else if (direction === 'down') {
			this.player.nextGrid = { ...this.player.nextGrid, x: this.player.x, y: this.player.y + withGrid(1) }
		} else if (direction === 'left') {
			this.player.nextGrid = { ...this.player.nextGrid, x: this.player.x - withGrid(1), y: this.player.y }
		} else if (direction === 'right') {
			this.player.nextGrid = { ...this.player.nextGrid, x: this.player.x + withGrid(1), y: this.player.y }
		}
	}

	handleCuttingDownTree() {
		this.player.selectAction('Cutting')
		const targetTreeBoundary: BoundaryItem | null = this.findAllDirectionBoundary()
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

	handleCreatePlantField() {
		const nextGridIsBoundary = this.findAllDirectionBoundary()
		if (nextGridIsBoundary === null) {
			this.player.selectAction('Digging')
			const newField = this.field.addField({ x: this.player.nextGrid.x, y: this.player.nextGrid.y })
			newField && (this.movableObjects = [...this.movableObjects, newField])
		}
	}

	init() {
		document.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.key === 'w') {
				this.keyMap.w.press = true
				this.lastPressedKey = 'w'
				this.player.movingDirection = 'up'
				this.setPlayerNextGrid('up')
				this.handleMove()
			} else if (e.key === 'a') {
				this.keyMap.a.press = true
				this.lastPressedKey = 'a'
				this.player.movingDirection = 'left'
				this.setPlayerNextGrid('left')
				this.handleMove()
			} else if (e.key === 'd') {
				this.keyMap.d.press = true
				this.lastPressedKey = 'd'
				this.player.movingDirection = 'right'
				this.setPlayerNextGrid('right')
				this.handleMove()
			} else if (e.key === 's') {
				this.keyMap.s.press = true
				this.lastPressedKey = 's'
				this.player.movingDirection = 'down'
				this.setPlayerNextGrid('down')
				this.handleMove()
			} else if (e.key === 'p') {
				this.handleCreatePlantField()
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
