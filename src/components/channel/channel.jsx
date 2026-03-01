import {
  Box,
  Container,
  Typography,
  Stack,
  Chip,
  Avatar,
  Paper,
  alpha,
  Skeleton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiService } from "../../service/api-service";
import Videos from "../Videos/videos";
import { colors } from "../../constants/colors";
import { motion } from "framer-motion";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CheckCircle } from "@mui/icons-material";
const Channel = () => {
  let params = useParams();
  let [channelDetails, setChannelDetails] = useState(null);
  let [videos, setVideos] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    let getDate = async () => {
      setLoading(true);
      try {
        let datas = await ApiService.fetching("channels", {
          part: "snippet,statistics,brandingSettings",
          id: params.id,
        });
        setChannelDetails(datas?.items?.[0] || null);
        let dataVideo = await ApiService.fetching("search", {
          part: "snippet",
          channelId: params.id,
          maxResults: 30,
          order: "date",
          type: "video",
        });
        setVideos(dataVideo.items || []);
      } catch (error) {
        console.error("Xato:", error);
      } finally {
        setLoading(false);
      }
    };
    getDate();
  }, [params.id]);
  if (loading) return <ChannelSkeleton />;
  const { snippet, statistics, brandingSettings } = channelDetails || {};
  const { title, description, thumbnails, publishedAt, country, customUrl } =
    snippet || {};
  const formatCount = (count) => {
    if (!count) return "0";
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };
  return (
    <Box minHeight={"95vh"} sx={{ backgroundColor: colors.background }}>
      <Box
        sx={{
          width: "100%",
          height: { xs: "150px", sm: "200px", md: "250px" },
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${colors.secondary} 0%, #ff6b6b 100%)`,
        }}
      >
        {brandingSettings?.image?.bannerExternalUrl && (
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${brandingSettings.image.bannerExternalUrl})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                objectFit: "cover",
                backgroundRepeat: "no-repeat",
                opacity: 0.9,
              }}
            />
          </motion.div>
        )}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(0deg, ${alpha(colors.primary, 0.9)} 0%, transparent 100%)`,
          }}
        />
      </Box>
      <Container
        maxWidth="xl"
        sx={{ position: "relative", mt: { xs: -5, md: -10 } }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: "20px",
            backgroundColor: alpha(colors.primary, 0.95),
            backdropFilter: "blur(10px)",
            border: `1px solid ${alpha(colors.secondary, 0.2)}`,
            boxShadow: `0 10px 40px ${alpha(colors.secondary, 0.15)}`,
            mb: 4,
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            alignItems={{ xs: "center", md: "flex-start" }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Avatar
                src={thumbnails?.high?.url}
                alt={title}
                sx={{
                  width: { xs: 120, md: 160 },
                  height: { xs: 120, md: 160 },
                  border: `4px solid ${colors.secondary}`,
                  boxShadow: `0 10px 30px ${alpha(colors.secondary, 0.3)}`,
                  mt: { xs: -8, md: -12 },
                }}
              />
            </motion.div>
            <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "center", sm: "center" }}
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    justifyContent={{ xs: "center", md: "flex-start" }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        background: `linear-gradient(135deg, ${colors.secondary}, #ff6b6b)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {title}
                    </Typography>
                    <CheckCircle
                      sx={{ color: colors.secondary, fontSize: 24 }}
                    />
                  </Stack>
                  {customUrl && (
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      @{customUrl}
                    </Typography>
                  )}
                </Box>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Chip
                    icon={<SubscriptionsIcon />}
                    label="Subscribe"
                    onClick={() => {}}
                    sx={{
                      backgroundColor: colors.secondary,
                      color: "white",
                      fontWeight: 600,
                      fontSize: "1rem",
                      py: 2.5,
                      px: 3,
                      "&:hover": {
                        backgroundColor: colors.secondary + "dd",
                      },
                      "& .MuiChip-icon": {
                        color: "white",
                      },
                    }}
                  />
                </motion.div>
              </Stack>
              <Stack
                direction="row"
                spacing={3}
                sx={{ mb: 3 }}
                justifyContent={{ xs: "center", md: "flex-start" }}
                flexWrap="wrap"
                gap={2}
              >
                {statistics?.subscriberCount && (
                  <Chip
                    icon={<SubscriptionsIcon />}
                    label={`${formatCount(statistics.subscriberCount)} subscribers`}
                    variant="outlined"
                    sx={{
                      borderColor: colors.secondary,
                      color: colors.secondary,
                    }}
                  />
                )}
                {statistics?.videoCount && (
                  <Chip
                    icon={<VideoLibraryIcon />}
                    label={`${formatCount(statistics.videoCount)} videos`}
                    variant="outlined"
                    sx={{
                      borderColor: colors.secondary,
                      color: colors.secondary,
                    }}
                  />
                )}
                {statistics?.viewCount && (
                  <Chip
                    icon={<VisibilityIcon />}
                    label={`${formatCount(statistics.viewCount)} views`}
                    variant="outlined"
                    sx={{
                      borderColor: colors.secondary,
                      color: colors.secondary,
                    }}
                  />
                )}
                {publishedAt && (
                  <Chip
                    icon={<CalendarTodayIcon />}
                    label={`Joined ${new Date(publishedAt).getFullYear()}`}
                    variant="outlined"
                    sx={{
                      borderColor: colors.secondary,
                      color: colors.secondary,
                    }}
                  />
                )}
                {country && (
                  <Chip
                    icon={<LocationOnIcon />}
                    label={country}
                    variant="outlined"
                    sx={{
                      borderColor: colors.secondary,
                      color: colors.secondary,
                    }}
                  />
                )}
              </Stack>
              {description && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    backgroundColor: alpha(colors.gray, 0.1),
                    borderRadius: "12px",
                    maxWidth: "100%",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      lineHeight: 1.6,
                    }}
                  >
                    {description}
                  </Typography>
                </Paper>
              )}
            </Box>
          </Stack>
        </Paper>
        <Box sx={{ mt: 4 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: colors.secondary,
                borderLeft: `4px solid ${colors.secondary}`,
                pl: 2,
              }}
            >
              Channel Videos
            </Typography>
            <Chip
              label={`${videos.length} videos`}
              sx={{
                backgroundColor: alpha(colors.secondary, 0.1),
                color: colors.secondary,
                fontWeight: 500,
              }}
            />
          </Stack>
          <Videos videos={videos} />
        </Box>
      </Container>
    </Box>
  );
};
const ChannelSkeleton = () => {
  return (
    <Box sx={{ backgroundColor: colors.background, minHeight: "95vh" }}>
      <Box sx={{ width: "100%", height: 200, backgroundColor: colors.gray }} />
      <Container maxWidth="xl">
        <Paper sx={{ p: 4, mt: -8, borderRadius: "20px" }}>
          <Stack direction="row" spacing={4} alignItems="center">
            <Skeleton variant="circular" width={160} height={160} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" height={40} width="60%" />
              <Skeleton variant="text" height={20} width="40%" />
              <Skeleton variant="text" height={100} />
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
export default Channel;