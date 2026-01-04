import { Stack } from "@mui/material";
import { category } from "../../constants/index";
import { colors } from "../../constants/colors";
const Category = ({ selectedCategory, onSelect }) => {
  return (
    <Stack direction="row" sx={{ overflowX: "scroll" }}>
      {category && category.map((item) => (
        <button
          key={item.name}
          className="category-btn"
          style={{
            borderRadius: "0",
            background: item.name === selectedCategory ? colors.secondary : null,
            color: item.name === selectedCategory ? "#fff" : null,
          }}
          onClick={() => onSelect(item.name)}
        >
          <span
            style={{
              color: item.name === selectedCategory ? "#fff" : colors.secondary,
              marginRight: "15px",
            }}
          >
            {item.icon}
          </span>
          <span style={{ opacity: 1 }}>{item.name}</span>
        </button>
      ))}
    </Stack>
  );
};
export default Category;