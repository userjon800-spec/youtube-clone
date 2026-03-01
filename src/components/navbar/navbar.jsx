import { colors } from "../../constants/colors";
import { Stack, Box, InputBase, alpha, styled, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import VideoCallIcon from '@mui/icons-material/VideoCall';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '40px',
  backgroundColor: alpha(colors.white, 0.15),
  border: `1px solid ${colors.gray}`,
  '&:hover': {
    border: `1px solid ${colors.secondary}`,
    boxShadow: `0 0 5px ${alpha(colors.secondary, 0.3)}`,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: '600px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: 0,
  top: 0,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.secondary,
  backgroundColor: alpha(colors.secondary, 0.1),
  borderTopRightRadius: '40px',
  borderBottomRightRadius: '40px',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    paddingRight: `calc(1em + ${theme.spacing(6)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '1rem',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));
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
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
        backgroundColor: alpha(colors.primary, 0.95),
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box 
          sx={{ 
            display: { xs: 'block', md: 'none' },
            cursor: 'pointer',
            '&:hover': { color: colors.secondary }
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
          <Box sx={{ position: 'relative' }}>
            <span style={{ 
              fontSize: "28px", 
              fontWeight: 700,
              background: `linear-gradient(45deg, ${colors.secondary} 30%, #ff6b6b 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}>
              Javohir
            </span>
            <span style={{
              position: 'absolute',
              top: -5,
              right: -15,
              fontSize: '12px',
              color: colors.secondary,
              fontWeight: 'bold'
            }}>
              TV
            </span>
          </Box>
          <img
            src={"https://static.vecteezy.com/system/resources/previews/018/930/572/non_2x/youtube-logo-youtube-icon-transparent-free-png.png"}
            alt="logo"
            width={70}
            height={60}
            style={{
              objectFit: "cover",
              marginLeft: '-5px',
              filter: 'drop-shadow(0 2px 4px rgba(118, 50, 63, 0.2))',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(5deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
          />
        </Link>
      </Stack>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
      <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1, md: 2 }}>
        <Box 
          sx={{ 
            display: { xs: 'none', sm: 'block' },
            cursor: 'pointer',
            color: colors.secondary,
            '&:hover': { opacity: 0.8 }
          }}
        >
          <VideoCallIcon />
        </Box>
        <Box 
          sx={{ 
            display: { xs: 'none', sm: 'block' },
            cursor: 'pointer',
            color: colors.secondary,
            '&:hover': { opacity: 0.8 }
          }}
        >
          <NotificationsNoneIcon />
        </Box>
        <Avatar 
          sx={{ 
            width: 35, 
            height: 35, 
            cursor: 'pointer',
            bgcolor: colors.secondary,
            border: `2px solid ${colors.secondary}`,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)'
            }
          }}
        >
          J
        </Avatar>
      </Stack>
    </Stack>
  );
};
export default Navbar;