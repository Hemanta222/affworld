import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#603799",
      // main: "#16111D",
    },
    secondary: {
      main: "#1976d2",
    },
    text: {
      white: "#fff",
      black: "#000",
      primary: "#16111D",
      secondary: "#16111D",
      secondaryLight: "#8082a9",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
      contrastText: "#fff",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
      contrastText: "#fff",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
      contrastText: "#fff",
    },
  },
});
