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
  const [mode, setMode] = useState(
    () => localStorage.getItem("themeMode") || "dark"
  );

  const [lang, setLang] = useState(
    () => localStorage.getItem("lang") || "es"
  );

  const scrollOffset = "80px";

  // 🔥 Persistencia
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  // 🔥 Mantener posición al rotar
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

  // 🎨 Theme beige premium
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,

          primary: {
            main: "#8b5e3c",
          },

          secondary: {
            main: "#c8a97e",
          },

          background: {
            // 🔥 Fondo beige elegante
            default: mode === "dark" ? "#0a0a0a" : "#ebe2d3",

            // 🔥 Cards crema premium
            paper: mode === "dark" ? "#121212" : "#f8f1e7",
          },

          text: {
            primary: mode === "dark" ? "#ffffff" : "#2d2218",
          },
        },

        typography: {
          fontFamily: "Poppins, Roboto, sans-serif",

          h2: {
            fontWeight: 700,
          },

          h4: {
            fontWeight: 600,
          },
        },

        shape: {
          borderRadius: 14,
        },
      }),
    [mode]
  );

  // 🔥 Secciones
  const sections = useMemo(
    () => [
      { id: "about", color: "#4e7d4e", Component: About },
      { id: "skills", color: "#c27c2c", Component: Skills },
      { id: "certifications", color: "#b6954d", Component: Certifications },
      { id: "projects", color: "#7a5cfa", Component: Projects },
      { id: "contact", color: "#b85b52", Component: Contact },
      { id: "form", color: "#3e8b7b", Component: Form },
    ],
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          overflowX: "hidden",

          bgcolor: "background.default",

          transition: "background-color 0.35s ease",
        }}
      >
        <Navbar
          mode={mode}
          setMode={setMode}
          t={t}
          lang={lang}
        />

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

            px: {
              xs: 2,
              sm: 4,
              md: 6,
              lg: 8,
              xl: 12,
            },
          }}
        >
          {sections.map(({ id, color, Component }) => (
            <Paper
              key={id}
              id={id}
              elevation={0}
              sx={(theme) => ({
                mb: 4,

                p: {
                  xs: 3,
                  md: 5,
                },

                borderRadius: {
                  xs: 4,
                  md: 5,
                },

                // 🔥 Fondo crema elegante
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "#121212"
                    : "#f8f1e7",

                // 🔥 Gradient premium
                backgroundImage:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(rgba(255,255,255,0.03), rgba(255,255,255,0.03))"
                    : `
                      linear-gradient(
                        135deg,
                        rgba(255,255,255,0.7),
                        rgba(255,248,240,0.45)
                      )
                    `,

                // 🔥 Glass effect
                backdropFilter:
                  theme.palette.mode === "light"
                    ? "blur(10px)"
                    : "none",

                border: `1.5px solid ${color}55`,

                boxShadow:
                  theme.palette.mode === "light"
                    ? `
                      0 8px 22px rgba(120, 90, 60, 0.10),
                      0 2px 8px rgba(0,0,0,0.04)
                    `
                    : "0 6px 18px rgba(0,0,0,0.45)",

                scrollMarginTop: scrollOffset,

                transition:
                  "transform 0.25s ease, box-shadow 0.25s ease, border 0.25s ease",

                willChange: "transform",

                "&:hover": {
                  transform: "translateY(-5px) scale(1.01)",

                  border: `1.5px solid ${color}`,

                  boxShadow:
                    theme.palette.mode === "light"
                      ? `
                        0 14px 32px rgba(120,90,60,0.16),
                        0 4px 12px rgba(0,0,0,0.06)
                      `
                      : "0 12px 28px rgba(0,0,0,0.65)",
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

              "&:hover": {
                bgcolor: "#1ebe5c",
              },
            }}
            onClick={() =>
              window.open("https://wa.me/593997979099", "_blank")
            }
          >
            <WhatsAppIcon
              sx={{
                fontSize: 32,
                color: "#fff",
              }}
            />
          </Fab>
        </Tooltip>

        {/* Tema */}
        <Tooltip title="Cambiar tema" placement="right">
          <Fab
            aria-label="tema"
            onClick={() =>
              setMode(mode === "light" ? "dark" : "light")
            }
            sx={(theme) => ({
              position: "fixed",

              top: 90,
              left: 16,

              zIndex: 1200,

              bgcolor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[900]
                  : "#8b5e3c",

              color: "#fff",

              width: 52,
              height: 52,

              boxShadow: "none",

              transition:
                "background-color 0.25s ease, transform 0.2s ease",

              "&:hover": {
                bgcolor:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[800]
                    : "#6f472c",
              },

              "&:active": {
                transform: "scale(0.95)",
              },
            })}
          >
            {mode === "light" ? (
              <Brightness4 />
            ) : (
              <Brightness7 />
            )}
          </Fab>
        </Tooltip>

        {/* Idioma */}
        <Tooltip title="Cambiar idioma" placement="left">
          <Fab
            aria-label="idioma"
            disableRipple
            disableFocusRipple
            disableTouchRipple
            onClick={() =>
              setLang(lang === "es" ? "en" : "es")
            }
            sx={(theme) => ({
              position: "fixed",

              top: 90,
              right: 16,

              zIndex: 1200,

              bgcolor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[900]
                  : "#8b5e3c",

              color: "#fff",

              width: 52,
              height: 52,

              fontWeight: 800,
              fontSize: "1rem",
              letterSpacing: "1px",

              boxShadow: "none",

              transition:
                "background-color 0.25s ease, transform 0.2s ease",

              "&:hover": {
                bgcolor:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[800]
                    : "#6f472c",
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
