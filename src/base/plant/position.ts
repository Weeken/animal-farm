export const plantPosition = {
	// 玉米
	corn: { x: 0, y: 0 },
	// 胡萝
	carrot: { x: 0, y: 2 },
	// 白西蓝花
	whiteBroccoli: { x: 0, y: 3 },
	// 西红柿
	tomato: { x: 0, y: 4 },
	// 茄子
	eggplant: { x: 0, y: 5 },
	// 蓝色郁金香
	blueTulip: { x: 0, y: 6 },
	// 绿色菊花
	greenChrysanthemum: { x: 0, y: 7 },
	// 小麦
	wheat: { x: 0, y: 8 },
	// 南瓜
	pumpkin: { x: 0, y: 9 },
	// 萝卜
	radish: { x: 0, y: 10 },
	// 红色玫瑰
	redRose: { x: 0, y: 11 },
	// 甜菜
	beet: { x: 0, y: 12 },
	// 蓝色牵牛花
	blueMorningGlory: { x: 0, y: 13 },
	// 青瓜
	cucumber: { x: 0, y: 14 }
}

export type PlantType = keyof typeof plantPosition
