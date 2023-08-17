import { VIEW_WIDTH, VIEW_HEIGHT } from './index'

// export interface Ctx {
// 	upper: CanvasRenderingContext2D
// 	middle: CanvasRenderingContext2D
// 	down: CanvasRenderingContext2D
// }

export const getCtx = (id: string) => {
	return new Promise<CanvasRenderingContext2D>((resolve, reject) => {
		const canvas: HTMLCanvasElement | null = document.querySelector(`#${id}`)
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

export const generateCtx: () => Promise<Ctx> = async () => {
	const upperCtx = await getCtx(`upper`)
	const middleCtx = await getCtx(`middle`)
	const downCtx = await getCtx(`down`)
	return {
		upper: upperCtx,
		middle: middleCtx,
		down: downCtx
	}
}
