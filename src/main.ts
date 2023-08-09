import './style.css'

import { VIEW_WIDTH, VIEW_HEIGHT } from './utils'

import { Controller } from './base/control/Controller'

import { useGlobal } from './gameObjects'
import { Chicken } from './base/animal/Chicken'
import { Cow } from './base/animal/Cow'
import { BerryTree } from './base/tree/BerryTree'
import { AppleTreeTop } from './base/tree/AppleTreeTop'
import { AppleTreeStump } from './base/tree/AppleTreeStump'
import { BoundaryItem } from './base/fixed-things/BoundaryItem'
import { PlantField } from './base/Field/PlantField'
import { Bridge } from './base/fixed-things/Bridge'
import { Wheat } from './base/plant/Wheat'
import { Tomato } from './base/plant/Tomato'
import { Material } from './base/Material'

const start = async () => {
	const { ctx, player, boundary, itemDock, gameObjects } = await useGlobal()

	const gameLoop = () => {
		const frame = () => {
			// 清除画布
			ctx.clearRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT)
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
				if (chicken.state === 'standing') {
					chicken.standing()
				} else {
					chicken.walking()
				}
			})

			// 牛
			gameObjects.cows.forEach((cow: Cow) => {
				if (cow.state === 'standing') {
					cow.standing()
				} else {
					cow.walking()
				}
			})

			// 浆果树
			gameObjects.berryTrees.forEach((tree: BerryTree) => {
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

			// 主角
			if (player.isDigging) {
				player.digging()
			} else if (player.isCutting) {
				player.cutting()
			} else {
				player.draw()
			}

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
		...gameObjects.berryTrees,
		...gameObjects.appleTrees.treeTops,
		...gameObjects.appleTrees.treeStumps,
		...gameObjects.field.plantFields,
		...gameObjects.bridges,
		...gameObjects.crop.wheats
	]
	const controller: Controller = new Controller({
		movableObjects,
		player,
		boundary,
		appleTrees: gameObjects.appleTrees,
		field: gameObjects.field,
		crop: gameObjects.crop,
		itemDock
	})

	controller && controller.init()

	gameLoop()
}

start()
