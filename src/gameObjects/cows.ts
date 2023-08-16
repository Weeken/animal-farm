import { withGrid, randomPosition } from '../utils'
import { ChickenConfig } from '../base/animal/Chicken'

type CowInfo = Pick<ChickenConfig, 'x' | 'y' | 'width' | 'height'>

export const cows: CowInfo[] = [
	{
		x: randomPosition({ min: withGrid(15), max: withGrid(19) }),
		y: randomPosition({ min: withGrid(26), max: withGrid(28) }),
		width: withGrid(2),
		height: withGrid(2)
	},
	{
		x: withGrid(14),
		y: withGrid(29),
		width: withGrid(2),
		height: withGrid(2)
	}
]
