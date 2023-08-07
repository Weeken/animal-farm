import { withGrid, randomPosition } from '../utils'
import { ChickenConfig } from '../base/animal/Chicken'
import StandingCow from '../assets/standing-cow.png'
import WalkingCow from '../assets/walking-cow.png'

type CowInfo = Pick<
	ChickenConfig,
	'x' | 'y' | 'src' | 'width' | 'frames' | 'height' | 'state' | 'walkingLeftStartFrame'
>

export const cows: CowInfo[] = [
	{
		x: randomPosition({ min: withGrid(15), max: withGrid(19) }),
		y: randomPosition({ min: withGrid(26), max: withGrid(28) }),
		src: StandingCow,
		width: withGrid(2),
		height: withGrid(2),
		frames: 3,
		state: 'standing'
	},
	{
		x: withGrid(14),
		y: withGrid(29),
		src: WalkingCow,
		width: withGrid(2),
		height: withGrid(2),
		frames: 6,
		state: 'moving',
		walkingLeftStartFrame: 3
	}
]
