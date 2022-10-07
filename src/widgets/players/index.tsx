import { FC } from "react";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import SettingsIcon from "@mui/icons-material/Settings";

export interface PlayersProps {}

export const Players: FC<PlayersProps> = () => {
  return (
    <Paper
      sx={{
        background: "rgba(16, 12, 74, 0.2)",
        boxShadow: "inset 0px 4px 63px rgba(255, 255, 255, 0.25)",
        p: 0,
      }}
    >
      <Box
        sx={{
          py: 0.5,
          px: 2,
          borderRadius: "12px 12px 0px 0px",
          background:
            "linear-gradient(0deg, rgba(19, 20, 68, 0.5), rgba(19, 20, 68, 0.5)), radial-gradient(101.35% 101.35% at 50% 22.11%, rgba(34, 21, 49, 0.5) 0%, rgba(22, 22, 48, 0.5) 71.87%)",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={700}>
            Players
          </Typography>
          <Typography variant="body2" fontWeight={700}>
            8/12
          </Typography>
        </Stack>
      </Box>
      <Stack spacing={1.5} sx={{ p: 1 }}>
        <Button variant="contained" startIcon={<SettingsIcon />}>
          Setting
        </Button>
        <Stack direction={"row"} alignItems="center" spacing={1}>
          <Avatar src="images/person1.png" sx={{ width: 24, height: 24 }} />
          <Typography>Skylar Baptista</Typography>
        </Stack>
        <Stack direction={"row"} alignItems="center" spacing={1}>
          <Avatar src="images/person1.png" sx={{ width: 24, height: 24 }} />
          <Typography>Skylar Baptista</Typography>
        </Stack>
        <Stack direction={"row"} alignItems="center" spacing={1}>
          <Avatar src="images/person1.png" sx={{ width: 24, height: 24 }} />
          <Typography>Skylar Baptista</Typography>
        </Stack>
        <Stack direction={"row"} alignItems="center" spacing={1}>
          <Avatar src="images/person1.png" sx={{ width: 24, height: 24 }} />
          <Typography>Skylar Baptista</Typography>
        </Stack>
        <Stack direction={"row"} alignItems="center" spacing={1}>
          <Avatar src="images/person1.png" sx={{ width: 24, height: 24 }} />
          <Typography>Skylar Baptista</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};
