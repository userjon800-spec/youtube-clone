import { CheckCircle } from "@mui/icons-material";
import { Box, CardContent, CardMedia, Typography, Paper, alpha, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { colors } from "../../constants/colors";
import { motion } from "framer-motion";

const ChannelCard = ({ video, marginTop = "0px" }) => {
  if (!video?.snippet) return null;

  const { snippet, statistics } = video;
  const { title, thumbnails } = snippet;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          overflow: "hidden",
          width: { xs: "300px", sm: "320px", md: "350px" },
          margin: "auto",
          mt: marginTop,
          backgroundColor: colors.primary,
          border: `1px solid ${alpha(colors.secondary, 0.1)}`,
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: `0 20px 40px ${alpha(colors.secondary, 0.2)}`,
            transform: "translateY(-5px)",
          },
        }}
      >
        <Link 
          to={`/channel/${video?.id?.channelId || video?.id}`} 
          style={{ textDecoration: "none" }}
        >
          <Box sx={{ position: "relative", pt: 2 }}>
            {/* Channel cover (optional) */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "80px",
                background: `linear-gradient(135deg, ${colors.secondary}, #ff6b6b)`,
                opacity: 0.2,
              }}
            />
            
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CardMedia
                  image={thumbnails?.high?.url || thumbnails?.default?.url}
                  alt={title}
                  sx={{
                    borderRadius: "50%",
                    height: "120px",
                    width: "120px",
                    mb: 2,
                    border: `3px solid ${colors.secondary}`,
                    boxShadow: `0 5px 20px ${alpha(colors.secondary, 0.3)}`,
                    transition: "all 0.3s ease",
                  }}
                />
              </motion.div>

              {/* Channel name */}
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  color: "text.primary",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                  mb: 1,
                }}
              >
                {title}
                <CheckCircle 
                  sx={{ 
                    fontSize: "18px", 
                    color: colors.secondary,
                  }} 
                />
              </Typography>

              {/* Subscriber count */}
              {statistics?.subscriberCount && (
                <Chip
                  label={`${parseInt(statistics.subscriberCount).toLocaleString()} subscribers`}
                  size="small"
                  sx={{
                    backgroundColor: alpha(colors.secondary, 0.1),
                    color: colors.secondary,
                    fontWeight: 600,
                    fontSize: "12px",
                    "&:hover": {
                      backgroundColor: alpha(colors.secondary, 0.2),
                    },
                  }}
                />
              )}

              {/* View count (optional) */}
              {statistics?.viewCount && (
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 1,
                    color: "text.secondary",
                  }}
                >
                  {parseInt(statistics.viewCount).toLocaleString()} total views
                </Typography>
              )}

              {/* Video count badge */}
              {statistics?.videoCount && (
                <Box
                  sx={{
                    mt: 2,
                    px: 2,
                    py: 0.5,
                    borderRadius: "12px",
                    backgroundColor: alpha(colors.secondary, 0.05),
                    border: `1px solid ${alpha(colors.secondary, 0.1)}`,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {statistics.videoCount} videos
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Box>
        </Link>
      </Paper>
    </motion.div>
  );
};

export default ChannelCard;