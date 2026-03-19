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
import LanguageIcon from "@mui/icons-material/Language";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { translations } from "../i18n";

export default function Hero({ mode, setMode, lang, setLang }) {
  const theme = useTheme();
  const t = translations[lang];

  return (
    <>
      <Toolbar />

      <Box
        id="hero"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, md: 8 },
          pt: { xs: 6, sm: 8, md: 10 },
          pb: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 4, md: 8 },
        }}
      >
        <Avatar
          alt="Jorge"
          src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1768080897/file_00000000abe471f8a911de56e6d3cb7f_e0quhw.png"
          sx={{
            width: { xs: 130, sm: 170, md: 200 },
            height: { xs: 130, sm: 170, md: 200 },
            border: `3px solid ${theme.palette.primary.main}`,
          }}
        />

        <Box textAlign={{ xs: "center", sm: "left" }}>
          <Typography variant="h4" fontWeight="bold">
            {t.hero.title}
          </Typography>

          <Typography sx={{ fontStyle: "italic", mt: 1 }}>
            {t.hero.subtitle}
          </Typography>

          <Typography sx={{ mt: 2, maxWidth: "500px" }}>
            {t.hero.description}
          </Typography>

          {/* BOTONES */}
          <Box sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              startIcon={<DescriptionIcon />}
              href="/Jorge.CV.pdf"
              target="_blank"
            >
              {t.hero.buttons.cv}
            </Button>

            <Button
              variant="contained"
              startIcon={<WorkspacePremiumIcon />}
              href="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1759022233/image_b835ddca-c010-4f78-a300-676248ea3fd120250927_201635_cizk17.jpg"
              target="_blank"
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

            {/* 🌐 BOTÓN IDIOMA */}
            <Button
              variant="outlined"
              startIcon={<LanguageIcon />}
              onClick={() => setLang(lang === "es" ? "en" : "es")}
            >
              {lang === "es" ? "EN" : "ES"}
            </Button>

            {/* 🌙 MODO */}
            <IconButton
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
            >
              {mode === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
