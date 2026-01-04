import { Search } from "@mui/icons-material";
import { colors } from "../../constants/colors";
import { Paper, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  let [value, setValue] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (value) {
      navigate(`/search/${value}`);
      setValue("");
    }
  };
  return (
    <Paper
      component={"form"}
      onSubmit={submitHandler}
      sx={{
        border: `1px solid ${colors.secondary}`,
        pl: 2,
        boxShadow: "none",
        mr: 5,
        width: 350 + "px",
        display: "flex"
      }}
    >
      <input
        type="text"
        placeholder="search..."
        className="search-bar"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          width: "320px"
        }}
      />
      <IconButton type="submit">
        <Search />
      </IconButton>
    </Paper>
  );
};
export default SearchBar;