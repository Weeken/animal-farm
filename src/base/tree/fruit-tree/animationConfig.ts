import { Position, withGrid } from '../../../utils'
import { AnimationConfig } from '../../Animation'

export type AnimationInfo = Pick<
	AnimationConfig,
	| 'ctx'
	| 'height'
	| 'imgHeight'
	| 'imgWidth'
	| 'imgX'
	| 'interval'
	| 'leftImgY'
	| 'rightImgY'
	| 'totalFrames'
	| 'width'
	| 'x'
	| 'y'
>

export interface FruitTreeConfig {
	top: AnimationInfo
	stump: AnimationInfo
}

export interface FruitTreeAnimations {
	static: FruitTreeConfig
	growUp: FruitTreeConfig
	leftShake: FruitTreeConfig
}

export const fruitTreeAnimations: (position: Position, ctx: CanvasRenderingContext2D) => FruitTreeAnimations = (
	position: Position,
	ctx: CanvasRenderingContext2D
) => ({
	static: {
		top: {
			x: position.x,
			y: position.y,
			imgX: 0,
			leftImgY: withGrid(0),
			rightImgY: withGrid(0),
			imgHeight: withGrid(2.4),
			indexFrame: 0,
			interval: 10,
			totalFrames: 1,
			ctx,
			width: withGrid(3),
			height: withGrid(2.4)
		},
		stump: {
			x: position.x,
			y: position.y,
			imgX: withGrid(3),
			leftImgY: withGrid(0),
			rightImgY: withGrid(0),
			imgHeight: withGrid(3),
			imgWidth: withGrid(3),
			indexFrame: 0,
			interval: 10,
			totalFrames: 1,
			ctx,
			width: withGrid(3),
			height: withGrid(3)
		}
	},
	growUp: {
		top: {
			x: position.x,
			y: position.y,
			imgX: 0,
			leftImgY: withGrid(4),
			rightImgY: withGrid(4),
			imgHeight: withGrid(2.4),
			indexFrame: 3,
			interval: 10,
			totalFrames: 4,
			ctx,
			width: withGrid(3),
			height: withGrid(2.4)
		},
		stump: {
			x: position.x,
			y: position.y,
			imgX: withGrid(12),
			leftImgY: withGrid(4),
			rightImgY: withGrid(4),
			imgHeight: withGrid(3),
			imgWidth: withGrid(3),
			indexFrame: 3,
			interval: 10,
			totalFrames: 4,
			ctx,
			width: withGrid(3),
			height: withGrid(3)
		}
	},
	leftShake: {
		top: {
			x: position.x,
			y: position.y,
			imgX: 0,
			leftImgY: withGrid(12),
			rightImgY: withGrid(12),
			imgHeight: withGrid(2.4),
			indexFrame: 3,
			interval: 10,
			totalFrames: 4,
			ctx,
			width: withGrid(3),
			height: withGrid(2.4)
		},
		stump: {
			x: position.x,
			y: position.y,
			imgX: withGrid(9),
			leftImgY: withGrid(12),
			rightImgY: withGrid(12),
			imgHeight: withGrid(3),
			imgWidth: withGrid(3),
			indexFrame: 3,
			interval: 10,
			totalFrames: 4,
			ctx,
			width: withGrid(3),
			height: withGrid(3)
		}
	}
})
