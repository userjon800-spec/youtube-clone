import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Main, Channel, Search, VideoDetails, Navbar } from "../";
import { Routes, Route } from "react-router-dom";
import { colors } from "../../constants/colors";
import Error from "../error/error";
const theme = createTheme({
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

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: colors.primary,
          position: "relative",
        }}
      >
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: { xs: "60px", md: "70px" },
          }}
        >
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/channel/:id" element={<Channel />} />
            <Route path="/video/:id" element={<VideoDetails />} />
            <Route path="/search/:id" element={<Search />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Box>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: colors.white,
            borderTop: `1px solid ${colors.gray}`,
            textAlign: "center",
          }}
        >
          <Box sx={{ color: colors.secondary, fontSize: "14px" }}>
            © {new Date().getFullYear()} Javohir TV. All rights reserved.
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default App;