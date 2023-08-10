import { Player } from '../Player'
import { Boundary } from '../fixed-things/Boundary'
import { BoundaryItem } from '../fixed-things/BoundaryItem'
import { getPositionFormIdStr, isHitting, withGrid } from '../../utils'
import { AppleTree, FullTree } from '../tree/AppleTree'
// import { PlantField } from '../Field/PlantField'
import { Field } from '../Field/Field'
import { PlantField } from '../Field/PlantField'
import { Crop } from '../plant/Crop'
import { Wheat } from '../plant/Wheat'
import { ItemDock } from '../ItemDock'

interface ControllerConfig {
	movableObjects: any[]
	player: Player
	boundary: Boundary
	appleTrees: AppleTree
	field: Field
	crop: Crop
	itemDock: ItemDock
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
	crop: Crop
	itemDock: ItemDock
	constructor(config: ControllerConfig) {
		this.movableObjects = config.movableObjects
		this.player = config.player
		this.boundary = config.boundary
		this.appleTrees = config.appleTrees
		this.field = config.field
		this.crop = config.crop
		this.itemDock = config.itemDock
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

	findTarget(list: BoundaryItem[] | PlantField[], direction: { x?: number; y?: number }) {
		let target: BoundaryItem | PlantField | null = null

		for (let i = 0; i < list.length; i++) {
			const item = list[i]
			const side: { x?: number; y?: number } = {}
			if (direction.y) {
				side.y = item.y + direction.y
			} else if (direction.x) {
				side.x = item.x + direction.x
			}
			if (
				isHitting(this.player, {
					...item,
					...side
				})
			) {
				target = item
				break
			}
		}
		return target
	}

	findAllDirectionBlock(list: BoundaryItem[] | PlantField[]) {
		let targetTreeBoundary: BoundaryItem | PlantField | null = null
		if (this.player.movingDirection === 'right') {
			targetTreeBoundary = this.findTarget(list, { x: -this.moveStep })
		} else if (this.player.movingDirection === 'left') {
			targetTreeBoundary = this.findTarget(list, { x: this.moveStep })
		} else if (this.player.movingDirection === 'up') {
			targetTreeBoundary = this.findTarget(list, { y: this.moveStep })
		} else if (this.player.movingDirection === 'down') {
			targetTreeBoundary = this.findTarget(list, { y: -this.moveStep })
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
		const targetTreeBoundary: BoundaryItem | null = this.findAllDirectionBlock(this.boundary.list)
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
		const nextGridIsBoundary = this.findAllDirectionBlock(this.boundary.list)
		if (nextGridIsBoundary === null) {
			this.player.selectAction('Digging')
			if (this.player.diggingCount >= 3) {
				const newField = this.field.addField({ x: this.player.nextGrid.x, y: this.player.nextGrid.y })
				newField && (this.movableObjects = [...this.movableObjects, newField])
				this.player.diggingCount = 0
			}
		}
	}

	handleRemovePlantField() {
		const targetField = this.findAllDirectionBlock(this.field.plantFields)
		if (targetField !== null && targetField instanceof PlantField) {
			this.field.removeField(targetField.id)
			this.movableObjects = this.movableObjects.filter(item => item.id !== targetField.id)
		}
	}

	handleCreateACrop(cropType: 'wheat' | 'tomato') {
		const targetField = this.findAllDirectionBlock(this.field.plantFields)
		if (targetField !== null && targetField instanceof PlantField) {
			let newCrop: Wheat | null = null
			if (cropType === 'wheat') {
				newCrop = this.crop.addWheat(targetField)
			} else if (cropType === 'tomato') {
				newCrop = this.crop.addTomato(targetField)
			}
			newCrop && (this.movableObjects = [...this.movableObjects, newCrop])
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
				// 新增一块菜地
				this.handleCreatePlantField()
			} else if (e.key === 'l') {
				// 删除一块菜地
				this.handleRemovePlantField()
			} else if (e.key === 'k') {
				// 种一个小麦
				this.handleCreateACrop('wheat')
			} else if (e.key === 'j') {
				// 种一个番茄
				this.handleCreateACrop('tomato')
			} else if (e.key === 'o') {
				// 砍树
				this.handleCuttingDownTree()
			} else if (e.key === 'e') {
				this.itemDock.switch()
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
				if (this.player.diggingCount !== 3) {
					// 如果没有挖够3次，重置为0
					this.player.diggingCount = 0
				}
			}
			this.reset()
		})
	}

	reset() {
		this.isMoving = true
		this.player.selectAction('Standing')
	}
}