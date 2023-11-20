///<reference lib="dom"/>

import { pack } from "msgpackr";
import { Draw } from "./Draw";
import { Game } from "./Game";
import { KeyboardManager } from "./KeyboardManager";

export type PlayerProps = {
  readonly game: Game;
};

export class Player {
  private _x: number = 0;
  private _y: number = 0;
  private kb: KeyboardManager;
  private draw: Draw;
  private lastSendTime: number = 0; // Ajoutez cette ligne

  constructor(
    private readonly game: Game
  ) {
    this.kb = game.keyboard;
    this.draw = game.draw;
    console.log("Player created!");
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
  private move(dt: number) {
    const keyUp = this.kb.state("KeyW");
    const keyDown = this.kb.state("KeyS");
    const keyLeft = this.kb.state("KeyA");
    const keyRight = this.kb.state("KeyD");
  
    if (keyUp == 1 || keyDown == 1 || keyLeft == 1 || keyRight == 1) {
      // Prédiction du client
      const distance = 0.5 * dt;
      const dx = -((keyLeft - keyRight) * distance);
      const dy = -((keyUp - keyDown) * distance);
      this._x += dx;
      this._y += dy;
  
      // Envoyer les directions au serveur
      const currentTime = Date.now();
      if (currentTime - this.lastSendTime >= 100) {
        this.lastSendTime = currentTime;
        const direction = { up: keyUp, right: keyRight, down: keyDown, left: keyLeft, dt: dt };
        this.game.websocket.send(pack({ clientDirection: direction }));
      }
    }
  }

  // Get position data from the server
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
