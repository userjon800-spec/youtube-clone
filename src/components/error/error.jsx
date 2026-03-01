import { Box, Typography, Button } from "@mui/material";
import { colors } from "../../constants/colors";
import React from "react";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log("Xato yuz berdi:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2,
            p: 3,
            backgroundColor: colors.primary,
          }}
        >
          <Typography variant="h4" color={colors.secondary}>
            😕 Xatolik yuz berdi
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Iltimos, sahifani qayta yuklang
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{
              backgroundColor: colors.secondary,
              "&:hover": {
                backgroundColor: colors.secondaryLight,
              },
            }}
          >
            Qayta yuklash
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;