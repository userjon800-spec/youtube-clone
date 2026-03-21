import { Box, Container, Stack, Typography, Fade, Grow, Chip } from "@mui/material";
import { useState, useEffect } from "react";
import { colors } from "../../constants/colors";
import { Category, Videos } from "../";
import { ApiService } from "../../service/api-service";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
const Main = () => {
  let [selectedCatergory, setselectedCatergory] = useState("New");
  let [videos, setVideos] = useState([]);
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    let getData = async () => {
      setLoading(true);
      try {
        let datas = await ApiService.fetching(`search`, {
          q: selectedCatergory,
          part: 'snippet',
          maxResults: 50
        });
        setTimeout(() => {
          setVideos(datas.items || []);
          setLoading(false);
        }, 500);
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.status === 429) {
          alert(
            "API limitdan oshib ketdingiz. Iltimos, keyinroq urinib ko'ring."
          );
        } else {
          console.log(error);
        }
      }
    };
    getData();
  }, [selectedCatergory]);
  const getCategoryIcon = () => {
    switch(selectedCatergory.toLowerCase()) {
      case 'new':
        return <NewReleasesIcon sx={{ fontSize: 35, color: colors.secondary }} />;
      case 'trending':
        return <TrendingUpIcon sx={{ fontSize: 35, color: colors.secondary }} />;
      case 'hot':
        return <WhatshotIcon sx={{ fontSize: 35, color: colors.secondary }} />;
      default:
        return null;
    }
  };
  return (
    <Stack sx={{ 
      background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
      minHeight: '100vh'
    }}>
      <Box sx={{ 
        position: 'sticky', 
        top: '70px', 
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${colors.gray}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        <Category
          selectedCategory={selectedCatergory}
          onSelect={setselectedCatergory}
        />
      </Box>
      <Box 
        p={{ xs: 1, sm: 2, md: 3 }} 
        sx={{ 
          height: "calc(100vh - 70px)", 
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: colors.secondary,
            borderRadius: '10px',
          }
        }}
      >
        <Container maxWidth="xl">
          <Fade in={true} timeout={800}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ 
                backgroundColor: colors.secondary + '15',
                padding: 2,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {getCategoryIcon()}
              </Box>
              <Box>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${colors.secondary} 0%, #ff6b6b 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                  }}
                >
                  {selectedCatergory}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body1" color="text.secondary">
                    Eng so'nggi videolar
                  </Typography>
                  <Chip 
                    label={`${videos.length} ta video`} 
                    size="small"
                    sx={{ 
                      backgroundColor: colors.secondary,
                      color: 'white',
                      fontWeight: 500
                    }}
                  />
                </Stack>
              </Box>
            </Box>
          </Fade>
          {loading ? (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '50vh',
              flexDirection: 'column',
              gap: 2
            }}>
              <Box sx={{ 
                width: 50, 
                height: 50, 
                borderRadius: '50%',
                border: `3px solid ${colors.gray}`,
                borderTop: `3px solid ${colors.secondary}`,
                animation: 'spin 1s linear infinite'
              }} />
              <Typography color="text.secondary">
                Videolar yuklanmoqda...
              </Typography>
              <style>
                {`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}
              </style>
            </Box>
          ) : (
            <Grow in={!loading} timeout={1000}>
              <Box>
                <Videos videos={videos} />
              </Box>
            </Grow>
          )}
          {!loading && videos.length === 0 && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '50vh',
              flexDirection: 'column',
              gap: 2
            }}>
              <Typography variant="h5" color="text.secondary">
                😕 Videolar topilmadi
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Boshqa kategoriyani tanlab ko'ring
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </Stack>
  );
};
export default Main;