import { FC } from "react";
import { Box, useTheme, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => {
  const { palette } = useTheme();

  return (
    <Box>
      <Container sx={{ height: "100vh", py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
};
