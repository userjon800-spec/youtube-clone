import { colors } from "../../constants/colors";
import { Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { SearchBar } from "../";
const Navbar = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={"5"}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        background: colors.primary,
        height: "10vh",
      }}
    >
      <Link
        to={"/"}
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          marginLeft: "10px",
        }}
      >
        <span style={{ fontSize: "30px" }}>Javohir</span>
        <img
          src={
            "https://static.vecteezy.com/system/resources/previews/018/930/572/non_2x/youtube-logo-youtube-icon-transparent-free-png.png"
          }
          alt="logo"
          width={75}
          height={65}
          style={{
            border: "1px solid transparent",
            objectFit: "cover",
            position: "relative",
            left: "-10px",
          }}
        />
      </Link>
      <SearchBar />
      <Box />
    </Stack>
  );
};
export default Navbar;