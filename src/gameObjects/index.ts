import { screenCenter, withGrid, ROW_GRID_NUM, VIEW_OFFSET, ROLE_WIDTH, ROLE_HEIGHT } from '../utils'

import { getCtx } from '../utils/canvas'

import { IslandMap } from '../base/Map'
import { Boundary } from '../base/Boundary'
import { Player } from '../base/Player'
import { collisions } from '../collisions'
import { House } from '../base/House'
import { SmallDoor } from '../base/SmallDoor'
import { Chicken } from '../base/Chicken'
import { Cow } from '../base/Cow'
import { BerryTree } from '../base/BerryTree'
import { AppleTree } from '../base/AppleTree'

import MapImg from '../assets/map.png'
import PlayerImg from '../assets/player.png'
import HouseRoot from '../assets/house/house-root.png'
import SmallDoorImg from '../assets/house/door.png'
import BerryTreeImg from '../assets/berry-tree.png'

import { cows } from './cows'
import { chickens } from './chicken'
import { appleTrees } from './appleTrees'
import { berryTrees } from './berryTrees'

const getBoundaries = () => {
	const collisionMap: number[][] = []
	const boundaries: { x: number; y: number }[] = []
	for (let index = 0; index < collisions.length; index += ROW_GRID_NUM) {
		collisionMap.push(collisions.slice(index, index + 70))
	}
	collisionMap.forEach((row, i) => {
		row.forEach((b, j) => {
			if (b === 232) {
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
	const ctx = await getCtx()
	const player = new Player({
		x: screenCenter.x,
		y: screenCenter.y,
		src: PlayerImg,
		width: ROLE_WIDTH,
		height: ROLE_HEIGHT,
		ctx
	})

	const boundary = new Boundary({
		list: getBoundaries().map(item => ({
			...item,
			ctx
		}))
	})

	const gameObjects = {
		// 地图
		map: new IslandMap({
			src: MapImg,
			x: VIEW_OFFSET.x,
			y: VIEW_OFFSET.y,
			ctx
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
			ctx,
			player: player
		}),
		// 玩家房子的门
		playerHouseDoor: new SmallDoor({
			src: SmallDoorImg,
			x: withGrid(17),
			y: withGrid(16),
			width: withGrid(1),
			height: withGrid(1),
			ctx,
			player
		}),
		chickens: [
			...chickens.map(
				chicken =>
					new Chicken({
						...chicken,
						ctx
					})
			)
		],
		cows: [
			...cows.map(
				cow =>
					new Cow({
						...cow,
						ctx
					})
			)
		],
		berryTrees: [
			...berryTrees.map(
				berryTree =>
					new BerryTree({
						src: BerryTreeImg,
						x: withGrid(berryTree.x),
						y: withGrid(berryTree.y),
						width: withGrid(1),
						height: withGrid(1),
						state: berryTree.state,
						ctx,
						boundary
					})
			)
		],
		appleTrees: new AppleTree({
			trees: appleTrees,
			ctx,
			boundary,
			player
		})
	}

	return {
		ctx,
		player,
		boundary,
		gameObjects
	}
}
