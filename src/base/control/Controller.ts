import { Player, ACTION, DIRECTION } from '../Player'
import { Boundary } from '../fixed-things/Boundary'
import { BoundaryItem } from '../fixed-things/BoundaryItem'
import { getPositionFormIdStr, findTarget, withGrid, checkHittingBoundary } from '../../utils'
import { AppleTree, FullTree } from '../tree/AppleTree'
// import { PlantField } from '../Field/PlantField'
import { Field } from '../Field/Field'
import { PlantField } from '../Field/PlantField'
import { Crop } from '../plant/Crop'
import { Wheat } from '../plant/Wheat'
import { ItemDock } from '../ItemDock'
import { BerryTree } from '../tree/BerryTree'
import { BerryTreeItem } from '../tree/BerryTreeItem'
import { Drop } from '../drop/Drop'
import { DropItem } from '../drop/DropItem'
// import { AppleTreeStump } from '../tree/AppleTreeStump'

interface ControllerConfig {
	movableObjects: any[]
	player: Player
	boundary: Boundary
	appleTrees: AppleTree
	berryTree: BerryTree
	field: Field
	crop: Crop
	itemDock: ItemDock
	drop: Drop
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
	berryTree: BerryTree
	field: Field
	crop: Crop
	itemDock: ItemDock
	drop: Drop
	constructor(config: ControllerConfig) {
		this.movableObjects = config.movableObjects
		this.player = config.player
		this.boundary = config.boundary
		this.appleTrees = config.appleTrees
		this.berryTree = config.berryTree
		this.field = config.field
		this.crop = config.crop
		this.itemDock = config.itemDock
		this.drop = config.drop
	}

	findAllDirectionBlock(list: BoundaryItem[] | PlantField[] | DropItem[]) {
		let targetTreeBoundary: BoundaryItem | PlantField | DropItem | null = null
		if (this.player.towardDirection === 'right') {
			targetTreeBoundary = findTarget(list, this.player.collisionGrid, { x: -this.moveStep })
		} else if (this.player.towardDirection === 'left') {
			targetTreeBoundary = findTarget(list, this.player.collisionGrid, { x: this.moveStep })
		} else if (this.player.towardDirection === 'up') {
			targetTreeBoundary = findTarget(list, this.player.collisionGrid, { y: this.moveStep })
		} else if (this.player.towardDirection === 'down') {
			targetTreeBoundary = findTarget(list, this.player.collisionGrid, { y: -this.moveStep })
		}
		return targetTreeBoundary
	}

	handleMove() {
		this.player.selectAction(ACTION.MOVING)

		if (this.keyMap.w.press && this.lastPressedKey === 'w') {
			this.isMoving = checkHittingBoundary(this.boundary.list, this.player.collisionGrid, { y: this.moveStep })
			this.isMoving &&
				this.movableObjects.forEach(movableObj => {
					movableObj.moveUp(this.moveStep)
				})
		} else if (this.keyMap.a.press && this.lastPressedKey === 'a') {
			this.isMoving = checkHittingBoundary(this.boundary.list, this.player.collisionGrid, { x: this.moveStep })
			this.isMoving &&
				this.movableObjects.forEach(movableObj => {
					movableObj.moveLeft(this.moveStep)
				})
		} else if (this.keyMap.d.press && this.lastPressedKey === 'd') {
			this.isMoving = checkHittingBoundary(this.boundary.list, this.player.collisionGrid, { x: -this.moveStep })
			this.isMoving &&
				this.movableObjects.forEach(movableObj => {
					movableObj.moveRight(this.moveStep)
				})
		} else if (this.keyMap.s.press && this.lastPressedKey === 's') {
			this.isMoving = checkHittingBoundary(this.boundary.list, this.player.collisionGrid, { y: -this.moveStep })
			this.isMoving &&
				this.movableObjects.forEach(movableObj => {
					movableObj.moveDown(this.moveStep)
				})
		}
	}

	setPlayerNextGrid(direction: DIRECTION) {
		if (direction === DIRECTION.UP) {
			this.player.nextGrid = { ...this.player.nextGrid, x: this.player.x + withGrid(1), y: this.player.y }
		} else if (direction === DIRECTION.DOWN) {
			this.player.nextGrid = { ...this.player.nextGrid, x: this.player.x + withGrid(1), y: this.player.y + withGrid(2) }
		} else if (direction === DIRECTION.LEFT) {
			this.player.nextGrid = { ...this.player.nextGrid, x: this.player.x, y: this.player.y + withGrid(1) }
		} else if (direction === DIRECTION.RIGHT) {
			this.player.nextGrid = { ...this.player.nextGrid, x: this.player.x + withGrid(2), y: this.player.y + withGrid(1) }
		}
	}

	handleCuttingDownTree() {
		this.player.selectAction(ACTION.CUTTING)
		const targetTreeBoundary: BoundaryItem | null = this.findAllDirectionBlock(this.boundary.list)
		const targetAppleTree: FullTree | undefined = this.appleTrees.fullTrees.find(tree => {
			if (targetTreeBoundary && tree.stump.boundaryBlock.id === targetTreeBoundary.id) {
				return tree
			}
		})
		if (targetAppleTree) {
			// 砍苹果树
			const position = getPositionFormIdStr(targetAppleTree.id)
			targetAppleTree.stump.isBeingCut = true
			targetAppleTree.top.isBeingCut = true
			// 树被砍3次就移除
			if (targetAppleTree.top.cuttingCount === 3) {
				const tree = this.appleTrees.removeTree({ gridX: position.x, gridY: position.y })
				targetTreeBoundary && this.boundary.removeItem(targetTreeBoundary.id)
				// 掉落木柴
				if (tree) {
					const newDrop = this.appleTrees.createDrop(tree)
					newDrop.forEach(drop => this.drop.addDrops(drop))
					this.movableObjects = [...this.movableObjects, ...newDrop]
				}
			}

			return true
		} else {
			// 砍浆果树
			const targetBerryTree: BerryTreeItem | undefined = this.berryTree.list.find(tree => {
				if (targetTreeBoundary && tree.boundaryBlock.id === targetTreeBoundary.id) {
					return tree
				}
			})
			if (targetBerryTree) {
				const position = getPositionFormIdStr(targetBerryTree.id)
				targetBerryTree.isBeingCut = true
				// 树被砍3次就移除
				if (targetBerryTree.cuttingCount === 3) {
					const tree = this.berryTree.removeTree({ gridX: position.x, gridY: position.y })
					targetTreeBoundary && this.boundary.removeItem(targetTreeBoundary.id)
					if (tree) {
						const newDrop = this.berryTree.createDrop(tree)
						newDrop.forEach(drop => this.drop.addDrops(drop))
						this.movableObjects = [...this.movableObjects, ...newDrop]
					}
				}
				return true
			} else {
				return false
			}
		}
	}

	handleCreatePlantField() {
		const nextGridIsBoundary = this.findAllDirectionBlock(this.boundary.list)
		if (nextGridIsBoundary === null) {
			this.player.selectAction(ACTION.DIGGING)
			// interval * 8帧 * 循环三次
			if (this.player.diggingCount >= this.player.diggingDown.interval * 8 * 3) {
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

	pickUpDrops() {
		const targetDrop = this.findAllDirectionBlock(this.drop.list)
		if (targetDrop !== null && targetDrop instanceof DropItem) {
			this.drop.removeDrop(targetDrop.id)
			this.movableObjects = this.movableObjects.filter(item => item.id !== targetDrop.id)
			this.itemDock.addItem(targetDrop.type, targetDrop.count)
		}
	}

	init() {
		document.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.key === 'w') {
				this.keyMap.w.press = true
				this.lastPressedKey = 'w'
				this.player.towardDirection = DIRECTION.UP
				this.setPlayerNextGrid(DIRECTION.UP)
				this.handleMove()
			} else if (e.key === 'a') {
				this.keyMap.a.press = true
				this.lastPressedKey = 'a'
				this.player.towardDirection = DIRECTION.LEFT
				this.setPlayerNextGrid(DIRECTION.LEFT)
				this.handleMove()
			} else if (e.key === 'd') {
				this.keyMap.d.press = true
				this.lastPressedKey = 'd'
				this.player.towardDirection = DIRECTION.RIGHT
				this.setPlayerNextGrid(DIRECTION.RIGHT)
				this.handleMove()
			} else if (e.key === 's') {
				this.keyMap.s.press = true
				this.lastPressedKey = 's'
				this.player.towardDirection = DIRECTION.DOWN
				this.setPlayerNextGrid(DIRECTION.DOWN)
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
			} else if (e.key === 'u') {
				// 浇水
				this.player.selectAction(ACTION.WATERING)
			} else if (e.key === 'e') {
				this.itemDock.switch()
			} else if (e.key === 'r') {
				this.pickUpDrops()
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
		this.player.resetToStanding()
	}
}
