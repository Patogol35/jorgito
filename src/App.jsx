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
import { Brightness4, Brightness7 } from "@mui/icons-material";
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

  // 🔥 Persistencia
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
  const handleBefore = () => {
    const sections = document.querySelectorAll("section, [id]");
    for (let sec of sections) {
      const rect = sec.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
        localStorage.setItem("currentSection", sec.id);
        break;
      }
    }
  };

  const handleAfter = () => {
    const id = localStorage.getItem("currentSection");
    if (!id) return;

    requestAnimationFrame(() => {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "auto",
          block: "start",
        });

        // 🧹 limpiar para evitar basura en memoria
        localStorage.removeItem("currentSection");
      }, 80);
    });
  };

  window.addEventListener("orientationchange", handleBefore);
  window.addEventListener("resize", handleAfter);

  return () => {
    window.removeEventListener("orientationchange", handleBefore);
    window.removeEventListener("resize", handleAfter);
  };
}, []);

  const t = translations[lang] || translations["es"];

  // 🎨 Theme optimizado
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#1976d2" },
          secondary: { main: "#ffeb3b" },
          background: {
  default: mode === "dark" ? "#0a0a0a" : "#e6dccb",
  paper: mode === "dark" ? "#121212" : "#f6f3ee",
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

  // 🔥 Memo de secciones (correcto)
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

      <Box
  sx={(theme) => ({
    minHeight: "100vh",
    overflowX: "hidden",

    background:
      theme.palette.mode === "dark"
        ? "#0a0a0a"
        : `
          radial-gradient(circle at top left, rgba(255,255,255,0.45), transparent 35%),
          radial-gradient(circle at bottom right, rgba(0,0,0,0.04), transparent 35%),
          #e6dccb
        `,
  })}
>
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
                borderRadius: 0,

                backgroundColor:
  theme.palette.mode === "dark"
    ? "#121212"
    : "#f6f3ee",

                backgroundImage:
  theme.palette.mode === "dark"
    ? "linear-gradient(rgba(255,255,255,0.03), rgba(255,255,255,0.03))"
    : "linear-gradient(rgba(255,255,255,0.35), rgba(0,0,0,0.015))",
                
                border: `1.5px solid ${color}55`,

                boxShadow:
                  theme.palette.mode === "light"
                    ? "0 4px 12px rgba(0,0,0,0.05)"
                    : "0 4px 12px rgba(0,0,0,0.4)",

                scrollMarginTop: scrollOffset,

                // 🔥 OPTIMIZACIÓN IMPORTANTE
                transition:
                  "transform 0.25s ease, box-shadow 0.25s ease, border 0.25s ease",

                willChange: "transform",

                "&:hover": {
                  transform: "translateY(-4px) scale(1.01)",
                  border: `1.5px solid ${color}`,
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 10px 24px rgba(0,0,0,0.08)"
                      : "0 10px 24px rgba(0,0,0,0.6)",
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

{/* Tema */}
<Tooltip title="Cambiar tema" placement="right">
  <Fab
    aria-label="tema"
    onClick={() => setMode(mode === "light" ? "dark" : "light")}
    sx={(theme) => ({
      position: "fixed",
      top: 90,     // 👈 MISMA ALTURA QUE IDIOMA
      left: 16,    // 👈 lado izquierdo
      zIndex: 1200,

      bgcolor:
        theme.palette.mode === "dark"
          ? theme.palette.grey[900]
          : theme.palette.primary.main,

      color: "#fff",
      width: 52,
      height: 52,
      boxShadow: "none",

      transition: "background-color 0.25s ease, transform 0.2s ease",

      "&:hover": {
        bgcolor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[800]
            : theme.palette.primary.dark,
      },

      "&:active": {
        transform: "scale(0.95)",
      },
    })}
  >
    {mode === "light" ? <Brightness4 /> : <Brightness7 />}
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

      // 🔥 MISMO FIX
      transition: "background-color 0.25s ease, transform 0.2s ease",
      willChange: "background-color",

      "&:hover": {
        bgcolor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[800]
            : theme.palette.primary.dark,
      },

      "&:active": {
        transform: "scale(0.95)",
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
