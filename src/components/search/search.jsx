// import React from 'react'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApiService } from "../../service/api-service";
import { Box, Container, Typography } from "@mui/material";
import { Videos } from "../";
import { colors } from "../../constants/colors";
const Search = () => {
  const [videos, setVideos] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    let getData = async () => {
      try {
        let datas = await ApiService.fetching(`search`, {
          q: id,
        });;
        setVideos(datas.items);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);
  return (
    <Box p={2} height={"90vh"}>
      <Container maxWidth="90%">
        <Typography variant="h4" fontWeight={"bold"} mb={2}>
          Search results for{" "}
          <span style={{ color: colors.secondary }}>{id}</span> videos
        </Typography>
        <Videos videos={videos} />
      </Container>
    </Box>
  );
};

export default Search;
