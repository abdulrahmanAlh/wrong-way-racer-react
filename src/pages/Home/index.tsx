import { Box, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { Chat } from "widgets/chat";
import { GameView } from "widgets/game-view";
import { Players } from "widgets/players";
import { RankingList } from "widgets/ranking-list";

function HomePage() {
  return (
    <Stack direction={"column"} spacing={2} sx={{ height: "100%" }}>
      <Box flex={"1 1 100%"}>
        <GameView />
      </Box>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <RankingList />
        </Grid>
        <Grid item md={4} xs={12}>
          <Chat />
        </Grid>
        <Grid item md={4} xs={12}>
          <Players />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default HomePage;
