// 计算坐标
export const GRID_W = 16 // 每个格子的宽度
export const GRID_H = 16 // 每个格子的高度
export const ROW_GRID_NUM = 90 // 地图每行70格
export const COL_GRID_NUM = 60 // 地图每列40格
export const GRID_SCALE = 4 // 每个格子放大了4倍
// 游戏视窗宽高
export const VIEW_WIDTH = 1120
export const VIEW_HEIGHT = 640

// 游戏主角图片尺寸
export const ROLE_WIDTH = 64
export const ROLE_HEIGHT = 64

export const screenCenter = {
	x: VIEW_WIDTH / 2 - ROLE_WIDTH / 2, // 屏幕中心 - 角色图片一半的宽度
	y: VIEW_HEIGHT / 2 - ROLE_HEIGHT / 2
}

export const withGrid = (num: number) => {
	const x = GRID_W * num * GRID_SCALE
	return x
}
// 地图初始偏移量
export const VIEW_OFFSET = {
	x: -withGrid(12),
	y: -withGrid(12)
}

// 加载图片
export const loadImage = (src: string) => {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const img: HTMLImageElement = new Image()
		img.onload = () => {
			resolve(img)
		}
		img.onerror = e => {
			reject(e)
		}
		img.src = src
	})
}

// 碰撞检测
interface BaseRect {
	x: number
	y: number
	width: number
	height: number
}

export const isHitting = (rect1: Required<BaseRect>, rect2: Required<BaseRect>) => {
	return (
		rect1.x + rect1.width >= rect2.x + 24 &&
		rect1.x <= rect2.x + rect2.width - 24 &&
		rect1.y + rect1.height >= rect2.y + 16 &&
		rect1.y <= rect2.y + rect2.height - 32
	)
}

interface Range {
	min: number
	max: number
}

export const randomPosition = (range: Range) => {
	const random = Math.random()
	return Math.floor(random * (range.max - range.min + 1) + range.min)
}
