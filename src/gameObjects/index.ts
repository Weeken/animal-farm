import { withGrid, ROW_GRID_NUM, VIEW_OFFSET } from '../utils'

import { Island } from '../base/Island'
import { Boundary } from '../base/fixed-things/Boundary'
import { Player } from '../base/Player'
import { collisions } from '../collisions'
import { House } from '../base/fixed-things/House'
import { HouseDoor } from '../base/fixed-things/HouseDoor'
import { Chicken } from '../base/animal/chicken/Chicken'
import { Cow } from '../base/animal/cow/Cow'
import { BerryTree } from '../base/tree/berry-tree/BerryTree'
import { ItemDock } from '../base/ItemDock'
import { Field } from '../base/Field/Field'
import { Crop } from '../base/plant/Crop'

import { cows } from './cows'
import { chickens } from './chicken'
import { berryTrees } from './berryTrees'
import { bridgesInfo } from './bridges'
import { Bridge } from '../base/fixed-things/Bridge'
import { Drop } from '../base/drop/Drop'
import { fruitTrees } from './fruitTrees'
import { FruitTree } from '../base/tree/fruit-tree/FruitTree'

const getBoundaries = () => {
	const collisionMap: number[][] = []
	const boundaries: { x: number; y: number }[] = []
	for (let index = 0; index < collisions.length; index += ROW_GRID_NUM) {
		collisionMap.push(collisions.slice(index, index + 70))
	}
	collisionMap.forEach((row, i) => {
		row.forEach((b, j) => {
			if (b === 360) {
				boundaries.push({
					x: withGrid(j),
					y: withGrid(i)
				})
			}
		})
	})
	return boundaries || []
}

export const useGlobal = async () => {
	const player = new Player()

	const boundary = new Boundary({
		list: getBoundaries()
	})

	const bridges = bridgesInfo.map(bridge => new Bridge({ ...bridge }))

	const field = new Field({
		boundary,
		bridges
	})

	const crop = new Crop({
		field
	})

	const itemDock = new ItemDock()

	const drop = new Drop()

	const gameObjects = {
		// 地图
		map: new Island({
			x: VIEW_OFFSET.x,
			y: VIEW_OFFSET.y
		}),
		// 玩家
		// player,
		// 边界
		// boundaries: boundaries,
		// 玩家的房子
		playerHouse: new House({
			x: withGrid(15),
			y: withGrid(12),
			width: withGrid(5),
			height: withGrid(5),
			player: player
		}),
		// 玩家房子的门
		playerHouseDoor: new HouseDoor({
			x: withGrid(17),
			y: withGrid(16),
			width: withGrid(1),
			height: withGrid(1),
			player
		}),
		chicken: new Chicken({ chickens, boundary }),
		cow: new Cow({ cows, boundary }),
		berryTree: new BerryTree({
			trees: berryTrees,
			boundary
		}),
		fruitTree: new FruitTree({
			list: fruitTrees,
			boundary
		}),
		bridges,
		field,
		crop,
		drop
	}

	return {
		player,
		boundary,
		itemDock,
		gameObjects
	}
}
