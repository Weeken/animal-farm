import islandImg from '../assets/map.png'
import PlayerImg from '../assets/premium-player.png'
import materialImg from '../assets/material.png'
import ItemDockImg from '../assets/item-dock.png'
import berryTreeImg from '../assets/berry-tree.png'
import farmingPlantImg from '../assets/farming-plant.png'
import houseRootImg from '../assets/house/house-root.png'
import houseDoorImg from '../assets/house/door.png'
import fieldImg from '../assets/vegetable-field-1.png'
import Chicken_yellow from '../assets/chicken-default.png'
import Chicken_blue from '../assets/chicken-blue.png'
import Chicken_green from '../assets/chicken-green.png'
import Chicken_brown from '../assets/chicken-brown.png'
import Chicken_red from '../assets/chicken-red.png'
import Cow_yellow from '../assets/light-cow.png'
import Cow_purple from '../assets/purple-cow.png'
import Cow_green from '../assets/green-cow.png'
import Cow_brown from '../assets/brown-cow.png'
import Cow_pink from '../assets/pink-cow.png'
import Tree_common from '../assets/tree-common.png'
import Tree_apple from '../assets/tree-apple.png'
import Tree_peach from '../assets/tree-peach.png'
import Tree_pear from '../assets/tree-pear.png'
import Tree_orange from '../assets/tree-orange.png'

import { loadImage } from '.'

interface Assets {
	[key: string]: string | Assets
}

// interface LoadedAssets {
// 	[key: string]: HTMLImageElement | LoadedAssets
// }

export const assets: Assets = {
	// 岛屿
	island: islandImg,
	// 建筑
	building: {
		houseRoot: houseRootImg,
		houseDoor: houseDoorImg,
		field: fieldImg
	},
	// 玩家
	player: PlayerImg,
	// 物品栏
	itemDock: ItemDockImg,
	// 掉落物
	materials: materialImg,
	// 树
	berryTree: berryTreeImg,
	fruitTree: {
		common: Tree_common,
		apple: Tree_apple,
		peach: Tree_peach,
		pear: Tree_pear,
		orange: Tree_orange
	},
	// 作物
	farmingPlant: farmingPlantImg,
	// 动物
	animal: {
		chicken: {
			yellow: Chicken_yellow,
			brown: Chicken_brown,
			blue: Chicken_blue,
			red: Chicken_red,
			green: Chicken_green
		},
		cow: {
			yellow: Cow_yellow,
			brown: Cow_brown,
			pink: Cow_pink,
			purple: Cow_purple,
			green: Cow_green
		}
	}
}

// const keys: string[] = []
const loadAssets = async (assets: Assets) => {
	const loadedAssets: LoadedAssets = {}

	for await (const key of Object.keys(assets)) {
		if (typeof assets[key] === 'string') {
			// keys.push(key)
			loadedAssets[key] = await loadImage(assets[key] as string)
		} else {
			loadedAssets[key] = await loadAssets(assets[key] as Assets)
		}
	}
	return loadedAssets
}

export const useAssets = async () => {
	const imageAssets: LoadedAssets = await loadAssets(assets)
	return {
		imageAssets
	}
}
