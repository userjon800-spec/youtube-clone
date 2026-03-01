import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Avatar,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import { colors } from "../../constants/colors";
import moment from "moment/moment";
import {
  CheckCircle,
  Favorite,
  FavoriteBorder,
  MoreVert,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const VideoCard = ({ video, index }) => {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Video vaqtini formatlash
  const formatDuration = (duration) => {
    if (!duration) return null;
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (match[1] || "").replace("H", "");
    const minutes = (match[2] || "").replace("M", "");
    const seconds = (match[3] || "").replace("S", "");

    if (hours) {
      return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
    }
    if (minutes) {
      return `${minutes}:${seconds.padStart(2, "0")}`;
    }
    return `0:${seconds.padStart(2, "0")}`;
  };

  // View count formatlash
  const formatViews = (views) => {
    if (!views) return null;
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Card
        sx={{
          width: "100%",
          boxShadow: hovered
            ? `0 20px 30px ${colors.secondary}30`
            : "0 5px 15px rgba(0,0,0,0.08)",
          borderRadius: "16px",
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          backgroundColor: colors.primary,
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            transform: "translateY(-8px)",
          },
        }}
      >
        {/* Thumbnail qismi */}
        <Link
          to={`/video/${video.id.videoId}`}
          style={{ textDecoration: "none" }}
        >
          <Box sx={{ position: "relative" }}>
            <CardMedia
              image={video?.snippet?.thumbnails?.high?.url}
              alt={video?.snippet?.title}
              sx={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                transition: "transform 0.5s ease",
                transform: hovered ? "scale(1.05)" : "scale(1)",
              }}
            />

            {/* Video duration badge */}
            {video?.contentDetails?.duration && (
              <Chip
                label={formatDuration(video.contentDetails.duration)}
                size="small"
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  backgroundColor: "rgba(0,0,0,0.8)",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                  borderRadius: "4px",
                }}
              />
            )}

            {/* Hover effekt */}
            {hovered && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  ▶ Watch now
                </Typography>
              </Box>
            )}
          </Box>
        </Link>

        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          {/* Title va description */}
          <Link
            to={`/video/${video.id.videoId}`}
            style={{ textDecoration: "none", flex: 1 }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="text.primary"
              sx={{
                mb: 1,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1.4,
                "&:hover": {
                  color: colors.secondary,
                },
              }}
            >
              {video?.snippet?.title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                mb: 2,
                opacity: 0.7,
              }}
            >
              {video?.snippet?.description}
            </Typography>
          </Link>

          {/* Video stats */}
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            {video?.statistics?.viewCount && (
              <Typography variant="caption" color="text.secondary">
                {formatViews(video.statistics.viewCount)} views
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              {moment(video?.snippet?.publishedAt).fromNow()}
            </Typography>
          </Stack>

          {/* Channel info */}
          <Link
            to={`/channel/${video?.snippet?.channelId}`}
            style={{ textDecoration: "none" }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                p: 1,
                borderRadius: "8px",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: `${colors.secondary}10`,
                },
              }}
            >
              <Avatar
                src={video?.snippet?.thumbnails?.high?.url}
                sx={{
                  width: 30,
                  height: 30,
                  border: `2px solid ${colors.secondary}`,
                }}
              />
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontWeight: 500,
                    "&:hover": { color: colors.secondary },
                  }}
                >
                  {video?.snippet?.channelTitle}
                </Typography>
                <CheckCircle
                  sx={{
                    fontSize: "14px",
                    color: colors.secondary,
                    opacity: 0.7,
                  }}
                />
              </Stack>
            </Stack>
          </Link>

          {/* Like button va more options */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <IconButton
              onClick={() => setLiked(!liked)}
              sx={{
                color: liked ? colors.secondary : "text.secondary",
                "&:hover": {
                  color: colors.secondary,
                },
              }}
            >
              {liked ? <Favorite /> : <FavoriteBorder />}
            </IconButton>

            <IconButton
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: colors.secondary,
                },
              }}
            >
              <MoreVert fontSize="small" />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
};
export default VideoCard;