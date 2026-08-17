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

  // 🔥 Persistencia del tema
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  // 🌎 Persistencia del idioma
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  // 📱 Mantener sección al cambiar orientación
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

  // 🎨 THEME
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
            default: mode === "dark" ? "#0A0A0A" : "#FAF8F2",
            paper: mode === "dark" ? "#121212" : "#FFFFFF",
          },

          text: {
            primary: mode === "dark" ? "#FFFFFF" : "#171717",
            secondary: mode === "dark" ? "#BDBDBD" : "#625F58",
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
          borderRadius: 12,
        },
      }),
    [mode]
  );

  // 📦 Secciones
  const sections = useMemo(
    () => [
      {
        id: "about",
        color: "#2e7d32",
        Component: About,
      },
      {
        id: "projects",
        color: "#1976d2",
        Component: Projects,
      },
      {
        id: "skills",
        color: "#fb8c00",
        Component: Skills,
      },
      {
        id: "certifications",
        color: "#C0A660",
        Component: Certifications,
      },
      {
        id: "contact",
        color: "#d32f2f",
        Component: Contact,
      },
      {
        id: "form",
        color: "#00897b",
        Component: Form,
      },
    ],
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* =====================================================
          CONTENEDOR PRINCIPAL
      ====================================================== */}

      <Box
        sx={(theme) => ({
          minHeight: "100vh",
          overflowX: "hidden",

          position: "relative",

          backgroundColor:
            theme.palette.mode === "dark"
              ? "#0A0A0A"
              : "#FAF8F2",

          transition: "background-color 0.5s ease",
        })}
      >

        {/* =====================================================
            🌅 AURA GOLDEN HOUR
            Solo visible en modo claro
        ====================================================== */}

        {mode === "light" && (
          <Box
            aria-hidden="true"
            sx={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >

            {/* Layer 1 — Golden Atmosphere */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,

                background: `
                  linear-gradient(
                    135deg,
                    rgba(255,255,255,0) 0%,
                    rgba(243,223,181,0.10) 25%,
                    rgba(232,194,122,0.12) 45%,
                    rgba(232,167,123,0.07) 70%,
                    rgba(255,255,255,0) 100%
                  )
                `,

                mixBlendMode: "multiply",

                filter: {
                  xs: "blur(120px)",
                  md: "blur(180px)",
                },

                opacity: 0.85,

                transform: "translateZ(0)",
                willChange: "transform",
              }}
            />

            {/* Layer 2 — Champagne Glow */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,

                background: `
                  linear-gradient(
                    160deg,
                    rgba(255,255,255,0) 10%,
                    rgba(243,223,181,0.12) 35%,
                    rgba(232,194,122,0.09) 55%,
                    rgba(201,130,98,0.045) 75%,
                    rgba(255,255,255,0) 100%
                  )
                `,

                mixBlendMode: "multiply",

                filter: {
                  xs: "blur(100px)",
                  md: "blur(150px)",
                },

                opacity: 0.7,

                transform: "translateZ(0)",
                willChange: "transform",
              }}
            />

            {/* Layer 3 — Ambient Light */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,

                background: `
                  linear-gradient(
                    110deg,
                    rgba(255,255,255,0) 15%,
                    rgba(232,194,122,0.055) 45%,
                    rgba(232,167,123,0.04) 65%,
                    rgba(255,255,255,0) 90%
                  )
                `,

                mixBlendMode: "multiply",

                filter: {
                  xs: "blur(150px)",
                  md: "blur(220px)",
                },

                opacity: 0.6,

                transform: "translateZ(0)",
                willChange: "transform",
              }}
            />
          </Box>
        )}

        {/* =====================================================
            CONTENIDO PRINCIPAL
        ====================================================== */}

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >

          {/* Navbar */}
          <Navbar
            mode={mode}
            setMode={setMode}
            t={t}
            lang={lang}
          />

          {/* Hero */}
          <Hero
            mode={mode}
            setMode={setMode}
            t={t}
            lang={lang}
            setLang={setLang}
          />

          {/* =================================================
              SECCIONES
          ================================================== */}

          <Container
            maxWidth="lg"
            disableGutters
            sx={{
              py: 6,
              px: {
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
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

                  borderRadius: "18px",

                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "#121212"
                      : "rgba(255,255,255,0.72)",

                  backgroundImage:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(rgba(255,255,255,0.03), rgba(255,255,255,0.03))"
                      : "none",

                  backdropFilter:
                    theme.palette.mode === "light"
                      ? "blur(12px)"
                      : "none",

                  WebkitBackdropFilter:
                    theme.palette.mode === "light"
                      ? "blur(12px)"
                      : "none",

                  border:
                    theme.palette.mode === "light"
                      ? "1px solid rgba(255,255,255,0.78)"
                      : `1.5px solid ${color}55`,

                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 8px 30px rgba(60,45,25,0.055)"
                      : "0 4px 12px rgba(0,0,0,0.4)",

                  scrollMarginTop: scrollOffset,

                  transition:
                    "transform 0.25s ease, box-shadow 0.25s ease, border 0.25s ease",

                  willChange: "transform",

                  "&:hover": {
                    transform:
                      "translateY(-4px) scale(1.01)",

                    border:
                      theme.palette.mode === "light"
                        ? "1px solid rgba(255,255,255,0.95)"
                        : `1.5px solid ${color}`,

                    boxShadow:
                      theme.palette.mode === "light"
                        ? "0 14px 40px rgba(60,45,25,0.09)"
                        : "0 10px 24px rgba(0,0,0,0.6)",
                  },
                })}
              >
                <Component t={t} />
              </Paper>
            ))}
          </Container>

          {/* Footer */}
          <Footer t={t} />

          {/* =================================================
              WHATSAPP
          ================================================== */}

          <Tooltip
            title="Chatea por WhatsApp"
            placement="left"
          >
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
                window.open(
                  "https://wa.me/593997979099",
                  "_blank"
                )
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

          {/* =================================================
              TEMA
          ================================================== */}

          <Tooltip
            title="Cambiar tema"
            placement="right"
          >
            <Fab
              aria-label="tema"
              onClick={() =>
                setMode(
                  mode === "light"
                    ? "dark"
                    : "light"
                )
              }
              sx={(theme) => ({
                position: "fixed",

                top: 90,
                left: 16,

                zIndex: 1200,

                bgcolor:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[900]
                    : "rgba(255,255,255,0.82)",

                color:
                  theme.palette.mode === "dark"
                    ? "#fff"
                    : "#171717",

                width: 52,
                height: 52,

                boxShadow:
                  theme.palette.mode === "light"
                    ? "0 6px 20px rgba(60,45,25,0.08)"
                    : "none",

                backdropFilter:
                  theme.palette.mode === "light"
                    ? "blur(10px)"
                    : "none",

                WebkitBackdropFilter:
                  theme.palette.mode === "light"
                    ? "blur(10px)"
                    : "none",

                transition:
                  "background-color 0.25s ease, transform 0.2s ease",

                "&:hover": {
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[800]
                      : "#ffffff",
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

          {/* =================================================
              IDIOMA
          ================================================== */}

          <Tooltip
            title="Cambiar idioma"
            placement="left"
          >
            <Fab
              aria-label="idioma"
              disableRipple
              disableFocusRipple
              disableTouchRipple
              onClick={() =>
                setLang(
                  lang === "es"
                    ? "en"
                    : "es"
                )
              }
              sx={(theme) => ({
                position: "fixed",

                top: 90,
                right: 16,

                zIndex: 1200,

                bgcolor:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[900]
                    : "rgba(255,255,255,0.82)",

                color:
                  theme.palette.mode === "dark"
                    ? "#fff"
                    : "#171717",

                width: 52,
                height: 52,

                fontWeight: 800,
                fontSize: "1rem",
                letterSpacing: "1px",

                boxShadow:
                  theme.palette.mode === "light"
                    ? "0 6px 20px rgba(60,45,25,0.08)"
                    : "none",

                backdropFilter:
                  theme.palette.mode === "light"
                    ? "blur(10px)"
                    : "none",

                WebkitBackdropFilter:
                  theme.palette.mode === "light"
                    ? "blur(10px)"
                    : "none",

                transition:
                  "background-color 0.25s ease, transform 0.2s ease",

                willChange: "background-color",

                "&:hover": {
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[800]
                      : "#ffffff",
                },

                "&:active": {
                  transform: "scale(0.95)",
                },
              })}
            >
              {lang === "es"
                ? "EN"
                : "ES"}
            </Fab>
          </Tooltip>

          {/* ChatBot */}
          <ChatBot
            t={t}
            lang={lang}
          />

        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
