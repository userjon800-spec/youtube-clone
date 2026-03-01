import { Stack, Box, Typography, Chip, alpha } from "@mui/material";
import { category } from "../../constants/index";
import { colors } from "../../constants/colors";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const Category = ({ selectedCategory, onSelect }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        scrollRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll();
      window.addEventListener("resize", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      };
    }
  }, []);
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {showLeftArrow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            background: `linear-gradient(90deg, ${colors.primary} 0%, transparent 100%)`,
            paddingLeft: "10px",
            cursor: "pointer",
          }}
          onClick={() => scroll("left")}
        >
          <Box
            sx={{
              backgroundColor: colors.secondary,
              borderRadius: "50%",
              width: 35,
              height: 35,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              boxShadow: `0 2px 10px ${alpha(colors.secondary, 0.3)}`,
              "&:hover": {
                backgroundColor: colors.secondary + "dd",
                transform: "scale(1.1)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </Box>
        </motion.div>
      )}
      {showRightArrow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            background: `linear-gradient(-90deg, ${colors.primary} 0%, transparent 100%)`,
            paddingRight: "10px",
            cursor: "pointer",
          }}
          onClick={() => scroll("right")}
        >
          <Box
            sx={{
              backgroundColor: colors.secondary,
              borderRadius: "50%",
              width: 35,
              height: 35,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              boxShadow: `0 2px 10px ${alpha(colors.secondary, 0.3)}`,
              "&:hover": {
                backgroundColor: colors.secondary + "dd",
                transform: "scale(1.1)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </Box>
        </motion.div>
      )}
      <Stack
        ref={scrollRef}
        direction="row"
        sx={{
          overflowX: "auto",
          overflowY: "hidden",
          scrollBehavior: "smooth",
          py: 2,
          px: 1,
          gap: 1.5,
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {category &&
          category.map((item, index) => {
            const isSelected = item.name === selectedCategory;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box
                  onClick={() => onSelect(item.name)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    py: 1.2,
                    px: 2.5,
                    borderRadius: "40px",
                    cursor: "pointer",
                    backgroundColor: isSelected
                      ? colors.secondary
                      : alpha(colors.gray, 0.1),
                    border: `2px solid ${isSelected ? colors.secondary : "transparent"}`,
                    color: isSelected ? "white" : "text.primary",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    minWidth: "fit-content",
                    boxShadow: isSelected
                      ? `0 4px 15px ${alpha(colors.secondary, 0.3)}`
                      : "none",
                    "&:hover": {
                      backgroundColor: isSelected
                        ? colors.secondary + "dd"
                        : alpha(colors.secondary, 0.1),
                      borderColor: isSelected
                        ? colors.secondary
                        : alpha(colors.secondary, 0.3),
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isSelected ? "white" : colors.secondary,
                      fontSize: "1.2rem",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: "0.95rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.name}
                  </Typography>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Chip
                        label="•"
                        size="small"
                        sx={{
                          height: 20,
                          minWidth: 20,
                          backgroundColor: "white",
                          color: colors.secondary,
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          ml: 0.5,
                        }}
                      />
                    </motion.div>
                  )}
                </Box>
              </motion.div>
            );
          })}
      </Stack>
    </Box>
  );
};
export default Category;