import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApiService } from "../../service/api-service";
import { Box, Container, Typography, Chip, Fade, Grow, Paper, Skeleton, Stack } from "@mui/material";
import { Videos } from "../";
import { colors } from "../../constants/colors";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import YouTubeIcon from '@mui/icons-material/YouTube';
const Search = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    let getData = async () => {
      setLoading(true);
      try {
        let datas = await ApiService.fetching(`search`, {
          q: id,
          part: 'snippet',
          maxResults: 50
        });
        
        // Animatsiya uchun kechiktirish
        setTimeout(() => {
          setVideos(datas.items || []);
          setLoading(false);
        }, 500);
        
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getData();
  }, [id]);

  // Skeleton loader uchun
  const skeletonArray = [1,2,3,4,5,6,7,8];

  return (
    <Box 
      sx={{ 
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${colors.background} 0%, #ffffff 100%)`,
        pt: 3
      }}
    >
      <Container maxWidth="xl">
        {/* Header qismi */}
        <Fade in={true} timeout={800}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              mb: 4, 
              background: `linear-gradient(135deg, ${colors.secondary}10 0%, ${colors.primary} 100%)`,
              borderRadius: '20px',
              border: `1px solid ${colors.gray}`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background icon */}
            <YouTubeIcon 
              sx={{ 
                position: 'absolute',
                right: 20,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 120,
                color: colors.secondary + '10',
                zIndex: 0
              }} 
            />
            
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                Search results for{" "}
                <span style={{ 
                  color: colors.secondary,
                  background: `linear-gradient(135deg, ${colors.secondary}, #ff6b6b)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  textTransform: 'capitalize'
                }}>
                  "{id}"
                </span>
              </Typography>
              
              <Stack direction="row" spacing={2} alignItems="center">
                <Chip 
                  label={`${videos.length} videos found`}
                  sx={{ 
                    backgroundColor: colors.secondary,
                    color: 'white',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: colors.secondary + 'dd'
                    }
                  }}
                />
                <Typography variant="body1" color="text.secondary">
                  Siz qidirgan natijalar
                </Typography>
              </Stack>
            </Box>
          </Paper>
        </Fade>

        {/* Loading skeleton */}
        {loading && (
          <Grow in={loading} timeout={500}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
              {skeletonArray.map((item) => (
                <Box key={item} sx={{ width: '100%' }}>
                  <Skeleton variant="rectangular" height={180} sx={{ borderRadius: '12px', mb: 1 }} />
                  <Skeleton variant="text" height={30} width="80%" />
                  <Skeleton variant="text" height={20} width="60%" />
                </Box>
              ))}
            </Box>
          </Grow>
        )}

        {/* Video list */}
        {!loading && (
          <Fade in={!loading} timeout={1000}>
            <Box>
              {videos.length > 0 ? (
                <Videos videos={videos} />
              ) : (
                // Empty state
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50vh',
                    textAlign: 'center',
                    gap: 2
                  }}
                >
                  <SearchOffIcon sx={{ fontSize: 80, color: colors.secondary + '50' }} />
                  <Typography variant="h5" color="text.secondary">
                    Hech qanday video topilmadi
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Boshqa kalit so'z bilan qidirib ko'ring
                  </Typography>
                </Box>
              )}
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};
export default Search;