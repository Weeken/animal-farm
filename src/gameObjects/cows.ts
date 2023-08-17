import { withGrid, randomPosition } from '../utils'
import { CowConfig, COW_COLOR, COW_ACTION } from '../base/animal/Cow'

type CowInfo = Pick<CowConfig, 'x' | 'y' | 'action' | 'color'>

export const cows: CowInfo[] = [
	{
		x: withGrid(20),
		y: withGrid(19),
		action: COW_ACTION.STANDING
	},
	{
		x: randomPosition({ min: withGrid(15), max: withGrid(19) }),
		y: randomPosition({ min: withGrid(26), max: withGrid(28) }),
		action: COW_ACTION.SLEEPING,
		color: COW_COLOR.PINK
	},
	{
		x: withGrid(14),
		y: withGrid(29),
		action: COW_ACTION.STANDING,
		color: COW_COLOR.GREEN
	}
]
