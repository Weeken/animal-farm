import './style.css'

import { VIEW_WIDTH, VIEW_HEIGHT } from './utils'

import { Controller } from './base/Controller'

import { useGlobal } from './utils/GameObjects'

const start = async () => {
	const { ctx, player, boundaries, gameObjects } = await useGlobal()

	const gameLoop = () => {
		const frame = () => {
			// 清除画布
			ctx.clearRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT)
			// 地图
			gameObjects.map.draw()
			// 左上角的门
			gameObjects.playerHouseDoor.draw()
			// 鸡
			gameObjects.chickens.forEach(chicken => {
				if (chicken.state === 'standing') {
					chicken.standing()
				} else {
					chicken.walking()
				}
			})

			// 牛
			gameObjects.cows.forEach(cow => {
				if (cow.state === 'standing') {
					cow.standing()
				} else {
					cow.walking()
				}
			})

			// 浆果树
			gameObjects.berryTrees.forEach(tree => {
				tree.draw()
			})

			// 主角
			if (player.isDigging) {
				player.digging()
			} else if (player.isCutting) {
				player.cutting()
			} else {
				player.draw()
			}

			// 左上角房子的房顶
			gameObjects.playerHouse.draw()

			// 边界
			boundaries.forEach(boundary => {
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
		...boundaries,
		gameObjects.playerHouse,
		gameObjects.playerHouseDoor,
		...gameObjects.chickens,
		...gameObjects.cows,
		...gameObjects.berryTrees
	]
	const controller: Controller = new Controller({
		movableObjects,
		player,
		boundaries
	})

	controller && controller.init()

	gameLoop()
}

start()
