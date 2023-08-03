interface MovablePros {
	x: number
	y: number
}

export class Movable {
	x: number = 0
	y: number = 0
	movingWithMap = true
	constructor(props: MovablePros) {
		this.x = props.x
		this.y = props.y
	}

	moveUp(x: number) {
		this.y += x
	}

	moveDown(x: number) {
		this.y -= x
	}

	moveLeft(x: number) {
		this.x += x
	}

	moveRight(x: number) {
		this.x -= x
	}
}
