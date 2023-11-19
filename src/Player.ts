///<reference lib="dom"/>

import { Draw } from './Draw'
import { Game } from './Game'
import { KeyboardManager } from './KeyboardManager'

export type PlayerProps = {
  readonly game: Game
  readonly initialX: number
  readonly initialY: number
  readonly speed: number
}

export class Player {
  private _x: number
  private _y: number
  private draw: Draw
  private kb: KeyboardManager

  constructor(
    private readonly game: Game,
    private readonly initialX: number,
    private readonly initialY: number,
    private readonly speed: number
  ) {
    this.kb = game.keyboard
    this.draw = game.draw
    this._x = initialX
    this._y = initialY
    console.log('Player created!')
  }

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }

  private move(dt: number) {
    /**
     * Récupère l'état des touches de contrôle du joueur
     */
    const keyUp = this.kb.state('KeyW')
    const keyDown = this.kb.state('KeyS')
    const keyLeft = this.kb.state('KeyA')
    const keyRight = this.kb.state('KeyD')

    /**
     * Translation
     */
    const distance = this.speed * dt
    const dx = -((keyLeft - keyRight) * distance)
    const dy = -((keyUp - keyDown) * distance)

    const newX = this._x + dx
    const newY = this._y + dy
    if(newX > 0 && newX < 900) {
        this._x = newX
    }
    if(newY > 0 && newY < 600) {
        this._y = newY
    }
  }

  public update(dt: number) {
    this.move(dt)
  }

  

  static create(props: PlayerProps): Player {
    return new Player(props.game, props.initialX, props.initialY, props.speed)
  }
}
