import { Vector, Box, Collider2d } from 'collider2d'

const collider2d = new Collider2d()
// 计算坐标
export const GRID_W = 16 // 每个格子的宽度
export const GRID_H = 16 // 每个格子的高度
export const ROW_GRID_NUM = 90 // 地图每行70格
export const COL_GRID_NUM = 60 // 地图每列40格
export const GRID_SCALE = 4 // 每个格子放大了4倍
// 游戏视窗宽高
export const VIEW_WIDTH = 1120
export const VIEW_HEIGHT = 640

// 游戏界面的一格
export const withGrid = (num: number) => {
	const x = GRID_W * num * GRID_SCALE
	return x
}
// 图片中的一格
export const picGrid = (num: number) => {
	const x = GRID_W * num
	return x
}

// 游戏主角图片尺寸
export const ROLE_WIDTH = withGrid(3)
export const ROLE_HEIGHT = withGrid(3)

export const screenCenter = {
	x: VIEW_WIDTH / 2 - ROLE_WIDTH / 2, // 屏幕中心 - 角色图片一半的宽度
	y: VIEW_HEIGHT / 2 - ROLE_HEIGHT / 2
}

// 地图初始偏移量
export const VIEW_OFFSET = {
	x: -withGrid(12),
	y: -withGrid(12)
}

export const hours = (num: number) => 1000 * 60 * 60 * num

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
export interface Position {
	x: number
	y: number
}
export interface BaseRect extends Position {
	width: number
	height: number
}

export const isCollide = (rect1: Required<BaseRect>, rect2: Required<BaseRect>) => {
	// console.log('%c [ rect1 ]-67', 'font-size:13px; background:pink; color:#bf2c9f;', rect1)
	// console.log('%c [ rect2 ]-67', 'font-size:13px; background:pink; color:#bf2c9f;', rect2)
	const box1 = new Box(new Vector(rect1.x, rect1.y), rect1.width, rect1.height)
	const box2 = new Box(new Vector(rect2.x, rect2.y), rect2.width, rect2.height)
	const collided = collider2d.testPolygonPolygon(box1.toPolygon(), box2.toPolygon())
	// console.log('%c [ box1.toPolygon() ]-72', 'font-size:13px; background:pink; color:#bf2c9f;', box1.toPolygon())
	return collided
	// return (
	// 	rect1.x + rect1.width >= rect2.x + 24 &&
	// 	rect1.x <= rect2.x + rect2.width - 24 &&
	// 	rect1.y + rect1.height >= rect2.y + 16 &&
	// 	rect1.y <= rect2.y + rect2.height - 32
	// )
}
// console.log(isHittingNew({ x: 15, y: 15, width: 10, height: 10 }, { x: 15, y: 26, width: 10, height: 10 }))

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

export const getPositionFormIdStr = (id: string) => {
	const arr: string[] = id.split('-')
	return {
		x: parseInt(arr[1]),
		y: parseInt(arr[2])
	}
}
