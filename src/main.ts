import './style.css'

import { VIEW_WIDTH, VIEW_HEIGHT } from './utils'

import { Controller } from './base/control/Controller'

import { useGlobal } from './gameObjects'
import { Chicken } from './base/animal/Chicken'
import { Cow } from './base/animal/Cow'
import { BerryTreeItem } from './base/tree/BerryTreeItem'
import { AppleTreeTop } from './base/tree/AppleTreeTop'
import { AppleTreeStump } from './base/tree/AppleTreeStump'
import { BoundaryItem } from './base/fixed-things/BoundaryItem'
import { PlantField } from './base/Field/PlantField'
import { Bridge } from './base/fixed-things/Bridge'
import { Wheat } from './base/plant/Wheat'
import { Tomato } from './base/plant/Tomato'
import { Material } from './base/Material'
import { DropItem } from './base/drop/DropItem'

const start = async () => {
	const { ctx, player, boundary, itemDock, gameObjects } = await useGlobal()

	const gameLoop = () => {
		const frame = () => {
			// 清除画布
			ctx.down.clearRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT)
			ctx.middle.clearRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT)
			ctx.upper.clearRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT)
			// ctx.upper.restore()
			// ctx.down.restore()
			// ctx.middle.restore()
			// 地图
			gameObjects.map.draw()
			// 左上角的门
			gameObjects.playerHouseDoor.draw()

			// 桥
			gameObjects.bridges.forEach((bridge: Bridge) => {
				bridge.draw()
			})
			// 鸡
			gameObjects.chickens.forEach((chicken: Chicken) => {
				chicken.action()
			})

			// 牛
			gameObjects.cows.forEach((cow: Cow) => {
				cow.action()
			})

			// 浆果树
			gameObjects.berryTree.list.forEach((tree: BerryTreeItem) => {
				tree.draw()
			})

			// 苹果树树桩
			gameObjects.appleTrees.treeStumps.forEach((treeStump: AppleTreeStump) => {
				treeStump.draw()
			})

			// 菜地
			gameObjects.field.plantFields.forEach((field: PlantField) => {
				field.draw()
			})

			// 作物--小麦
			gameObjects.crop.wheats.forEach((wheat: Wheat) => {
				wheat.draw()
			})
			gameObjects.crop.tomatoes.forEach((tomato: Tomato) => {
				tomato.draw()
			})

			gameObjects.drop.list.forEach((drop: DropItem) => {
				drop.draw()
			})

			// 主角
			// if (player.isDigging) {
			// 	player.digging()
			// } else if (player.isCutting) {
			// 	player.cutting()
			// } else {
			// 	player.draw()
			// }
			player.action()

			// 苹果树树冠
			gameObjects.appleTrees.treeTops.forEach((treeTop: AppleTreeTop) => {
				treeTop.draw()
			})

			// 左上角房子的房顶
			gameObjects.playerHouse.draw()

			// 边界
			boundary.list.forEach((boundary: BoundaryItem) => {
				boundary.draw()
			})

			// 物品栏
			itemDock.draw()
			itemDock.list.forEach((item: Material) => {
				item.draw()
			})

			window.requestAnimationFrame(() => {
				frame()
			})
		}
		frame()
	}

	const movableObjects: any[] = [
		gameObjects.map,
		...boundary.list,
		gameObjects.playerHouse,
		gameObjects.playerHouseDoor,
		...gameObjects.chickens,
		...gameObjects.cows,
		...gameObjects.berryTree.list,
		...gameObjects.appleTrees.treeTops,
		...gameObjects.appleTrees.treeStumps,
		...gameObjects.field.plantFields,
		...gameObjects.bridges,
		...gameObjects.crop.wheats,
		...gameObjects.drop.list
	]
	const controller: Controller = new Controller({
		movableObjects,
		player,
		boundary,
		appleTrees: gameObjects.appleTrees,
		field: gameObjects.field,
		crop: gameObjects.crop,
		itemDock,
		berryTree: gameObjects.berryTree,
		drop: gameObjects.drop
	})

	controller && controller.init()

	gameLoop()
}

start()
