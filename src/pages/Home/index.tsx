import { Box, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { GameView } from "widgets/game-view";

function HomePage() {
  return (
    <Stack direction={"column"} spacing={2} sx={{ height: "100%" }}>
      <Box sx={{ flex: "1 1 100%" }}>
        <GameView />
      </Box>
      <Box>ss</Box>
    </Stack>
  );
}

export default HomePage;
