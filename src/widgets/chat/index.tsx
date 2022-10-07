import { FC } from "react";
import {
  Box,
  Stack,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export interface ChatProps {}

const messages = [
  {
    content: "Nazanin Has Joind the Game",
    type: "JOIND",
  },
  {
    content: "Skylar Baptosta:  how you doing mate",
    type: "MESSAGE",
  },
  {
    content: "Wilson Rosser:  Not bad",
    type: "MESSAGE",
  },
  {
    content: "Ahmad Dias:  did you win last round",
    type: "MESSAGE",
  },
  {
    content: "Skylar Baptosta:  yes,  headed for 2:30",
    type: "MESSAGE",
  },
  {
    content: "Livia:  wow Cool!",
    type: "MESSAGE",
  },
  {
    content: "The Game Start in 6...",
    type: "INFO",
  },
];

export const Chat: FC<ChatProps> = () => {
  return (
    <Stack direction={"column"} spacing={1.5}>
      <Paper
        sx={{
          flex: "1 1 100%",
          height: 200,
        }}
      >
        <Stack spacing={0.5}>
          {messages.map(({ content, type }, index) => (
            <Typography variant="body2">{content}</Typography>
          ))}
        </Stack>
      </Paper>
      <Stack direction={"row"} spacing={2}>
        <TextField placeholder="Type..." sx={{ width: "100%" }} />
        <Button variant="contained">Send</Button>
      </Stack>
    </Stack>
  );
};
