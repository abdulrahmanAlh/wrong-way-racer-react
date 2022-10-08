import { FC, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { Application, Sprite, Container, Texture } from "pixi.js";
import { GAME_ASSETS } from "utils/constants/assets";

export interface GameViewProps {}
const app = new Application({
  width: 1200,
  height: 600,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

const container = new Container();

app.stage.addChild(container);

// Create a new texture
const texture = Texture.from("images/sky.png");

// Create a 5x5 grid of bunnies
// for (let i = 0; i < 25; i++) {
const bunny = new Sprite(texture);
// center the sprite's anchor point
// bunny.anchor.set(0.5);

// move the sprite to the center of the screen
bunny.width = app.screen.width;
bunny.height = app.screen.height / 2;
// bunny.y = app.screen.height - bunny.height;

container.addChild(bunny);

const texture1 = Texture.from("images/road.png");

// Create a 5x5 grid of bunnies
// for (let i = 0; i < 25; i++) {
const bunny1 = new Sprite(texture1);
// center the sprite's anchor point
// bunny.anchor.set(0.5);

// move the sprite to the center of the screen
bunny1.width = app.screen.width;
bunny1.height = app.screen.height / 2;
bunny1.y = app.screen.height - bunny1.height;

container.addChild(bunny1);
// }

// Move container to the center
// container.x = app.screen.width / 2;
// container.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
// container.pivot.x = container.width / 2;
// container.pivot.y = container.height / 2;

// Listen for animate update
// app.ticker.add((delta) => {
//   // rotate the container!
//   // use delta to create frame-independent transform
//   container.rotation -= 0.01 * delta;
// });

export const GameView: FC<GameViewProps> = () => {
  const ref: any = useRef(null);

  useEffect(() => {
    // On first render add app to DOM
    ref?.current.appendChild(app.view);
    // Start the PixiJS app
    // app.loader.add(GAME_ASSETS).load(() => {});

    app.start();

    return () => {
      // On unload stop the application
      app.stop();
    };
  }, []);
  return (
    <Box
      sx={{
        filter: "drop-shadow(0px 4px 90px #542899);",
      }}
    >
      <div ref={ref} />
    </Box>
  );
};
