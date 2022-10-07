import { FC } from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";

const playersInfo = [
  { name: "Miracle Levin", record: "2:44", rank: "1st" },
  { name: "Lindsey Bergson", record: "2:49", rank: "2st" },
  { name: "Madelyn Levin", record: "2:44", rank: "3st" },
  { name: "Leo Stanton", record: "3:22", rank: "4st" },
  { name: "Martin George", record: "3:24", rank: "5st" },
];

export interface RankingListProps {}

export const RankingList: FC<RankingListProps> = () => {
  return (
    <Paper
      sx={{
        background: "rgba(16, 12, 74, 0.2)",
        boxShadow: "inset 0px 4px 63px rgba(255, 255, 255, 0.25)",
        p: 0,
      }}
    >
      <Box
        component={Paper}
        sx={{
          background:
            "radial-gradient(101.35% 101.35% at 50% 22.11%, rgba(255, 255, 255, 0.19) 0%, rgba(24, 20, 53, 0.26) 71.87%), #9747FF;",
          width: "100%",
          p: 1.5,
          boxShadow: "inset 0px 4px 12px #FFFFFF",
        }}
      >
        <Stack direction={"row"} justifyContent="space-between">
          <Stack>
            <Typography variant="h4" fontWeight={900}>
              3:44
            </Typography>
            <Typography variant="caption">Your Last record</Typography>
          </Stack>
          <Stack
            sx={{
              width: 65,
              height: 65,
              borderRadius: "50%",
              bgcolor: "background.paper",
            }}
            alignItems="center"
            justifyContent={"center"}
          >
            <Typography fontWeight={700}>#144th</Typography>
            <Typography variant="caption">from 15k</Typography>
          </Stack>
        </Stack>
      </Box>

      <List sx={{ maxHeight: 160, overflowY: "scroll" }}>
        {playersInfo.map(({ name, ...others }) => (
          <ListItem key={name} secondaryAction={<RankDetails info={others} />}>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

interface RankDetailsProps {
  info: { rank: string; record: string };
}

const RankDetails: FC<RankDetailsProps> = ({ info: { rank, record } }) => {
  return (
    <Stack
      direction={"row"}
      spacing={1}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          bgcolor: "rgba(38, 27, 80, 1)",
          px: 1,
          height: 42,
        }}
      >
        <Typography variant="caption">Record</Typography>
        <Typography fontWeight={800}>{record}</Typography>
      </Stack>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Typography variant="caption">Rank</Typography>
        <Typography fontWeight={800}>{rank}</Typography>
      </Stack>
    </Stack>
  );
};
