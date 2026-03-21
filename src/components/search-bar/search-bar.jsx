import { Search } from "@mui/icons-material";
import { colors } from "../../constants/colors";
import { Paper, IconButton, InputBase, alpha, styled } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
const SearchWrapper = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "50px",
  background: colors.white,
  border: `2px solid ${colors.gray}`,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  width: "100%",
  maxWidth: "400px",
  "&:hover": {
    borderColor: colors.secondary,
    boxShadow: `0 4px 15px ${alpha(colors.secondary, 0.2)}`,
  },
  "&:focus-within": {
    borderColor: colors.secondary,
    boxShadow: `0 4px 20px ${alpha(colors.secondary, 0.3)}`,
    transform: "scale(1.02)",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "250px",
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1, 2),
  fontSize: "1rem",
  "& input": {
    "&::placeholder": {
      color: colors.darkGray,
      opacity: 0.7,
      fontStyle: "italic",
    },
  },
}));
const SearchButton = styled(IconButton)({
  backgroundColor: colors.secondary,
  color: colors.white,
  margin: "5px",
  borderRadius: "45%",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: colors.secondary + "dd",
    transform: "scale(1.1)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
});
const ClearButton = styled(IconButton)({
  color: colors.darkGray,
  "&:hover": {
    color: colors.secondary,
  },
});
const SearchBar = () => {
  let [value, setValue] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (value.trim()) {
      navigate(`/search/${value.trim()}`);
      setValue("");
    }
  };
  const clearHandler = () => {
    setValue("");
  };
  return (
    <SearchWrapper component={"form"} onSubmit={submitHandler} elevation={0}>
      <StyledInputBase
        placeholder="Qidirish... (video, kanal, kategoriya)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
        autoComplete="off"
      />
      {value && (
        <ClearButton size="small" onClick={clearHandler} sx={{ mr: 0.5 }}>
          <ClearIcon fontSize="small" />
        </ClearButton>
      )}
      <SearchButton
        type="submit"
        size="small"
        disabled={!value.trim()}
        sx={{
          opacity: value.trim() ? 1 : 0.5,
        }}
      >
        <Search />
      </SearchButton>
    </SearchWrapper>
  );
};
export default SearchBar;