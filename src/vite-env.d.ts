/// <reference types="vite/client" />

interface Ctx {
	upper: CanvasRenderingContext2D
	middle: CanvasRenderingContext2D
	down: CanvasRenderingContext2D
}

interface LoadedAssets {
	[key: string]: HTMLImageElement | LoadedAssets
}

interface Window {
	myGameGlobalData: {
		ctx: Ctx
		assets: LoadedAssets
	}
}
