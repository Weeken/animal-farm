import { Position, loadImage, withGrid } from '../utils'
import berryImg from '../assets/material/berry.png'
import appleImg from '../assets/material/apple.png'
import wheatImg from '../assets/material/wheat.png'
import tomatoImg from '../assets/material/tomato.png'
import cowFoodGrassImg from '../assets/material/cowFoodGrass.png'
import milkImg from '../assets/material/milk.png'
import woodImg from '../assets/material/wood.png'
import branchImg from '../assets/material/branch.png'

export type MaterialType = 'berry' | 'apple' | 'wheat' | 'tomato' | 'cowFoodGrass' | 'milk' | 'wood' | 'branch'

export interface MaterialConfig {
	type: MaterialType
	count: number
	position: Position
	ctx: CanvasRenderingContext2D
}

export const MaterialImagesMap = {
	berry: berryImg,
	apple: appleImg,
	wheat: wheatImg,
	tomato: tomatoImg,
	cowFoodGrass: cowFoodGrassImg,
	milk: milkImg,
	wood: woodImg,
	branch: branchImg
}

export class Material {
	type: MaterialType
	count = 1
	position: Position
	ctx: CanvasRenderingContext2D
	image: HTMLImageElement | null = null
	isShow = false
	constructor(config: MaterialConfig) {
		this.type = config.type
		this.count = config.count
		this.position = config.position
		this.ctx = config.ctx
	}

	draw() {
		if (!this.isShow) return
		return new Promise(resolve => {
			if (this.image) {
				this.ctx.drawImage(
					this.image,
					0,
					0,
					withGrid(1),
					withGrid(1),
					this.position.x + 4,
					this.position.y + 10,
					withGrid(1) - 20,
					withGrid(1) - 20
				)
			} else {
				loadImage(MaterialImagesMap[this.type]).then(img => {
					this.image = img
					this.ctx.drawImage(
						this.image,
						0,
						0,
						withGrid(1),
						withGrid(1),
						this.position.x + 4,
						this.position.y + 10,
						withGrid(1) - 20,
						withGrid(1) - 20
					)
				})
			}
			this.ctx.font = 'bold 16px Microsoft Yahei'
			this.ctx.fillStyle = 'white'
			this.ctx.fillText(`${this.count}`, this.position.x + withGrid(1) - 20, this.position.y + withGrid(1) - 10)
			resolve(this.image)
		})
	}
}
