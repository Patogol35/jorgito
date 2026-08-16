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

  // ============================================================
  // PERSISTENCIA
  // ============================================================

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  // ============================================================
  // RESTAURAR SECCIÓN DESPUÉS DE RESIZE / ORIENTATION CHANGE
  // ============================================================

  useEffect(() => {
    const handleBefore = () => {
      const sections = document.querySelectorAll("section, [id]");

      for (let sec of sections) {
        const rect = sec.getBoundingClientRect();

        if (
          rect.top >= 0 &&
          rect.top < window.innerHeight / 2
        ) {
          localStorage.setItem(
            "currentSection",
            sec.id
          );
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

    window.addEventListener(
      "orientationchange",
      handleBefore
    );

    window.addEventListener(
      "resize",
      handleAfter
    );

    return () => {
      window.removeEventListener(
        "orientationchange",
        handleBefore
      );

      window.removeEventListener(
        "resize",
        handleAfter
      );
    };
  }, []);

  const t =
    translations[lang] ||
    translations["es"];

  // ============================================================
  // THEME
  // ============================================================

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
            default:
              mode === "dark"
                ? "#0a0a0a"
                : "#faf8f2",

            paper:
              mode === "dark"
                ? "#121212"
                : "#ffffff",
          },

          text: {
            primary:
              mode === "dark"
                ? "#ffffff"
                : "#111111",
          },
        },

        typography: {
          fontFamily:
            "Poppins, Roboto, sans-serif",

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

  // ============================================================
  // SECCIONES
  // ============================================================

  const sections = useMemo(
    () => [
      {
        id: "about",
        color: "#2e7d32",
        Component: About,
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
        id: "projects",
        color: "#1976d2",
        Component: Projects,
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

      {/* ========================================================
          CONTENEDOR PRINCIPAL
      ======================================================== */}

      <Box
        sx={{
          position: "relative",
          overflowX: "hidden",
          minHeight: "100vh",

          /*
           * Fondo base.
           *
           * En modo claro:
           * #faf8f2
           *
           * Las capas del efecto Champagne permanecen
           * transparentes y se superponen sobre este fondo.
           */
          backgroundColor:
            mode === "dark"
              ? "#0a0a0a"
              : "#faf8f2",
        }}
      >

        {/* ======================================================
            CHAMPAGNE
            SOLO MODO CLARO
        ====================================================== */}

        {mode === "light" && (
          <>
            {/* ==================================================
                LAYER 1
                Linear gradient / normal
            ================================================== */}

            <Box
              aria-hidden="true"
              sx={{
                position: "absolute",
                inset: 0,

                background:
                  "linear-gradient(145deg, #fffbeb 0%, #fef3c7 38%, #fde68a 68%, #fcd34d 100%)",

                mixBlendMode: "normal",

                pointerEvents: "none",

                transform:
                  "translateZ(0)",

                willChange: "transform",

                zIndex: 0,
              }}
            />

            {/* ==================================================
                LAYER 2
                Radial gradient / multiply
            ================================================== */}

            <Box
              aria-hidden="true"
              sx={{
                position: "absolute",
                inset: 0,

                background:
                  "radial-gradient(ellipse 55% 40% at 55% 38%, rgba(255,255,255,0.42) 0%, transparent 65%)",

                mixBlendMode: "multiply",

                filter: {
                  xs: "blur(80px)",
                  md: "blur(115px)",
                },

                pointerEvents: "none",

                transform:
                  "translateZ(0)",

                willChange: "transform",

                zIndex: 0,
              }}
            />

            {/* ==================================================
                FILM GRAIN
            ================================================== */}

            <Box
              aria-hidden="true"
              sx={{
                position: "absolute",
                inset: 0,

                mixBlendMode: "overlay",

                opacity: 0.85,

                pointerEvents: "none",

                zIndex: 0,
              }}
            >
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                }}
              >
                <filter id="champagne-grain">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.7"
                    numOctaves="4"
                    stitchTiles="stitch"
                  />

                  <feColorMatrix
                    type="matrix"
                    values="
                      0.181 0.608 0.061 0 0.075
                      0.181 0.608 0.061 0 0.075
                      0.181 0.608 0.061 0 0.075
                      0     0     0     1 0
                    "
                  />
                </filter>

                <rect
                  width="100%"
                  height="100%"
                  filter="url(#champagne-grain)"
                />
              </svg>
            </Box>
          </>
        )}

        {/* ======================================================
            CONTENIDO
            SIEMPRE POR ENCIMA DEL FONDO
        ====================================================== */}

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >

          {/* ====================================================
              NAVBAR
          ==================================================== */}

          <Navbar
            mode={mode}
            setMode={setMode}
            t={t}
            lang={lang}
          />

          {/* ====================================================
              HERO
          ==================================================== */}

          <Hero
            mode={mode}
            setMode={setMode}
            t={t}
            lang={lang}
            setLang={setLang}
          />

          {/* ====================================================
              SECCIONES
          ==================================================== */}

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
            {sections.map(
              ({
                id,
                color,
                Component,
              }) => (
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

                    // =================================================
                    // FONDO DE LAS TARJETAS
                    // =================================================

                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "#121212"
                        : "rgba(255,255,255,0.70)",

                    // =================================================
                    // GLASS EFFECT EN MODO CLARO
                    // =================================================

                    backdropFilter:
                      theme.palette.mode === "light"
                        ? "blur(14px)"
                        : "none",

                    WebkitBackdropFilter:
                      theme.palette.mode === "light"
                        ? "blur(14px)"
                        : "none",

                    backgroundImage:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(rgba(255,255,255,0.03), rgba(255,255,255,0.03))"
                        : "linear-gradient(rgba(255,255,255,0.25), rgba(255,255,255,0.10))",

                    border:
                      `1.5px solid ${color}55`,

                    boxShadow:
                      theme.palette.mode === "light"
                        ? "0 8px 30px rgba(120,80,20,0.08)"
                        : "0 4px 12px rgba(0,0,0,0.4)",

                    scrollMarginTop:
                      scrollOffset,

                    transition:
                      "transform 0.25s ease, box-shadow 0.25s ease, border 0.25s ease",

                    willChange: "transform",

                    "&:hover": {
                      transform:
                        "translateY(-4px) scale(1.01)",

                      border:
                        `1.5px solid ${color}`,

                      boxShadow:
                        theme.palette.mode === "light"
                          ? "0 14px 35px rgba(120,80,20,0.12)"
                          : "0 10px 24px rgba(0,0,0,0.6)",
                    },
                  })}
                >
                  <Component t={t} />
                </Paper>
              )
            )}
          </Container>

          {/* ====================================================
              FOOTER
          ==================================================== */}

          <Footer t={t} />

          {/* ====================================================
              WHATSAPP
          ==================================================== */}

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

          {/* ====================================================
              BOTÓN TEMA
          ==================================================== */}

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
                    : theme.palette.primary.main,

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

          {/* ====================================================
              BOTÓN IDIOMA
          ==================================================== */}

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
                    : theme.palette.primary.main,

                color: "#fff",

                width: 52,
                height: 52,

                fontWeight: 800,
                fontSize: "1rem",
                letterSpacing: "1px",

                boxShadow: "none",

                transition:
                  "background-color 0.25s ease, transform 0.2s ease",

                willChange:
                  "background-color",

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
              {lang === "es"
                ? "EN"
                : "ES"}
            </Fab>
          </Tooltip>

          {/* ====================================================
              CHATBOT
          ==================================================== */}

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
