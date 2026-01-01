import {
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

export default function Hero({ mode, setMode }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <>
      <Toolbar />

      {/* HERO */}
      <Box
        id="hero"
        sx={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 4, md: 8 },
          background: isDark
            ? "linear-gradient(135deg, #020617, #050b18, #020617)"
            : "linear-gradient(135deg, #eef2ff, #ffffff, #eef2ff)",
        }}
      >
        {/* BLUR BACKGROUND */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(6px)",
            pointerEvents: "none",
          }}
        />

        {/* GLOW DECORATIVO */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,.35), transparent 65%)",
            top: "-160px",
            right: "-160px",
          }}
        />

        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 6, md: 12 },
            maxWidth: "1200px",
            width: "100%",
            zIndex: 2,
          }}
        >
          {/* AVATAR */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              style={{
                padding: 6,
                borderRadius: "50%",
                background:
                  "linear-gradient(90deg,#6366f1,#3b82f6,#06b6d4)",
              }}
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                  borderRadius: "50%",
                  boxShadow: "0 0 80px rgba(99,102,241,.6)",
                }}
              >
                <Avatar
                  src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
                  sx={{
                    width: { xs: 150, sm: 200, md: 240 },
                    height: { xs: 150, sm: 200, md: 240 },
                    border: "4px solid #020617",
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* TEXTO */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Box maxWidth="620px" textAlign={{ xs: "center", md: "left" }}>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2.3rem", sm: "2.9rem", md: "3.4rem" },
                  background:
                    "linear-gradient(90deg,#6366f1,#3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Jorge Patricio Santamaría
              </Typography>

              {/* LINEA DECORATIVA */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{
                  height: 4,
                  borderRadius: 4,
                  background:
                    "linear-gradient(90deg,#6366f1,#3b82f6)",
                  margin: "18px 0",
                }}
              />

              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  color: "text.secondary",
                  mb: 3,
                }}
              >
                Ingeniero de Software · Full Stack Developer
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.1rem",
                  lineHeight: 1.85,
                  mb: 5,
                }}
              >
                Construyo productos digitales con arquitectura limpia,
                rendimiento y experiencia de usuario profesional.
                Tecnología pensada para crecer.
              </Typography>

              {/* BOTONES */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", md: "flex-start" },
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<DescriptionIcon />}
                  sx={heroBtn}
                >
                  Ver CV
                </Button>

                <Button
                  variant="contained"
                  startIcon={<WorkspacePremiumIcon />}
                  sx={heroBtn}
                >
                  Ver Título
                </Button>

                <Button
                  variant="contained"
                  startIcon={<SmartToyIcon />}
                  sx={{
                    ...heroBtn,
                    background:
                      "linear-gradient(90deg,#6366f1,#06b6d4)",
                  }}
                >
                  Sasha
                </Button>

                {/* DARK MODE */}
                <IconButton
                  onClick={() =>
                    setMode(mode === "light" ? "dark" : "light")
                  }
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: `2px solid ${theme.palette.primary.main}`,
                  }}
                >
                  {mode === "light" ? (
                    <Brightness4 />
                  ) : (
                    <Brightness7 />
                  )}
                </IconButton>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </>
  );
}

const heroBtn = {
  px: 4,
  py: 1.4,
  borderRadius: "28px",
  fontWeight: 800,
  textTransform: "none",
  background: "linear-gradient(90deg,#3b82f6,#2563eb)",
  boxShadow: "0 10px 30px rgba(59,130,246,.45)",
  transition: "all .3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 20px 45px rgba(59,130,246,.6)",
  },
};
