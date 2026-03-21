import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Main, Channel, Search, VideoDetails, Navbar } from "../";
import { Routes, Route } from "react-router-dom";
import { colors, theme } from "../../constants/colors";
import Error from "../error/error";
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