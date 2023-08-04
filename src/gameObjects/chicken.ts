import { withGrid, randomPosition } from '../utils'
import { ChickenConfig } from '../base/Chicken'
import StandingChicken from '../assets/chicken-1.png'
import WalkingChicken from '../assets/chicken-2.png'

type ChickenInfo = Pick<
	ChickenConfig,
	'x' | 'y' | 'src' | 'width' | 'frames' | 'height' | 'state' | 'walkingLeftStartFrame'
>

export const chickens: ChickenInfo[] = [
	{
		x: randomPosition({ min: withGrid(33), max: withGrid(36) }),
		y: randomPosition({ min: withGrid(15), max: withGrid(16) }),
		src: StandingChicken,
		width: withGrid(1),
		height: withGrid(1),
		frames: 2,
		state: 'standing'
	},
	{
		x: withGrid(33),
		y: withGrid(17),
		src: WalkingChicken,
		width: withGrid(1),
		height: withGrid(1),
		frames: 6,
		state: 'moving',
		walkingLeftStartFrame: 4
	}
]
