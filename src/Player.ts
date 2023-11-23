///<reference lib="dom"/>

import { pack } from "msgpackr";
import { Game } from "./Game";
import { KeyboardManager } from "./KeyboardManager";

export type PlayerProps = {
  readonly game: Game;
};

export class Player {
  private _x: number = 0;
  private _y: number = 0;
  private targetX: number = 0;
  private targetY: number = 0;
  private lerpFactor: number = 0.1;
  private kb: KeyboardManager;

  private lastDirection = { up: 0, right: 0, down: 0, left: 0 };

  constructor(private readonly game: Game) {
    this.kb = game.keyboard;
    console.log("Player created!");
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  private move() {
    const keyUp = this.kb.state("KeyW");
    const keyDown = this.kb.state("KeyS");
    const keyLeft = this.kb.state("KeyA");
    const keyRight = this.kb.state("KeyD");

    const directionChanged =
      keyUp !== this.lastDirection.up ||
      keyDown !== this.lastDirection.down ||
      keyLeft !== this.lastDirection.left ||
      keyRight !== this.lastDirection.right;

    if (directionChanged) {
      const direction = {
        up: keyUp,
        right: keyRight,
        down: keyDown,
        left: keyLeft,
      };
      this.game.websocket.send(pack({ clientDirection: direction }));
      this.lastDirection = {
        up: keyUp,
        right: keyRight,
        down: keyDown,
        left: keyLeft,
      };
    }
  }

  // Get position data from the server
  private updatePosition(newX: number, newY: number) {
    this.targetX = newX;
    this.targetY = newY;
  }

  private interpolatePosition() {
    this._x += (this.targetX - this._x) * this.lerpFactor;
    this._y += (this.targetY - this._y) * this.lerpFactor;
  }

  public update(dt: number) {
    this.move();
    this.interpolatePosition();
  }

  static create(props: PlayerProps): Player {
    return new Player(props.game);
  }
}
