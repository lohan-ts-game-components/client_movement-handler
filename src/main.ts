import { Draw } from "./Draw";
import { Game } from "./Game";
import { KeyboardManager } from "./KeyboardManager";

import "./style.css";
let game: Game | any;

let ws: WebSocket;
function connectWebSocket() {
  ws = new WebSocket("ws://localhost:8000");

  ws.addEventListener("open", (event) => {
    console.log("WebSocket connection opened.");
    // let msg = pack({ gfs: 'map', name: 'Grassland' })
    // ws.send(msg)
    const canvas: HTMLElement | any = document.getElementById("canvas");

    const draw = Draw.create({
      canvas: canvas,
      alpha: true,
    });
    const kbm = new KeyboardManager();

    game = Game.createAndLaunch({
      draw: draw,
      keyboard: kbm,
      websocket: ws,
    });

    if (!game) {
      console.error("Game not created!");
    } else {
      console.log("Start Game!");
      kbm.watch();
    }
  });

  ws.addEventListener("message", (event) => {
    console.log("Received message:", event.data);
    const data = JSON.parse(event.data);
    if (data.clientPosition) {
      game.player.updatePosition(data.clientPosition.x, data.clientPosition.y)
    }
  });

  ws.addEventListener("close", (event) => {
    console.log("WebSocket connection closed.");
    // Handle the close event and attempt to reconnect
    setTimeout(() => {
      connectWebSocket(); // Retry the connection
    }, 2000); // Retry every 2 seconds (you can adjust the interval)
  });

  ws.addEventListener("error", (error) => {
    console.error("WebSocket error:", error);
    // Handle the error, you may also want to attempt a reconnection here
  });
}
connectWebSocket();
