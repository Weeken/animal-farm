import { VIEW_WIDTH, VIEW_HEIGHT } from './index'

export const getCtx = () => {
	return new Promise<CanvasRenderingContext2D>((resolve, reject) => {
		const canvas = document.querySelector('canvas')
		let ctx: CanvasRenderingContext2D | null | undefined = null
		if (canvas !== null) {
			canvas.width = VIEW_WIDTH
			canvas.height = VIEW_HEIGHT
			ctx = canvas.getContext('2d')
			if (ctx) {
				resolve(ctx)
			} else {
				reject('no ctx')
			}
		} else {
			reject('no canvas dom')
		}
	})
}
