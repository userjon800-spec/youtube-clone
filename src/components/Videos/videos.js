import { Box, Grow, Typography } from "@mui/material";
import { VideoCard, ChannelCard } from "../";
import { motion } from "framer-motion";
const Videos = ({ videos, loading }) => {
  if (!Array.isArray(videos) || videos.length === 0) {
    return (
      <Box
        textAlign="center"
        py={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h5" color="text.secondary" gutterBottom>
            🎥 Videolar topilmadi
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Boshqa kategoriyani tanlab ko'ring
          </Typography>
        </motion.div>
      </Box>
    );
  }
  const getGridColumns = () => {
    if (videos.length === 1) return "1fr";
    if (videos.length === 2) return "repeat(2, 1fr)";
    return {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
      lg: "repeat(4, 1fr)",
      xl: "repeat(5, 1fr)",
    };
  };
  return (
    <Box
      width="100%"
      sx={{
        display: "grid",
        gridTemplateColumns: getGridColumns(),
        gap: { xs: 2, sm: 2, md: 3 },
        p: { xs: 1, sm: 2 },
        transition: "all 0.3s ease",
      }}
    >
      {videos.map((item, index) => (
        <Grow
          in={true}
          timeout={500 + index * 100}
          key={item.etag || index}
        >
          <Box>
            {item.id?.kind === "youtube#video" && (
              <VideoCard video={item} index={index} />
            )}
            {item.id?.kind === "youtube#channel" && (
              <ChannelCard video={item} index={index} />
            )}
          </Box>
        </Grow>
      ))}
    </Box>
  );
};
export default Videos;