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
  const [mode, setMode] = useState(() =>
    localStorage.getItem("themeMode") || "dark"
  );

  const [lang, setLang] = useState(() =>
    localStorage.getItem("lang") || "es"
  );

  const scrollOffset = "80px";

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = translations[lang] || translations["es"];

  // 🔥 THEME FIX (SIN TRANSPARENCIAS)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#1976d2" },
          secondary: { main: "#ffeb3b" },
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
        shape: {
          borderRadius: 12,
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

                // 🔥 BASE SÓLIDA (FIX REAL)
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "#121212"
                    : "#ffffff",

                // 🔥 GLASS CONTROLADO (SIN FLASH)
                backgroundImage:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(rgba(255,255,255,0.04), rgba(255,255,255,0.04))"
                    : "linear-gradient(rgba(0,0,0,0.02), rgba(0,0,0,0.02))",

                backdropFilter: "blur(6px)",

                border: `1.5px solid ${color}33`,

                boxShadow:
                  theme.palette.mode === "light"
                    ? "0 4px 12px rgba(0,0,0,0.05)"
                    : "0 4px 12px rgba(0,0,0,0.4)",

                scrollMarginTop: scrollOffset,

                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

                "&:hover": {
                  transform: "translateY(-6px) scale(1.01)",
                  border: `1.5px solid ${color}`,
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 12px 28px rgba(0,0,0,0.08)"
                      : "0 12px 28px rgba(0,0,0,0.6)",
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
