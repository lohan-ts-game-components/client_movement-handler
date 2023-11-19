///<reference lib="dom"/>

import { pack } from "msgpackr";
import { Draw } from "./Draw";
import { Game } from "./Game";
import { KeyboardManager } from "./KeyboardManager";

export type PlayerProps = {
  readonly game: Game;
};

export class Player {
  private _x: number | null;
  private _y: number | nul;
  private kb: KeyboardManager;

  constructor(
    private readonly game: Game
  ) {
    this.kb = game.keyboard;
    console.log("Player created!");
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
  private move(dt: number) {
    /**
     * Récupère l'état des touches de contrôle du joueur
     */
    const keyUp = this.kb.state("KeyW");
    const keyDown = this.kb.state("KeyS");
    const keyLeft = this.kb.state("KeyA");
    const keyRight = this.kb.state("KeyD");

    if (keyUp == 1 || keyDown == 1 || keyLeft == 1 || keyRight == 1) {
      const direction = {
        up: keyUp,
        right: keyRight,
        down: keyDown,
        left: keyLeft,
        dt: dt,
      };
      this.game.websocket.send(pack({ clientDirection: direction }));
    }
  }

  private updatePosition(newX: number, newY: number) {
    this._x = newX;
    this._y = newY;
  }

  public update(dt: number) {
    this.move(dt);
  }

  static create(props: PlayerProps): Player {
    return new Player(props.game);
  }
}
