// import { createApp } from 'vue'
import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')

import { screenCenter, VIEW_WIDTH, VIEW_HEIGHT, withGrid, ROW_GRID_NUM, VIEW_OFFSET, ROLE_WIDTH, ROLE_HEIGHT } from "./utils"
import MapImg from './assets/map.png'
import Me from './assets/me.png'
import HouseRoot from './assets/house/house-root.png'
import SmallDoorImg from './assets/house/door.png'
import StandingChicken from './assets/chicken-1.png'
import WalkingChicken from './assets/chicken-2.png'
// import { GameObject } from './base/GameObject'
import { Controller } from './base/Controller'
import { IslandMap } from './base/Map'
import { Boundary } from './base/Boundary'
import { Player } from './base/Player'
import { collisions } from './collisions'
import { House } from './base/House'
import { SmallDoor } from './base/SmallDoor'
import { Chicken } from './base/Chicken'



const getCtx = async () => {
  const canvas = document.querySelector('canvas')
  canvas &&  (canvas.width = VIEW_WIDTH)
  canvas && (canvas.height = VIEW_HEIGHT)

  const ctx = canvas?.getContext('2d')

  return ctx ? ctx : null
}

const initMap = async (ctx: CanvasRenderingContext2D | null) => {
  if (!ctx) return
  const mapImg = new IslandMap({src: MapImg, x: VIEW_OFFSET.x, y: VIEW_OFFSET.y, ctx})
  // await mapImg.draw()
  return mapImg
}

const createPlayer = async (ctx: CanvasRenderingContext2D | null) => {
  if (!ctx) return
  const player = new Player({
    x: screenCenter.x,
    y: screenCenter.y,
    src: Me,
    width: ROLE_WIDTH,
    height: ROLE_HEIGHT,
    ctx
  })
  return player
}

const getBoundaries = async (ctx: CanvasRenderingContext2D | null) => {
  if (!ctx) return []
  const collisionMap: number[][] = []
  const boundaries: Boundary[] = []
  for (let index = 0; index < collisions.length; index += ROW_GRID_NUM) {
    collisionMap.push(collisions.slice(index, index + 70))
  }
  collisionMap.forEach((row, i) => {
    row.forEach((b, j) => {
      if (b === 232) {
        boundaries.push(new Boundary({
          x: withGrid(j),
          y: withGrid(i),
          ctx
        }))
      }
    })
  })
  return boundaries || []
}

const createHouse = async (ctx: CanvasRenderingContext2D | null, player?: Player) => {
  if (!ctx) return
  const houseImg = new House({
    src: HouseRoot, 
    x: withGrid(15), 
    y: withGrid(12),
    width: withGrid(5),
    height: withGrid(5),
    ctx,
    player
  })
  // await mapImg.draw()
  return houseImg
}

const createSmallDoor = async (ctx: CanvasRenderingContext2D | null, player?: Player) => {
  if (!ctx) return
  const doorImg = new SmallDoor({
    src: SmallDoorImg, 
    x: withGrid(17), 
    y: withGrid(16),
    width: withGrid(1),
    height: withGrid(1),
    ctx,
    player
  })
  // await mapImg.draw()
  return doorImg
}

const createChicken = async (ctx: CanvasRenderingContext2D | null, src: string, x: number, y: number, frames: number, state: 'standing' | 'moving') => {
  if (!ctx) return
  const chicken = new Chicken({
    x,
    y,
    src,
    width: withGrid(1),
    height: withGrid(1),
    ctx,
    frames,
    state
  })
  return chicken
}



const init = async () => {
  const ctx = await getCtx()
  if (!ctx) return

  const map = await initMap(ctx)
  const player = await createPlayer(ctx)
  const boundaries = await getBoundaries(ctx)
  const house = await createHouse(ctx, player)
  const door = await createSmallDoor(ctx, player)
  const standingChicken = await createChicken(ctx, StandingChicken, withGrid(36), withGrid(15), 2, 'standing')
  const walkingChicken = await createChicken(ctx, WalkingChicken, withGrid(33), withGrid(16), 8, 'moving')
  // const walkingChicken = await createChicken(ctx, WalkingChicken, withGrid(20), withGrid(18), 8, 'moving')
  
  const gameLoop = () => {
    const frame = () => {
      ctx.clearRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT)

      map?.draw()

      boundaries?.forEach(boundary => {
        boundary.draw()
      })

      door?.draw()

      standingChicken?.standing()
      walkingChicken?.walking()
      
      
      if (player?.isDigging) {
        player?.digging()
      } else if (player?.isCutting) {
        player?.cutting()
      } else {
        player?.draw()
      }

      
      house?.draw()

      window.requestAnimationFrame(() => {
        frame()
      })
    }
    frame()
  }

  let movableObjects: any[] = [map, ...boundaries, door, house, standingChicken, walkingChicken]
  let controller: Controller | undefined = undefined
  if (map && boundaries && player) {
    controller = new Controller({
      movableObjects,
      player,
      boundaries
    })
  } 
  
  controller && controller.init()

  gameLoop()
}


init()

