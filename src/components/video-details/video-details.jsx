import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ApiService } from "../../service/api-service";
import { Box, Typography, Stack, Avatar, Divider } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Loader, Videos } from "../";
const VideoDetails = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      try {
        const datas = await ApiService.fetching(`videos`, {
          id: id,
          part: "snippet,statistics",
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
          Array.isArray(suggestedVideo?.items) ? suggestedVideo.items : []
        );
      } catch (error) {
        console.error("Xato:", error);
      }
    };
    getData();
  }, [id]);

  if (!videoDetails) return <Loader />;
  const { snippet, statistics } = videoDetails;
  const { title, channelTitle, description, tags, thumbnails } = snippet || {};
  return (
    <Box minHeight={"90vh"} mb={10} p={2}>
      <Box display={"flex"} flexDirection={{ xs: "column", md: "row" }} gap={2}>
        <Box flex={1} width={{ xs: "100%", md: "70%" }} p={2}>
          <iframe
            width="100%"
            height="480"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <Typography variant="h5" fontWeight="bold" mt={2}>
            {title}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mt={1}
          >
            <Link to={`/channel/${videoDetails?.snippet?.channelId}`}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Avatar src={thumbnails.default.url} alt={channelTitle} />
                <Typography variant="subtitle2" color="textSecondary">
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: 14, color: "gray", ml: 0.5 }} />
                </Typography>
              </Stack>
            </Link>
            <Stack direction="row" gap={2}>
              {statistics?.viewCount && (
                <Typography variant="body2" color="gray">
                  {Number(statistics.viewCount).toLocaleString()} views
                </Typography>
              )}
              {statistics?.likeCount && (
                <Typography variant="body2" color="gray">
                  {Number(statistics.likeCount).toLocaleString()} likes
                </Typography>
              )}
            </Stack>
          </Stack>
          {
            <Stack direction="row" flexWrap="wrap" gap={1} mt={2}>
              {tags &&
                tags.map((tag, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    color="darkblack"
                    sx={{ cursor: "pointer" }}
                    className="types"
                  >
                    #{tag}
                  </Typography>
                ))}
            </Stack>
          }
          {description && (
            <Typography
              mt={2}
              color="black"
              fontWeight={600}
              textAlign={"left"}
            >
              {description}
            </Typography>
          )}
        </Box>
        <Box
          width={{ xs: "100%", md: "25%" }}
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
          overflow={"scroll"}
          flexDirection={"column"}
          height={"1900px"}
          border={"1px solid #e3e3e3"}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Suggested Videos
          </Typography>
          <Divider />
          <Videos videos={suggestedVideos} />
        </Box>
      </Box>
    </Box>
  );
};
export default VideoDetails;