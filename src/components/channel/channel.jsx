import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiService } from "../../service/api-service";
import ChannelCard from "../channel-card/channel-card";
import Videos from "../Videos/videos";

const Channel = () => {
  let params = useParams();
  let [channelDetails, setChannelDetails] = useState([]);
  let [videos, setVideos] = useState([]);
  useEffect(() => {
    let getDate = async () => {
      try {
        let datas = await ApiService.fetching("channels", {
          part: "snippet",
          id: params.id,
        });
        setChannelDetails(datas.items);
        console.log(datas);
        let dataVideo = await ApiService.fetching("search", {
          part: "snippet",
          channelId: params.id,
          maxResults: 30,
          order: "date",
        });
        setVideos(dataVideo.items || []);
      } catch (error) {
        console.error("Xato:", error);
      }
    };
    getDate();
  }, [params.id]);
  return (
    <Box minHeight={"95vh"} mt={"1vh"}>
      <Box>
        <Box
          width={"100%"}
          height={"200px"}
          zIndex={10}
          sx={{
            backgroundImage: `url(${channelDetails?.brandingSettings?.image?.bannerExternalUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        <ChannelCard video={channelDetails} marginTop={"-100px"} />
      </Box>
      <Container maxWidth={"90%"}>
        <Videos videos={videos} />
      </Container>
    </Box>
  );
};

export default Channel;
