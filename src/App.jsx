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

  // 📱 Mantener la sección visible al cambiar orientación
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

  // 🎨 Theme
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
            default: mode === "dark" ? "#0a0a0a" : "#F8FAFC",
            paper: mode === "dark" ? "#121212" : "#ffffff",
          },

          text: {
            primary: mode === "dark" ? "#ffffff" : "#111111",
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
        color: "#00897b",
        Component: Skills,
      },
      {
        id: "certifications",
        color: "#6D5BD0",
        Component: Certifications,
      },
      {
        id: "contact",
        color: "#d32f2f",
        Component: Contact,
      },
      {
        id: "form",
        color: "#fb8c00",
        Component: Form,
      },
    ],
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* =====================================================
          FONDO GENERAL DE TODA LA APLICACIÓN
      ====================================================== */}

      <Box
        sx={(theme) => ({
          minHeight: "100vh",
          overflowX: "hidden",

          background:
            theme.palette.mode === "dark"
              ? "#0a0a0a"
              : `
                radial-gradient(
                  circle at top left,
                  rgba(255,255,255,0.6),
                  transparent 30%
                ),
                linear-gradient(
                  180deg,
                  #F8FAFC 0%,
                  #F1F5F9 100%
                )
              `,
        })}
      >
        {/* =====================================================
            NAVBAR
        ====================================================== */}

        <Navbar
          mode={mode}
          setMode={setMode}
          t={t}
          lang={lang}
        />

        {/* =====================================================
            HERO
        ====================================================== */}

        <Hero
          mode={mode}
          setMode={setMode}
          t={t}
          lang={lang}
          setLang={setLang}
        />

        {/* =====================================================
            NUEVO FONDO PARA LAS SECCIONES
        ====================================================== */}

        <Box
          sx={(theme) => ({
            position: "relative",

            py: {
              xs: 4,
              sm: 5,
              md: 6,
            },

            background:
              theme.palette.mode === "dark"
                ? `
                  radial-gradient(
                    circle at 10% 10%,
                    rgba(25,118,210,0.10),
                    transparent 30%
                  ),
                  radial-gradient(
                    circle at 90% 40%,
                    rgba(109,91,208,0.09),
                    transparent 30%
                  ),
                  linear-gradient(
                    180deg,
                    #111827 0%,
                    #0f172a 45%,
                    #111827 100%
                  )
                `
                : `
                  radial-gradient(
                    circle at 10% 10%,
                    rgba(25,118,210,0.08),
                    transparent 30%
                  ),
                  radial-gradient(
                    circle at 90% 40%,
                    rgba(109,91,208,0.07),
                    transparent 30%
                  ),
                  linear-gradient(
                    180deg,
                    #eef2ff 0%,
                    #f8fafc 45%,
                    #e2e8f0 100%
                  )
                `,
          })}
        >
          {/* =====================================================
              CONTENEDOR DE LAS CARDS
          ====================================================== */}

          <Container
            maxWidth="lg"
            disableGutters
            sx={{
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

                  // 🎨 Fondo individual de cada card
                  background:
                    theme.palette.mode === "dark"
                      ? `
                        radial-gradient(
                          circle at 10% 0%,
                          ${color}35,
                          transparent 40%
                        ),
                        linear-gradient(
                          135deg,
                          ${color}28 0%,
                          ${color}12 50%,
                          #101216 100%
                        )
                      `
                      : `
                        radial-gradient(
                          circle at 0% 0%,
                          ${color}25,
                          transparent 45%
                        ),
                        linear-gradient(
                          135deg,
                          ${color}18 0%,
                          rgba(248,250,252,0.92) 55%,
                          rgba(226,232,240,0.95) 100%
                        )
                      `,

                  border: `1px solid ${color}55`,

                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 4px 12px rgba(0,0,0,0.05)"
                      : "0 4px 12px rgba(0,0,0,0.4)",

                  scrollMarginTop: scrollOffset,

                  transition:
                    "transform 0.25s ease, box-shadow 0.25s ease, border 0.25s ease",

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
        </Box>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <Footer t={t} />

        {/* =====================================================
            WHATSAPP
        ====================================================== */}

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

        {/* =====================================================
            BOTÓN CAMBIAR TEMA
        ====================================================== */}

        <Tooltip
          title="Cambiar tema"
          placement="right"
        >
          <Fab
            aria-label="tema"
            onClick={() =>
              setMode((prev) =>
                prev === "light" ? "dark" : "light"
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
            {mode === "light" ? (
              <Brightness4 />
            ) : (
              <Brightness7 />
            )}
          </Fab>
        </Tooltip>

        {/* =====================================================
            BOTÓN CAMBIAR IDIOMA
        ====================================================== */}

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
              setLang((prev) =>
                prev === "es" ? "en" : "es"
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
                  : theme.palette.primary.main,

              color: "#fff",

              width: 52,
              height: 52,

              fontWeight: 800,
              fontSize: "1rem",
              letterSpacing: "1px",

              boxShadow: "none",

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

        {/* =====================================================
            CHATBOT
        ====================================================== */}

        <ChatBot
          t={t}
          lang={lang}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
