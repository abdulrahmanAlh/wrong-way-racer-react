import { FC, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { Application, Sprite, Container } from "pixi.js";
import { LoadAssets, StartAnimations } from "./gameLogic";

export interface GameViewProps {}

export const GameView: FC<GameViewProps> = () => {
  const ref: any = useRef(null);

  useEffect(() => {
    const app = new Application({
      width: 1200,
      height: 600,
      backgroundAlpha: 0,
      resolution: window.devicePixelRatio || 1,
    });
    document.body.appendChild(app.view);

    // const container = new Container();

    // app.stage.addChild(container);

    //Load all assets and draw it.
    LoadAssets(app);
    // StartAnimations(app);
    // On first render add app to DOM

    ref?.current.appendChild(app.view);

    // Start the PixiJS app

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
