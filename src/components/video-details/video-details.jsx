import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ApiService } from "../../service/api-service";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  Divider,
  Chip,
  IconButton,
  Paper,
  Button,
  Skeleton,
  alpha,
  Tooltip,
} from "@mui/material";
import {
  CheckCircle,
  ThumbUp,
  Share,
  PlaylistAdd,
  Download,
  MoreHoriz,
  Subscriptions,
  Visibility,
  AccessTime,
} from "@mui/icons-material";
import { colors } from "../../constants/colors";
import { Loader, Videos } from "../";
import moment from "moment";
const VideoDetails = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { id } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const datas = await ApiService.fetching(`videos`, {
          id: id,
          part: "snippet,statistics,contentDetails",
        });
        setVideoDetails(datas?.items?.[0] || null);
        let currentVideo = datas?.items?.[0] || {};
        let suggestedVideo = await ApiService.fetching("search", {
          q: currentVideo?.snippet?.title,
          type: "video",
          part: "snippet",
          maxResults: 25,
        });
        setSuggestedVideos(
          Array.isArray(suggestedVideo?.items) ? suggestedVideo.items : [],
        );
      } catch (error) {
        console.error("Xato:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);
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
  if (loading) return <VideoDetailsSkeleton />;
  if (!videoDetails) return <Loader />;
  const { snippet, statistics } = videoDetails;
  const {
    title,
    channelTitle,
    description,
    tags,
    thumbnails,
    publishedAt,
    channelId,
  } = snippet || {};
  const shortDescription =
    description?.length > 300 ? description.slice(0, 300) + "..." : description;
  return (
    <Box
      minHeight={"90vh"}
      mb={10}
      sx={{
        backgroundColor: colors.background,
        pt: 3,
      }}
    >
      <Box
        display={"flex"}
        flexDirection={{ xs: "column", md: "row" }}
        gap={3}
        sx={{ maxWidth: "1600px", mx: "auto", px: { xs: 2, md: 3 } }}
      >
        <Box flex={1} width={{ xs: "100%", md: "70%" }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: "20px",
              overflow: "hidden",
              backgroundColor: "transparent",
            }}
          >
            <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                  boxShadow: `0 10px 30px ${alpha(colors.secondary, 0.3)}`,
                }}
                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </Box>
            <Box sx={{ p: 3 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  mb: 2,
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
                  lineHeight: 1.4,
                }}
              >
                {title}
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
                spacing={2}
                sx={{ mb: 3 }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  {statistics?.viewCount && (
                    <Chip
                      icon={<Visibility />}
                      label={`${formatCount(statistics.viewCount)} views`}
                      size="small"
                      sx={{
                        backgroundColor: alpha(colors.secondary, 0.1),
                        color: colors.secondary,
                        fontWeight: 500,
                      }}
                    />
                  )}
                  {publishedAt && (
                    <Chip
                      icon={<AccessTime />}
                      label={moment(publishedAt).fromNow()}
                      size="small"
                      sx={{
                        backgroundColor: alpha(colors.gray, 0.1),
                        color: "text.secondary",
                      }}
                    />
                  )}
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Tooltip title={liked ? "Unlike" : "Like"}>
                    <Button
                      variant="outlined"
                      startIcon={<ThumbUp />}
                      onClick={() => setLiked(!liked)}
                      sx={{
                        borderColor: liked ? colors.secondary : colors.gray,
                        color: liked ? colors.secondary : "text.secondary",
                        "&:hover": {
                          borderColor: colors.secondary,
                          backgroundColor: alpha(colors.secondary, 0.1),
                        },
                      }}
                    >
                      {formatCount(statistics?.likeCount)}
                    </Button>
                  </Tooltip>
                  <Tooltip title="Share">
                    <IconButton sx={{ color: "text.secondary" }}>
                      <Share />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Save to playlist">
                    <IconButton sx={{ color: "text.secondary" }}>
                      <PlaylistAdd />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download">
                    <IconButton sx={{ color: "text.secondary" }}>
                      <Download />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="More">
                    <IconButton sx={{ color: "text.secondary" }}>
                      <MoreHoriz />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  mb: 3,
                  backgroundColor: alpha(colors.secondary, 0.05),
                  borderRadius: "16px",
                  border: `1px solid ${alpha(colors.secondary, 0.1)}`,
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Link
                    to={`/channel/${channelId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        src={thumbnails?.default?.url}
                        alt={channelTitle}
                        sx={{
                          width: 50,
                          height: 50,
                          border: `2px solid ${colors.secondary}`,
                        }}
                      />
                      <Box>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                        >
                          <Typography variant="h6" color="text.primary">
                            {channelTitle}
                          </Typography>
                          <CheckCircle
                            sx={{
                              fontSize: 18,
                              color: colors.secondary,
                            }}
                          />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {formatCount(statistics?.subscriberCount)} subscribers
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                  <Button
                    variant={subscribed ? "outlined" : "contained"}
                    startIcon={<Subscriptions />}
                    onClick={() => setSubscribed(!subscribed)}
                    sx={{
                      backgroundColor: subscribed
                        ? "transparent"
                        : colors.secondary,
                      borderColor: colors.secondary,
                      color: subscribed ? colors.secondary : "white",
                      "&:hover": {
                        backgroundColor: subscribed
                          ? alpha(colors.secondary, 0.1)
                          : colors.secondary + "dd",
                      },
                    }}
                  >
                    {subscribed ? "Subscribed" : "Subscribe"}
                  </Button>
                </Stack>
              </Paper>
              {tags && tags.length > 0 && (
                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>
                  {tags.slice(0, 10).map((tag, index) => (
                    <Chip
                      key={index}
                      label={`#${tag}`}
                      size="small"
                      onClick={() => console.log("Search tag:", tag)}
                      sx={{
                        backgroundColor: alpha(colors.gray, 0.2),
                        color: "text.secondary",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: alpha(colors.secondary, 0.1),
                          color: colors.secondary,
                        },
                      }}
                    />
                  ))}
                  {tags.length > 10 && (
                    <Chip
                      label={`+${tags.length - 10}`}
                      size="small"
                      sx={{
                        backgroundColor: alpha(colors.gray, 0.2),
                        color: "text.secondary",
                      }}
                    />
                  )}
                </Stack>
              )}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.7,
                    fontWeight: 400,
                  }}
                >
                  {showFullDescription ? description : shortDescription}
                </Typography>
                {description?.length > 300 && (
                  <Button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    sx={{
                      mt: 1,
                      color: colors.secondary,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    {showFullDescription ? "Show less" : "Show more"}
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box width={{ xs: "100%", md: "30%" }}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: "20px",
              backgroundColor: colors.primary,
              border: `1px solid ${alpha(colors.secondary, 0.1)}`,
              position: { md: "sticky" },
              top: { md: "80px" },
              maxHeight: { md: "calc(100vh - 100px)" },
              overflow: { md: "auto" },
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: colors.secondary,
                borderRadius: "10px",
              },
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography variant="h6" fontWeight="bold">
                Suggested Videos
              </Typography>
              <Chip
                label={`${suggestedVideos.length} videos`}
                size="small"
                sx={{
                  backgroundColor: alpha(colors.secondary, 0.1),
                  color: colors.secondary,
                }}
              />
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Videos videos={suggestedVideos} />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};
const VideoDetailsSkeleton = () => {
  return (
    <Box sx={{ maxWidth: "1600px", mx: "auto", px: { xs: 2, md: 3 }, pt: 3 }}>
      <Box display={"flex"} flexDirection={{ xs: "column", md: "row" }} gap={3}>
        <Box flex={1} width={{ xs: "100%", md: "70%" }}>
          <Skeleton
            variant="rectangular"
            height={400}
            sx={{ borderRadius: "20px" }}
          />
          <Box sx={{ p: 2 }}>
            <Skeleton variant="text" height={40} width="80%" />
            <Skeleton variant="text" height={30} width="40%" />
            <Skeleton variant="text" height={100} />
          </Box>
        </Box>
        <Box width={{ xs: "100%", md: "30%" }}>
          <Skeleton
            variant="rectangular"
            height={600}
            sx={{ borderRadius: "20px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default VideoDetails;