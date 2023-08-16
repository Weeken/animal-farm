import { withGrid, randomPosition } from '../utils'
import { ChickenConfig, CHICKEN_ACTION } from '../base/animal/Chicken'

type ChickenInfo = Pick<ChickenConfig, 'x' | 'y' | 'width' | 'height' | 'action'>

export const chickens: ChickenInfo[] = [
	{
		x: withGrid(20),
		y: withGrid(19),
		action: CHICKEN_ACTION.STANDING
	},
	{
		x: randomPosition({ min: withGrid(33), max: withGrid(36) }),
		y: randomPosition({ min: withGrid(15), max: withGrid(16) }),
		action: CHICKEN_ACTION.SLEEPING
	},
	{
		x: randomPosition({ min: withGrid(33), max: withGrid(36) }),
		y: randomPosition({ min: withGrid(15), max: withGrid(16) }),
		action: CHICKEN_ACTION.STANDING
	}
]
