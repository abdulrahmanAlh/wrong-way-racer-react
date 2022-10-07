import { createTheme } from "@mui/material/styles";
// import { experimental_sx as sx } from "@mui/material/styles";

export const Theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default:
        "linear-gradient(234.36deg, rgba(12, 12, 76, 0.5) 2.69%, rgba(6, 6, 6, 0) 43.67%), radial-gradient(168.67% 168.67% at 48.89% 54.41%, rgba(78, 32, 130, 0.5) 0%, rgba(12, 12, 76, 0.5) 71.88%), #080817;",
    },
    text: {
      primary: "#fff",
    },
  },
  typography: { fontFamily: "'Cairo', sans-serif" },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          background: theme.palette.background.default,
        },
      }),
    },
  },
});
