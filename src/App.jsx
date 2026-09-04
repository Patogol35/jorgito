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
    const sections = document.querySelectorAll("[id]");

    for (const section of sections) {
      const rect = section.getBoundingClientRect();

      if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
        localStorage.setItem("currentSection", section.id);
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

        localStorage.removeItem("currentSection");
      }, 100);
    });
  };

  window.addEventListener("orientationchange", handleBefore);
  window.addEventListener("orientationchange", handleAfter);

  return () => {
    window.removeEventListener("orientationchange", handleBefore);
    window.removeEventListener("orientationchange", handleAfter);
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
  default: mode === "dark" ? "#0a0a0a" : "#F8FAFC",
  paper: mode === "dark" ? "#121212" : "#ffffff",
},
          text: {
            primary: mode === "dark" ? "#ffffff" : "#111111",
          },
        },
        typography: {
  fontFamily: "Poppins, sans-serif",

  h1: {
    fontWeight: 700,
  },

  h2: {
    fontWeight: 700,
  },

  h3: {
    fontWeight: 700,
  },

  h4: {
    fontWeight: 600,
  },

  h5: {
    fontWeight: 600,
  },

  h6: {
    fontWeight: 500,
  },

  body1: {
    fontWeight: 400,
  },

  body2: {
    fontWeight: 400,
  },

  button: {
    fontWeight: 500,
    textTransform: "none",
  },
},
        shape: {
          borderRadius: 12,
        },
      }),
    [mode]
  );

  //  Memo de secciones 
  const sections = useMemo(
  () => [
    { id: "about", color: "#2e7d32", Component: About },
    { id: "projects", color: "#1976d2", Component: Projects },
    { id: "skills", color: "#00897b", Component: Skills },
    { id: "certifications", color: "#6D5BD0", Component: Certifications },
    
    { id: "contact", color: "#d32f2f", Component: Contact },
    { id: "form", color: "#fb8c00", Component: Form },
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
      radial-gradient(circle at top left, rgba(255,255,255,0.6), transparent 30%),
      linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)
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
            px: { xs: 1, sm: 2, md: 3, lg: 4 },
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
                borderRadius: "18px",

                background:
  theme.palette.mode === "dark"
    ? `
      radial-gradient(
        ellipse at 20% 0%,
        ${color}55 0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse at 100% 100%,
        ${color}30 0%,
        transparent 45%
      ),
      #101216
    `
    : `
      radial-gradient(
        ellipse at 20% 0%,
        ${color}40 0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse at 100% 100%,
        ${color}20 0%,
        transparent 45%
      ),
      #f8fafc
    `,
                
                border: `1px solid ${color}55`,

                boxShadow:
                  theme.palette.mode === "light"
                    ? "0 4px 12px rgba(0,0,0,0.05)"
                    : "0 4px 12px rgba(0,0,0,0.4)",

                scrollMarginTop: scrollOffset,

                // 🔥 OPTIMIZACIÓN IMPORTANTE
                transition:
                  "transform 0.25s ease, box-shadow 0.25s ease, border 0.25s ease",

                "&:hover": {
                  transform: "translateY(-4px) scale(1.01)",
                  border: `0.8px solid ${color}`,
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
    onClick={() => setMode((prev) => (prev === "light" ? "dark" : "light"))}
    sx={(theme) => ({
      position: "fixed",
      top: 90,     // 👈 MISMA ALTURA 
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

    
      transition: "transform 0.2s ease",

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
    
    onClick={() => setLang((prev) => (prev === "es" ? "en" : "es"))}
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
      
      transition: "transform 0.2s ease",
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
