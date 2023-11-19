import { Draw } from './Draw'
import { Game } from './Game'
import { KeyboardManager } from './KeyboardManager'
import './style.css'
async function main() {
  const canvas: HTMLElement | any = document.getElementById('canvas')

  const draw = Draw.create({
    canvas: canvas,
    alpha: true
  })
  const kbm = new KeyboardManager()

  const game = Game.createAndLaunch({
    draw: draw,
    keyboard: kbm
  })

  if (!game) {
    console.error("Game not created!")
  } else {
    console.log("Start Game!")
    kbm.watch()
  }
}
main()