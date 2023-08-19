import { withGrid, randomPosition } from '../utils'
import { ChickenInfo, CHICKEN_ACTION, CHICKEN_COLOR } from '../base/animal/chicken/BaseChicken'

export const chickens: ChickenInfo[] = [
	{
		x: withGrid(34),
		y: withGrid(17),
		action: CHICKEN_ACTION.WALKING,
		color: CHICKEN_COLOR.GREEN
	},
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
