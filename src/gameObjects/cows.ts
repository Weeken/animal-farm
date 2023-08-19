import { withGrid } from '../utils'
import { COW_COLOR, COW_ACTION } from '../base/animal/cow/BaseCow'
import { CowInfo } from '../base/animal/cow/Cow'

export const cows: CowInfo[] = [
	{
		x: withGrid(19),
		y: withGrid(33),
		// x: withGrid(18),
		// y: withGrid(29),
		action: COW_ACTION.WALKING,
		color: COW_COLOR.YELLOW
	},
	{
		x: withGrid(24),
		y: withGrid(32),
		action: COW_ACTION.SMILING,
		color: COW_COLOR.BROWN
	},
	{
		x: withGrid(17),
		y: withGrid(26),
		action: COW_ACTION.EATING,
		color: COW_COLOR.PURPLE
	},
	{
		x: withGrid(15),
		y: withGrid(27),
		action: COW_ACTION.CHEWING,
		color: COW_COLOR.BROWN
	},
	{
		// x: randomPosition({ min: withGrid(15), max: withGrid(19) }),
		// y: randomPosition({ min: withGrid(26), max: withGrid(28) }),
		x: withGrid(15),
		y: withGrid(25),
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
