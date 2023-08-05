import './style.css'

import { VIEW_WIDTH, VIEW_HEIGHT } from './utils'

import { Controller } from './base/Controller'

import { useGlobal } from './gameObjects'
import { Chicken } from './base/Chicken'
import { Cow } from './base/Cow'
import { BerryTree } from './base/BerryTree'
import { AppleTreeTop } from './base/AppleTreeTop'
import { AppleTreeStump } from './base/AppleTreeStump'
import { BoundaryItem } from './base/BoundaryItem'

const start = async () => {
	const { ctx, player, boundary, gameObjects } = await useGlobal()

	const gameLoop = () => {
		const frame = () => {
			// 清除画布
			ctx.clearRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT)
			// 地图
			gameObjects.map.draw()
			// 左上角的门
			gameObjects.playerHouseDoor.draw()
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
		...gameObjects.appleTrees.treeStumps
	]
	const controller: Controller = new Controller({
		movableObjects,
		player,
		boundaries: boundary.list,
		appleTrees: gameObjects.appleTrees
	})

	controller && controller.init()

	gameLoop()
}

start()
