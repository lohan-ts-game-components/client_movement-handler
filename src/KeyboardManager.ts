export class KeyboardManager {
    private readonly _keys: {[key: string]: number} = {}
  
    constructor() {}
  
    /**
     * KeyW, KeyS, KeyA, KeyD, ArrowUp, ArrowDown, ...
     */
  
    watch() {
      this.unwatch()
      window.onkeydown = (event: KeyboardEvent) => {
        event.stopPropagation()
        this._keys[event.code] = 1
      }
      window.onkeyup = (event: KeyboardEvent) => {
        event.stopPropagation()
        this._keys[event.code] = 0
      }
    }
  
    unwatch() {
      window.onkeydown = null
      window.onkeyup = null
    }
  
    state(key: string): number {
      return this._keys[key] ?? 0
    }
  }
  