import { Box, Container, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { colors } from "../../constants/colors";
import { Category, Videos } from "../";
import { ApiService } from "../../service/api-service";
const Main = () => {
  let [selectedCatergory, setselectedCatergory] = useState("New");
  let [videos, setVideos] = useState([]);
  useEffect(() => {
    let getData = async () => {
      try {
        let datas = await ApiService.fetching(`search`, {
          q: selectedCatergory,
        });
        setVideos(datas.items || []);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          alert(
            "API limitdan oshib ketdingiz. Iltimos, keyinroq urinib ko'ring."
          );
        } else {
          console.log(error);
        }
      }
    };
    getData();
  }, [selectedCatergory]);
  return (
    <Stack>
      <Category
        selectedCategory={selectedCatergory}
        onSelect={setselectedCatergory}
      />
      <Box p={2} sx={{ height: "90vh" }}>
        <Container maxWidth={"90%"}>
          <Typography variant="h4" fontWeight={"bold"} mb={2}>
            {selectedCatergory}{" "}
            <span style={{ color: colors.secondary }}>videos</span>
          </Typography>
          <Videos videos={videos} />
        </Container>
      </Box>
    </Stack>
  );
};
export default Main;