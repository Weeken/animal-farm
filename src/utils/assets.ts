import islandImg from '../assets/map.png'
import PlayerImg from '../assets/premium-player.png'
import berryImg from '../assets/material/berry.png'
import appleImg from '../assets/material/apple.png'
import wheatImg from '../assets/material/wheat.png'
import tomatoImg from '../assets/material/tomato.png'
import cowFoodGrassImg from '../assets/material/cowFoodGrass.png'
import milkImg from '../assets/material/milk.png'
import woodImg from '../assets/material/wood.png'
import branchImg from '../assets/material/branch.png'
import ItemDockImg from '../assets/item-dock.png'
import berryTreeImg from '../assets/berry-tree.png'
import appleTreeTopImg from '../assets/apple-tree-top.png'
import appleTreeStumpImg from '../assets/apple-tree-stump.png'
import cropTomatoImg from '../assets/tomato.png'
import cropWheatImg from '../assets/wheat.png'
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
	materials: {
		berry: berryImg,
		apple: appleImg,
		wheat: wheatImg,
		tomato: tomatoImg,
		cowFoodGrass: cowFoodGrassImg,
		milk: milkImg,
		wood: woodImg,
		branch: branchImg
	},
	// 树
	trees: {
		berryTree: berryTreeImg,
		appleTree: {
			top: appleTreeTopImg,
			stump: appleTreeStumpImg
		}
	},
	// 作物
	crops: {
		tomato: cropTomatoImg,
		wheat: cropWheatImg
	},
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
