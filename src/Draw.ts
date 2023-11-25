export type DrawProps = {
  readonly canvas: HTMLCanvasElement;
  readonly alpha: boolean;
};

export class Draw {
  private static getCtxError(canvas: HTMLCanvasElement): false {
    console.error(
      `Impossible d'obtenir un contexte de rendu 2D du canvas d'identifiant "${canvas.id}"`
    );
    return false;
  }

  static create(props: DrawProps): Draw | false {
    const ctx = props.canvas.getContext("2d", { alpha: props.alpha });
    if (ctx == null) {
      return Draw.getCtxError(props.canvas);
    }
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = props.canvas.width;
    offscreenCanvas.height = props.canvas.height;
    const offscreenCtx = offscreenCanvas.getContext("2d", {
      alpha: props.alpha,
    });
    if (offscreenCtx === null) {
      return Draw.getCtxError(offscreenCanvas);
    }
    ctx.globalCompositeOperation = "source-over";
    offscreenCtx.globalCompositeOperation = "source-over";
    return new Draw(
      props.canvas,
      ctx,
      props.alpha,
      offscreenCanvas,
      offscreenCtx
    );
  }

  private constructor(
    private readonly _canvas: HTMLCanvasElement,
    private readonly _ctx: CanvasRenderingContext2D,
    private readonly _alpha: boolean,
    private readonly _offscreenCanvas: HTMLCanvasElement,
    private readonly _offscreenCtx: CanvasRenderingContext2D
  ) {
    console.log("Draw created!");
  }

  get canvas() {
    return this._offscreenCanvas;
  }
  get ctx() {
    return this._offscreenCtx;
  }
  get alpha() {
    return this._alpha;
  }
  get width(): number {
    return this._canvas.width;
  }
  get height(): number {
    return this._canvas.height;
  }

  //rectangle plein
  drawRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ): void {
    this._offscreenCtx.fillStyle = color;
    this._offscreenCtx.fillRect(x, y, width, height);
  }

  drawEmptyRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ): void {
    this._offscreenCtx.strokeStyle = color;
    this._offscreenCtx.strokeRect(x, y, width, height);
  }

  drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string
  ): void {
    this._offscreenCtx.strokeStyle = color;
    this._offscreenCtx.beginPath();
    this._offscreenCtx.moveTo(x1, y1);
    this._offscreenCtx.lineTo(x2, y2);
    this._offscreenCtx.stroke();
  }

  drawText(
    text: string,
    x: number,
    y: number,
    color: string,
    fontSize: string,
    fontFamily: string,
    textAlign: CanvasTextAlign,
    textBaseline: CanvasTextBaseline
  ): void {
    this._offscreenCtx.fillStyle = color;
    this._offscreenCtx.font = `${fontSize} ${fontFamily}`;
    this._offscreenCtx.textAlign = textAlign;
    this._offscreenCtx.textBaseline = textBaseline;
    this._offscreenCtx.fillText(text, x, y);
  }

  drawArc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    color: string,
    isFill: boolean = false
  ): void {
    this._offscreenCtx.strokeStyle = color;
    this._offscreenCtx.beginPath();
    this._offscreenCtx.arc(x, y, radius, startAngle, endAngle);

    if (isFill) {
      this._offscreenCtx.fillStyle = color;
      this._offscreenCtx.fill();
    }

    this._offscreenCtx.stroke();
  }

  clear() {
    this._offscreenCtx.clearRect(0, 0, this.width, this.height);
    this._ctx.clearRect(0, 0, this.width, this.height);
  }

  syncScreen() {
    this._ctx.drawImage(this._offscreenCanvas, 0, 0);
  }
}
