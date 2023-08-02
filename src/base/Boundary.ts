import { GRID_W, GRID_H, GRID_SCALE, VIEW_OFFSET } from '../utils'
import { Movable } from "./Movable"

interface BoundaryProps {
  x: number
  y: number
  ctx: CanvasRenderingContext2D
}

export class Boundary extends Movable {
  x = 0
  y = 0
  width = GRID_W * GRID_SCALE
  height = GRID_H * GRID_SCALE
  ctx: CanvasRenderingContext2D
  constructor(props: BoundaryProps) {
    super({ x: props.x, y: props.y})
    this.x = props.x
    this.y = props.y
    this.ctx = props.ctx
  }

  draw () {
    this.ctx.fillStyle = 'rgba(255, 0, 0, 0.0)'
    this.ctx.fillRect(
      this.x + VIEW_OFFSET.x,
      this.y + VIEW_OFFSET.y,
      this.width,
      this.height
    )
  }

}