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
	growUp: FruitTreeConfig
}

export const fruitTreeAnimations: (position: Position, ctx: CanvasRenderingContext2D) => FruitTreeAnimations = (
	position: Position,
	ctx: CanvasRenderingContext2D
) => ({
	growUp: {
		top: {
			x: position.x,
			y: position.y,
			imgX: 0,
			leftImgY: withGrid(3),
			rightImgY: withGrid(3),
			imgHeight: withGrid(3),
			interval: 10,
			totalFrames: 4,
			ctx,
			width: withGrid(3),
			height: withGrid(3)
		},
		stump: {
			x: position.x,
			y: position.y,
			imgX: withGrid(1),
			leftImgY: withGrid(5),
			rightImgY: withGrid(5),
			imgHeight: withGrid(1),
			imgWidth: withGrid(1),
			interval: 10,
			totalFrames: 4,
			ctx,
			width: withGrid(3),
			height: withGrid(3)
		}
	}
})
