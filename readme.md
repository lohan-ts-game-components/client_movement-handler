# client_movement-handler

This TypeScript game component is designed for managing player movements in a game environment. It leverages WebSocket communication with a Bun.js server for real-time, responsive interaction.
<br>
Git of the Bun.js server : https://github.com/lohan-ts-game-components/server_movement-handler

## Key Features

- **Player Movement Management**: Handles player movements within the game environment.
- **|WIP| WebSocket Communication**: Uses WebSockets for real-time communication with the game server.
- **Graphics Rendering**: Integrates rendering capabilities to display the player and their movements on screen.

## Project Structure

The project is organized as follows:

- `src/Game.ts`: Contains the main game logic, including the game loop and state management.
- `src/Player.ts`: Defines the `Player` class, managing the player's properties and movements.
- `src/KeyboardManager.ts`: Manages keyboard inputs for player control.
- `src/FPS.ts`: A utility for tracking and displaying Frames Per Second (FPS).
- `src/Draw.ts`: Provides functions for graphical rendering in the game.
- `src/main.ts`: The main entry point of the game, initializing components and starting the game loop.
- `package.json`: Details the project's dependencies and scripts.

## Installation and Usage

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/lohan-ts-game-components/client_movement-handler.git
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Run the Game:**
   ```bash
   npm run dev
   ```
## Technologies Used

- Vite with TypeScript
