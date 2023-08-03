import { screenCenter, withGrid, ROW_GRID_NUM, VIEW_OFFSET, ROLE_WIDTH, ROLE_HEIGHT, randomPosition } from './index'

import { getCtx } from './canvas'

import { IslandMap } from '../base/Map'
import { Boundary } from '../base/Boundary'
import { Player } from '../base/Player'
import { collisions } from '../collisions'
import { House } from '../base/House'
import { SmallDoor } from '../base/SmallDoor'
import { Chicken } from '../base/Chicken'
import { Cow } from '../base/Cow'
import { BerryTree } from '../base/BerryTree'

import MapImg from '../assets/map.png'
import PlayerImg from '../assets/player.png'
import HouseRoot from '../assets/house/house-root.png'
import SmallDoorImg from '../assets/house/door.png'
import StandingChicken from '../assets/chicken-1.png'
import WalkingChicken from '../assets/chicken-2.png'
import StandingCow from '../assets/standing-cow.png'
import WalkingCow from '../assets/walking-cow.png'
import BerryTreeImg from '../assets/berry-tree.png'

const berryTrees: { x: number; y: number; state: 'bearFruit' | 'noFruit' }[] = [
	{ x: 44, y: 15, state: 'bearFruit' },
	{ x: 46, y: 15, state: 'noFruit' },
	{ x: 47, y: 14, state: 'bearFruit' },
	{ x: 49, y: 16, state: 'noFruit' },
	{ x: 43, y: 17, state: 'bearFruit' },
	{ x: 46, y: 17, state: 'noFruit' },
	{ x: 45, y: 19, state: 'noFruit' },
	{ x: 50, y: 18, state: 'noFruit' },
	{ x: 17, y: 38, state: 'noFruit' },
	{ x: 15, y: 39, state: 'bearFruit' },
	{ x: 20, y: 39, state: 'noFruit' },
	{ x: 19, y: 41, state: 'noFruit' },
	{ x: 19, y: 41, state: 'noFruit' },
	{ x: 22, y: 41, state: 'bearFruit' },
	{ x: 24, y: 41, state: 'noFruit' },
	{ x: 23, y: 43, state: 'bearFruit' },
	{ x: 21, y: 44, state: 'noFruit' }
]

const getBoundaries = (ctx: CanvasRenderingContext2D) => {
	if (!ctx) return []
	const collisionMap: number[][] = []
	const boundaries: Boundary[] = []
	for (let index = 0; index < collisions.length; index += ROW_GRID_NUM) {
		collisionMap.push(collisions.slice(index, index + 70))
	}
	collisionMap.forEach((row, i) => {
		row.forEach((b, j) => {
			if (b === 232) {
				boundaries.push(
					new Boundary({
						x: withGrid(j),
						y: withGrid(i),
						ctx
					})
				)
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

	const boundaries = getBoundaries(ctx)

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
			new Chicken({
				x: randomPosition({ min: withGrid(36), max: withGrid(36) }),
				y: randomPosition({ min: withGrid(15), max: withGrid(17) }),
				src: StandingChicken,
				width: withGrid(1),
				height: withGrid(1),
				ctx,
				frames: 2,
				state: 'standing'
			}),
			new Chicken({
				x: withGrid(33),
				y: withGrid(16),
				src: WalkingChicken,
				width: withGrid(1),
				height: withGrid(1),
				ctx,
				frames: 6,
				state: 'moving',
				walkingLeftStartFrame: 4
			})
		],
		cows: [
			new Cow({
				x: randomPosition({ min: withGrid(15), max: withGrid(19) }),
				y: randomPosition({ min: withGrid(26), max: withGrid(28) }),
				src: StandingCow,
				width: withGrid(2),
				height: withGrid(2),
				ctx,
				frames: 3,
				state: 'standing'
			}),
			new Cow({
				x: withGrid(14),
				y: withGrid(29),
				src: WalkingCow,
				width: withGrid(2),
				height: withGrid(2),
				ctx,
				frames: 6,
				state: 'moving',
				walkingLeftStartFrame: 3
			})
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
						boundaries
					})
			)
		]
	}

	return {
		ctx,
		player,
		boundaries,
		gameObjects
	}
}
