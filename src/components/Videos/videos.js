import { Box } from "@mui/material";
import { VideoCard, ChannelCard } from "../";
const Videos = ({ videos }) => {
  if (!Array.isArray(videos) || videos.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        Loading...
      </Box>
    );
  }
  return (
    <Box
      width="100%"
      display="grid"
      gridTemplateColumns="repeat(4,1fr)"
      gap={2}
    >
      {videos &&
        videos.map((item) => (
          <Box key={item.etag}>
            {item.id?.kind === "youtube#video" && <VideoCard video={item} />}
            {item.id?.kind === "youtube#channel" && (
              <ChannelCard video={item} />
            )}
          </Box>
        ))}
    </Box>
  );
};
export default Videos;