import { Draw } from './Draw'
import { FPS } from './FPS'
import { KeyboardManager } from './KeyboardManager'
import { Player } from './Player'

export type GameProps = {
  readonly draw: Draw
  readonly keyboard: KeyboardManager
  readonly websocket: WebSocket
}

export class Game {
  private time: number = -1
  private deltaTime: number = 1
  private _player: Player
  private _fps: FPS

  // #########################################################################
  /**
   * Constructeur
   */
  constructor(
    private readonly _draw: Draw,
    private readonly _keyboard: KeyboardManager,
    private readonly _websocket: WebSocket
  ) {

    this._player = Player.create({
      game: this
    })
    this._fps = new FPS()

    console.log('Game created!')
    this.render(0)
  }

  // #########################################################################
  /**
   * Initialisation
   */
  public async init(): Promise<Game> {
    return this
  }

  get draw() {
    return this._draw
  }

  get websocket() {
    return this._websocket
  }

  get player() {
    return this._player
  }

  get keyboard() {
    return this._keyboard
  }

  // #########################################################################
  /**
   * Mise à jour des informations du canvas
   */
  private update(time: number) {
    // Mettre à jour les variables de temps
    if (this.time === -1) {
      this.deltaTime = 0
    } else {
      this.deltaTime = time - this.time
    }
    this.time = time

    if (this._player) {
        this._player.update(this.deltaTime)
    }
    
    this._fps.update()
  }

  // #########################################################################
  /**
   * Affichage des mises à jour du canvas
   */
  private render(time: number) {
    this.update(time)
    this.draw.clear();

    if (this._player) {
      const playerX = this._player.x
      const playerY = this._player.y

      this.draw.drawArc(playerX, playerY, 10, 0, Math.PI*2, 'red', true)
    }

    // Demande un nouveau rendu
    this.draw.syncScreen()
    requestAnimationFrame(this.render.bind(this))
  }

  static create(props: GameProps): Game {
    return new Game(props.draw, props.keyboard, props.websocket)
  }

  static createAndLaunch(props: GameProps): Game | false {
    const game = Game.create(props)
    return game.init() && game
  }
}
