import { useState, useMemo, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Paper,
  Container,
  Fab,
  Tooltip,
} from "@mui/material";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ChatBot from "./components/ChatBot.jsx";
import Form from "./components/Form.jsx";

import { translations } from "./i18n";

function App() {
  // 🌙 Tema
  const [mode, setMode] = useState(() =>
    localStorage.getItem("themeMode") || "dark"
  );

  // 🌐 Idioma
  const [lang, setLang] = useState(() =>
    localStorage.getItem("lang") || "es"
  );

  const scrollOffset = "80px";

  // Persistencia
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = translations[lang] || translations["es"];

  // 🎨 THEME PRO (ajustado)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#ffeb3b",
          },
          background: {
            default: mode === "dark" ? "#0a0a0a" : "#f5f5f5",
            paper: mode === "dark" ? "#121212" : "#ffffff",
          },
          text: {
            primary: mode === "dark" ? "#ffffff" : "#111111",
          },
        },
        typography: {
          fontFamily: "Poppins, Roboto, sans-serif",
          h2: { fontWeight: 700 },
          h4: { fontWeight: 600 },
        },

        // 🔥 FIX IMPORTANTE
        shape: {
          borderRadius: 12, // antes 16 → ahora más elegante
        },
      }),
    [mode]
  );

  const sections = useMemo(
    () => [
      { id: "about", color: "#2e7d32", Component: About },
      { id: "skills", color: "#fb8c00", Component: Skills },
      { id: "certifications", color: "#C0A660", Component: Certifications },
      { id: "projects", color: "#1976d2", Component: Projects },
      { id: "contact", color: "#d32f2f", Component: Contact },
      { id: "form", color: "#00897b", Component: Form },
    ],
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ minHeight: "100vh", overflowX: "hidden" }}>
        <Navbar mode={mode} setMode={setMode} t={t} lang={lang} />

        <Hero
          mode={mode}
          setMode={setMode}
          t={t}
          lang={lang}
          setLang={setLang}
        />

        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            py: 6,
            px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 },
          }}
        >
          {sections.map(({ id, color, Component }) => (
            <Paper
  key={id}
  id={id}
  elevation={0}
  sx={(theme) => ({
    mb: 4,
    p: { xs: 3, md: 5 },

    borderRadius: { xs: 3, md: 4 },

    backgroundColor: theme.palette.background.paper,

    // 🔥 BORDE MÁS CLARO Y ELEGANTE
    border: `1.5px solid ${color}55`, // antes 30 → ahora más visible

    // 🔥 GLOW MÁS DEFINIDO
    boxShadow:
      theme.palette.mode === "light"
        ? `0 6px 18px rgba(0,0,0,0.06),
           0 0 0 1px ${color}35`
        : `0 6px 20px rgba(0,0,0,0.5),
           0 0 0 1px ${color}40`,

    position: "relative",
    overflow: "hidden",

    // 🔥 ACCENT TOP BORDER (ULTRA PRO)
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "3px",
      background: `linear-gradient(90deg, ${color}, ${color}88, transparent)`,
    },

    // 🔥 BORDE INTERNO SUAVE
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      padding: "1px",
      background: `linear-gradient(135deg, ${color}66, transparent 70%)`,
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      pointerEvents: "none",
    },

    scrollMarginTop: scrollOffset,
    transition: "all 0.3s ease",

    "&:hover": {
      transform: "translateY(-6px)",

      // 🔥 HOVER MÁS CLARO
      boxShadow:
        theme.palette.mode === "light"
          ? `0 12px 28px rgba(0,0,0,0.1),
             0 0 0 1.5px ${color}70`
          : `0 12px 30px rgba(0,0,0,0.6),
             0 0 0 1.5px ${color}80`,
    },
  })}
>
  <Component t={t} />
</Paper>
          ))}
        </Container>

        <Footer t={t} />

        {/* WhatsApp */}
        <Tooltip title="Chatea por WhatsApp" placement="left">
          <Fab
            aria-label="whatsapp"
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 1000,
              bgcolor: "#25D366",
              "&:hover": { bgcolor: "#1ebe5c" },
            }}
            onClick={() =>
              window.open("https://wa.me/593997979099", "_blank")
            }
          >
            <WhatsAppIcon sx={{ fontSize: 32, color: "#fff" }} />
          </Fab>
        </Tooltip>

        {/* Idioma */}
        <Tooltip title="Cambiar idioma" placement="left">
          <Fab
            aria-label="idioma"
            disableRipple
            disableFocusRipple
            disableTouchRipple
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            sx={(theme) => ({
              position: "fixed",
              top: 90,
              right: 16,
              zIndex: 1200,
              bgcolor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[900]
                  : theme.palette.primary.main,
              color: "#fff",
              width: 52,
              height: 52,
              fontWeight: 800,
              fontSize: "1rem",
              letterSpacing: "1px",
              boxShadow: "none",

              "&:hover": {
                bgcolor:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[800]
                    : theme.palette.primary.dark,
              },
            })}
          >
            {lang === "es" ? "EN" : "ES"}
          </Fab>
        </Tooltip>

        <ChatBot t={t} lang={lang} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
