import { screenCenter, withGrid, ROW_GRID_NUM, VIEW_OFFSET, ROLE_WIDTH, ROLE_HEIGHT } from '../utils'

import { generateCtx } from '../utils/canvas'

import { IslandMap } from '../base/Map'
import { Boundary } from '../base/fixed-things/Boundary'
import { Player } from '../base/Player'
import { collisions } from '../collisions'
import { House } from '../base/fixed-things/House'
import { SmallDoor } from '../base/fixed-things/SmallDoor'
import { Chicken } from '../base/animal/Chicken'
import { Cow } from '../base/animal/Cow'
import { BerryTree } from '../base/tree/BerryTree'
import { AppleTree } from '../base/tree/AppleTree'
import { ItemDock } from '../base/ItemDock'
import { Field } from '../base/Field/Field'
import { Crop } from '../base/plant/Crop'

import MapImg from '../assets/map.png'
import PlayerImg from '../assets/player.png'
import HouseRoot from '../assets/house/house-root.png'
import SmallDoorImg from '../assets/house/door.png'

import { cows } from './cows'
import { chickens } from './chicken'
import { appleTrees } from './appleTrees'
import { berryTrees } from './berryTrees'
import { bridgesInfo } from './bridges'
import { Bridge } from '../base/fixed-things/Bridge'
import { Drop } from '../base/drop/Drop'

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
	const ctx = await generateCtx()
	const player = new Player({
		x: screenCenter.x,
		y: screenCenter.y,
		src: PlayerImg,
		width: ROLE_WIDTH,
		height: ROLE_HEIGHT,
		ctx: ctx.middle
	})

	const boundary = new Boundary({
		list: getBoundaries().map(item => ({
			...item,
			ctx: ctx.down
		}))
	})

	const bridges = bridgesInfo.map(bridge => new Bridge({ ...bridge, ctx: ctx.down }))

	const field = new Field({
		ctx: ctx.middle,
		boundary,
		bridges
	})

	const crop = new Crop({
		ctx: ctx.middle,
		field
	})

	const itemDock = new ItemDock({
		ctx: ctx.upper
	})

	const drop = new Drop()

	const gameObjects = {
		// 地图
		map: new IslandMap({
			src: MapImg,
			x: VIEW_OFFSET.x,
			y: VIEW_OFFSET.y,
			ctx: ctx.down
		}),
		// 玩家
		// player,
		// 边界
		// boundaries: boundaries,
		// 玩家的房子
		playerHouse: new House({
			src: HouseRoot,
			x: withGrid(15),
			y: withGrid(12),
			width: withGrid(5),
			height: withGrid(5),
			ctx: ctx.upper,
			player: player
		}),
		// 玩家房子的门
		playerHouseDoor: new SmallDoor({
			src: SmallDoorImg,
			x: withGrid(17),
			y: withGrid(16),
			width: withGrid(1),
			height: withGrid(1),
			ctx: ctx.middle,
			player
		}),
		chickens: [
			...chickens.map(
				chicken =>
					new Chicken({
						...chicken,
						ctx: ctx.down
					})
			)
		],
		cows: [
			...cows.map(
				cow =>
					new Cow({
						...cow,
						ctx: ctx.down
					})
			)
		],
		berryTree: new BerryTree({
			trees: berryTrees,
			ctx: ctx.middle,
			boundary
		}),
		appleTrees: new AppleTree({
			trees: appleTrees,
			ctx: ctx,
			boundary,
			player
		}),
		bridges,
		field,
		crop,
		drop
	}

	return {
		ctx,
		player,
		boundary,
		itemDock,
		gameObjects
	}
}
