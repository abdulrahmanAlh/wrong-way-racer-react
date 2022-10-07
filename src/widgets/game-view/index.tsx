import { FC } from "react";
import { Box, useTheme, Container } from "@mui/material";

export interface GameViewProps {}

export const GameView: FC<GameViewProps> = () => {
  return (
    <Box
      sx={{
        filter: "drop-shadow(0px 4px 90px #542899);",
      }}
    >
      ddd
    </Box>
  );
};
