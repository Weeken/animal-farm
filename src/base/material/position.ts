export const materialPosition = {
	// 玉米
	cornSeed: { x: 0, y: 0 },
	corn: { x: 1, y: 0 },
	// 胡萝卜
	carrotSeed: { x: 2, y: 0 },
	carrot: { x: 3, y: 0 },
	// 白西蓝花
	whiteBroccoliSeed: { x: 4, y: 0 },
	whiteBroccoli: { x: 5, y: 0 },
	// 西红柿
	tomatoSeed: { x: 6, y: 0 },
	tomato: { x: 7, y: 0 },
	// 茄子
	eggplantSeed: { x: 8, y: 0 },
	eggplant: { x: 9, y: 0 },
	// 青瓜
	cucumberSeed: { x: 0, y: 1 },
	cucumber: { x: 1, y: 1 },
	// 甜菜
	beetSeed: { x: 2, y: 1 },
	beet: { x: 3, y: 1 },
	// 小麦
	wheatSeed: { x: 4, y: 1 },
	wheat: { x: 5, y: 1 },
	// 南瓜
	pumpkinSeed: { x: 6, y: 1 },
	pumpkin: { x: 7, y: 1 },
	// 萝卜
	radishSeed: { x: 8, y: 1 },
	radish: { x: 9, y: 1 },
	// 红色玫瑰
	redRoseSeed: { x: 0, y: 2 },
	redRose: { x: 1, y: 2 },
	// 绿色菊花
	greenChrysanthemumSeed: { x: 2, y: 2 },
	greenChrysanthemum: { x: 3, y: 2 },
	// 蓝色牵牛花
	blueMorningGlorySeed: { x: 3, y: 2 },
	blueMorningGlory: { x: 4, y: 2 },
	// 蓝色郁金香
	blueTulipSeed: { x: 5, y: 2 },
	blueTulip: { x: 6, y: 2 },
	// 苹果
	apple: { x: 0, y: 3 },
	// 橙子
	orange: { x: 1, y: 3 },
	// 雪梨
	pear: { x: 2, y: 3 },
	// 桃子
	peach: { x: 3, y: 3 },
	// 草莓
	strawberry: { x: 4, y: 3 },
	// 葡萄
	grace: { x: 5, y: 3 },
	// 蓝莓
	blueberry: { x: 6, y: 3 },
	// 斧头
	ax: { x: 0, y: 4 },
	// 锄头
	hoe: { x: 1, y: 4 },
	// 水壶
	waterCan: { x: 2, y: 4 },
	// 小牛奶瓶
	smallBottle: { x: 3, y: 4 },
	// 大牛奶瓶
	bigBottle: { x: 4, y: 4 },
	// 小石头
	smallStone: { x: 0, y: 5 },
	// 大石头
	bigStone: { x: 1, y: 5 },
	// 石头砖
	stoneBrick: { x: 2, y: 5 },
	// 小树枝
	smallBranch: { x: 0, y: 6 },
	// 大树枝
	bigBranch: { x: 1, y: 6 },
	// 木头
	wood: { x: 2, y: 6 },
	// 木棍
	woodenStick: { x: 3, y: 6 },
	// 木板
	board: { x: 4, y: 6 }
}

export type MaterialType = keyof typeof materialPosition
