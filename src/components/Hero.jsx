// ================= Hero.jsx =================
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

export default function Hero({ mode, setMode, t, lang, setLang }) {
  const theme = useTheme();

  const fade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
      <Toolbar />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          p: 4,
        }}
      >
        {/* Avatar */}
        <Avatar
          src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1768080897/file.png"
          sx={{ width: 180, height: 180 }}
        />

        {/* Text */}
        <Box maxWidth={600} textAlign={{ xs: "center", md: "left" }}>
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fade}>
              <Typography variant="h4" fontWeight="bold">
                {t.hero.title}
              </Typography>
            </motion.div>

            <motion.div variants={fade}>
              <Typography variant="h6" sx={{ mt: 1 }}>
                {t.hero.subtitle}
              </Typography>
            </motion.div>

            <motion.div variants={fade}>
              <Typography sx={{ mt: 3 }}>{t.hero.description}</Typography>
            </motion.div>
          </motion.div>

          {/* Buttons */}
          <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              startIcon={<DescriptionIcon />}
              href="/Jorge.CV.pdf"
            >
              {t.hero.buttons.cv}
            </Button>

            <Button
              variant="contained"
              startIcon={<WorkspacePremiumIcon />}
              href="#"
            >
              {t.hero.buttons.title}
            </Button>

            <Button
              variant="contained"
              startIcon={<SmartToyIcon />}
              onClick={() => window.openSashaChat?.()}
            >
              {t.hero.buttons.ai}
            </Button>

            {/* Dark mode */}
            <IconButton onClick={() => setMode(mode === "light" ? "dark" : "light")}>
              {mode === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>

            {/* 🌍 BOTÓN IDIOMA */}
            <Button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              sx={{
                border: `1px solid ${theme.palette.primary.main}`,
                color: theme.palette.primary.main,
                borderRadius: "20px",
                fontWeight: "bold",
              }}
            >
              {lang === "es" ? "EN" : "ES"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
