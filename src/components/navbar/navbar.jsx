import { colors } from "../../constants/colors";
import { Stack, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SearchBar from "../search-bar/search-bar";
const Navbar = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        background: colors.primary,
        height: "70px",
        px: { xs: 1, sm: 2, md: 3 },
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        backdropFilter: "blur(10px)",
        backgroundColor: `alpha(colors.primary, 0.95),`,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            cursor: "pointer",
            "&:hover": { color: colors.secondary },
          }}
        >
          <MenuIcon />
        </Box>
        <Link
          to={"/"}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 700,
                background: `linear-gradient(45deg, ${colors.secondary} 30%, #ff6b6b 90%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px",
              }}
            >
              Javohir
            </span>
            <span
              style={{
                position: "absolute",
                top: -5,
                right: -15,
                fontSize: "12px",
                color: colors.secondary,
                fontWeight: "bold",
              }}
            >
              TV
            </span>
          </Box>
          <img
            src={
              "https://static.vecteezy.com/system/resources/previews/018/930/572/non_2x/youtube-logo-youtube-icon-transparent-free-png.png"
            }
            alt="logo"
            width={70}
            height={60}
            style={{
              objectFit: "cover",
              marginLeft: "-5px",
              filter: "drop-shadow(0 2px 4px rgba(118, 50, 63, 0.2))",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "rotate(5deg)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "rotate(0deg)")
            }
          />
        </Link>
      </Stack>
      <SearchBar />
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 0.5, sm: 1, md: 2 }}
      >
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            cursor: "pointer",
            color: colors.secondary,
            "&:hover": { opacity: 0.8 },
          }}
        >
          <VideoCallIcon />
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            cursor: "pointer",
            color: colors.secondary,
            "&:hover": { opacity: 0.8 },
          }}
        >
          <NotificationsNoneIcon />
        </Box>
        <Avatar
          sx={{
            width: 35,
            height: 35,
            cursor: "pointer",
            bgcolor: colors.secondary,
            border: `2px solid ${colors.secondary}`,
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          J
        </Avatar>
      </Stack>
    </Stack>
  );
};
export default Navbar;