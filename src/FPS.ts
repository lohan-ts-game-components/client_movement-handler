export class FPS {
  private _fpsCounter: number = 0;
  private _fpsTimer: number = 0;
  private _fpsCount: number = 0;
  private _displayTimer: number = 0; // Timer to track when to display the FPS

  constructor() {}

  private updateFPS() {
    const now = performance.now();
    if (this._fpsTimer === 0) {
      this._fpsTimer = now;
    }
    const deltaTime = now - this._fpsTimer;
    this._fpsCounter += 1;

    if (deltaTime >= 1000) {
      this._fpsCount = this._fpsCounter;
      this._fpsCounter = 0;
      this._fpsTimer = now;
    }
  }

  public update() {
    this.updateFPS();

    // Only display the FPS count once per second
    const now = performance.now();
    if (now - this._displayTimer >= 1000) {
      document.getElementById("fps").innerText = `${this._fpsCount}`;
      //   console.log(`FPS: ${this._fpsCount}`);
      this._displayTimer = now; // Reset the display timer
    }
  }

  public getFPS(): number {
    return this._fpsCount;
  }
}
