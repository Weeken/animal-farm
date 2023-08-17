import { withGrid, randomPosition } from '../utils'
import { ChickenConfig, CHICKEN_ACTION, CHICKEN_COLOR } from '../base/animal/Chicken'

type ChickenInfo = Pick<ChickenConfig, 'x' | 'y' | 'width' | 'height' | 'action' | 'color'>

export const chickens: ChickenInfo[] = [
	{
		x: randomPosition({ min: withGrid(33), max: withGrid(36) }),
		y: randomPosition({ min: withGrid(15), max: withGrid(16) }),
		action: CHICKEN_ACTION.SLEEPING,
		color: CHICKEN_COLOR.BLUE
	},
	{
		x: randomPosition({ min: withGrid(33), max: withGrid(36) }),
		y: randomPosition({ min: withGrid(15), max: withGrid(16) }),
		action: CHICKEN_ACTION.STANDING,
		color: CHICKEN_COLOR.RED
	}
]
