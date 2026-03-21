import { createTheme } from "@mui/material";
export const colors = {
  primary: "#fcfaf5",
  secondary: "#76323f",
  white: "#ffffff",
  black: "#000000",
  gray: "#e0e0e0",
  darkGray: "#4a5568",
  lightGray: "#f5f5f5",
  gradient: "linear-gradient(135deg, #76323f 0%, #a14a5a 100%)",
  gradientHover: "linear-gradient(135deg, #a14a5a 0%, #76323f 100%)",
  shadow: "0 4px 20px rgba(118, 50, 63, 0.15)",
  shadowHover: "0 6px 25px rgba(118, 50, 63, 0.25)",
};
export const theme = createTheme({
  palette: {
    primary: {
      main: colors.secondary,
    },
    secondary: {
      main: colors.secondaryLight || "#a14a5a",
    },
    background: {
      default: colors.primary,
      paper: colors.white,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Segoe UI", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "30px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        },
      },
    },
  },
});