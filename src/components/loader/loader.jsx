import { Box, CircularProgress, Stack, Typography, keyframes } from "@mui/material";
import { colors } from "../../constants/colors";
import { motion } from "framer-motion";
import YouTubeIcon from '@mui/icons-material/YouTube';

// Animatsiyalar
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const Loader = ({ fullScreen = true, text = "Loading...", size = "medium" }) => {
  // Size variants
  const sizeMap = {
    small: {
      container: { minHeight: "200px" },
      icon: 40,
      text: "body2",
      progress: 30
    },
    medium: {
      container: { minHeight: fullScreen ? "100vh" : "400px" },
      icon: 60,
      text: "h6",
      progress: 40
    },
    large: {
      container: { minHeight: fullScreen ? "100vh" : "600px" },
      icon: 80,
      text: "h5",
      progress: 50
    }
  };

  const currentSize = sizeMap[size] || sizeMap.medium;

  // Random loader messages
  const loadingMessages = [
    "Videolar yuklanmoqda...",
    "Kutib turing...",
    "Ma'lumotlar tayyorlanmoqda...",
    "Siz uchun eng yaxshi videolar...",
    "Biroz sabr qiling...",
    "Sehrli momentlar...",
    "Video sarguzashtlari...",
    "Kontent tayyorlanmoqda...",
    "Marhamat, biroz kuting...",
    "Yuklash davom etmoqda..."
  ];

  const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  return (
    <Box
      sx={{
        minHeight: currentSize.container.minHeight,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.primary} 100%)`,
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{
          p: 4,
          borderRadius: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: `0 10px 40px ${colors.secondary}30`,
          border: `1px solid ${colors.secondary}20`,
        }}
      >
        {/* Asosiy loader */}
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          {/* Spinning loader */}
          <CircularProgress
            size={currentSize.progress}
            thickness={4}
            sx={{
              color: colors.secondary,
              animation: `${spin} 1.5s linear infinite`,
            }}
          />
          
          {/* Center icon */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <YouTubeIcon
                sx={{
                  fontSize: currentSize.icon / 1.5,
                  color: colors.secondary,
                }}
              />
            </motion.div>
          </Box>
        </Box>

        {/* Loading text */}
        <Stack spacing={1} alignItems="center">
          <Typography
            variant={currentSize.text}
            sx={{
              fontWeight: 600,
              background: `linear-gradient(135deg, ${colors.secondary}, #ff6b6b)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: `${pulse} 2s ease-in-out infinite`,
            }}
          >
            {text || randomMessage}
          </Typography>

          {/* Animated dots */}
          <Stack direction="row" spacing={1}>
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 0.6,
                  delay: dot * 0.2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: colors.secondary,
                    opacity: 0.7,
                  }}
                />
              </motion.div>
            ))}
          </Stack>
        </Stack>

        {/* Fun fact or quote (optional) */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            maxWidth: "300px",
            textAlign: "center",
            mt: 2,
            fontStyle: "italic",
            borderTop: `1px solid ${colors.gray}`,
            pt: 2,
          }}
        >
          "Har bir video - bu yangi hikoya" 🎬
        </Typography>
      </Stack>
    </Box>
  );
};

// Variant 2: Simple Loader
export const SimpleLoader = ({ color = colors.secondary, size = 30 }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress
        size={size}
        sx={{
          color: color,
          animation: `${spin} 1s linear infinite`,
        }}
      />
    </Box>
  );
};

// Variant 3: Skeleton Loader for cards
export const CardSkeleton = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          height: 180,
          backgroundColor: colors.gray,
          borderRadius: "12px",
          animation: `${pulse} 1.5s ease-in-out infinite`,
          mb: 1,
        }}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: colors.gray,
            animation: `${pulse} 1.5s ease-in-out infinite`,
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              height: 20,
              width: "80%",
              backgroundColor: colors.gray,
              borderRadius: "4px",
              animation: `${pulse} 1.5s ease-in-out infinite`,
              mb: 0.5,
            }}
          />
          <Box
            sx={{
              height: 15,
              width: "60%",
              backgroundColor: colors.gray,
              borderRadius: "4px",
              animation: `${pulse} 1.5s ease-in-out infinite`,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

// Variant 4: Page Loader with logo
export const PageLoader = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: colors.primary,
      }}
    >
      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          >
            <YouTubeIcon
              sx={{
                fontSize: 80,
                color: colors.secondary,
              }}
            />
          </motion.div>
          <Typography
            variant="h5"
            sx={{
              mt: 2,
              fontWeight: "bold",
              color: colors.secondary,
            }}
          >
            Javohir TV
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

// Variant 5: Minimal Loader
export const MinimalLoader = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <CircularProgress size={20} sx={{ color: colors.secondary }} />
        <Typography variant="body2" color="text.secondary">
          Yuklanmoqda...
        </Typography>
      </Stack>
    </Box>
  );
};

// Loader CSS
const loaderStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 10px ${colors.secondary}50; }
    50% { box-shadow: 0 0 30px ${colors.secondary}80; }
  }
`;

// Style component
export const LoaderStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: loaderStyles }} />
);

export default Loader;