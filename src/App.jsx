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

  // Persistencia del tema
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  // Persistencia del idioma
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  // Restaurar sección después de cambiar orientación/tamaño
  useEffect(() => {
    const handleBefore = () => {
      const sections = document.querySelectorAll("section, [id]");

      for (let sec of sections) {
        const rect = sec.getBoundingClientRect();

        if (
          rect.top >= 0 &&
          rect.top < window.innerHeight / 2
        ) {
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

  // =========================================================
  // 🎨 TEMA
  // =========================================================

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
                : "#F8FAFC",

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

  // =========================================================
  // 📌 SECCIONES
  // =========================================================

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

      // 🔥 NUEVO COLOR PARA CERTIFICACIONES
      {
        id: "certifications",
        color: "#64748B",
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
          🌌 FONDO GENERAL
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

        {/* =====================================================
            📦 CARDS / SECCIONES
        ====================================================== */}

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
          {sections.map(({ id, color, Component }) => {
            // =================================================
            // 🎨 FONDOS POR SECCIÓN
            // =================================================

            const darkBackgrounds = {
              about: `
                radial-gradient(
                  circle at 10% 0%,
                  rgba(46,125,50,0.25),
                  transparent 35%
                ),
                linear-gradient(
                  135deg,
                  #0c2117 0%,
                  #102c20 45%,
                  #111b1a 100%
                )
              `,

              projects: `
                radial-gradient(
                  circle at 10% 0%,
                  rgba(25,118,210,0.28),
                  transparent 35%
                ),
                linear-gradient(
                  135deg,
                  #0b1b32 0%,
                  #102b50 50%,
                  #151b30 100%
                )
              `,

              skills: `
                radial-gradient(
                  circle at 10% 0%,
                  rgba(251,140,0,0.25),
                  transparent 35%
                ),
                linear-gradient(
                  135deg,
                  #291b0c 0%,
                  #38240d 48%,
                  #211820 100%
                )
              `,

              certifications: `
                radial-gradient(
                  circle at 10% 0%,
                  rgba(100,116,139,0.30),
                  transparent 35%
                ),
                linear-gradient(
                  135deg,
                  #17202b 0%,
                  #263342 50%,
                  #1b2530 100%
                )
              `,

              contact: `
                radial-gradient(
                  circle at 10% 0%,
                  rgba(211,47,47,0.25),
                  transparent 35%
                ),
                linear-gradient(
                  135deg,
                  #2b1015 0%,
                  #3a161d 50%,
                  #1d1820 100%
                )
              `,

              form: `
                radial-gradient(
                  circle at 10% 0%,
                  rgba(0,137,123,0.27),
                  transparent 35%
                ),
                linear-gradient(
                  135deg,
                  #092521 0%,
                  #0d3934 50%,
                  #12252b 100%
                )
              `,
            };

            // =================================================
            // ☀️ FONDOS PARA MODO CLARO
            // =================================================

            const lightBackgrounds = {
              about: `
                radial-gradient(
                  circle at 10% 0%,
                  rgba(46,125,50,0.12),
                  transparent 35%
                ),
                linear-gradient(
                  135deg,
                  #f0f9f2 0%,
                  #e3f2e7 50%,
                  #edf4f1 100%
                )
              `,

              projects: `
                radial-gradient(
                  circle at 10% 0%,
                  rgba(25,118,210,0.12),
                  transparent 35%
                ),
                linear-gradient(
                  135deg,
                  #eef5ff 0%,
                  #e1edfc 50%,
                  #f0f0fa 100%
                )
              `,

              skills: `
                radial-gradient(
                  circle at 10% 0%,
                  rgba(251,140,0,0.13),
                  transparent 35%
                ),
                linear-gradient(
                  135deg,
                  #fff7eb 0%,
                  #ffedd5 50%,
                  #f8f0ed 100%
                )
              `,

              certifications: `
                radial-gradient(
                  circle at 10% 0%,
                  rgba(100,116,139,0.14),
                  transparent 35%
                ),
                linear-gradient(
                  135deg,
                  #f1f5f9 0%,
                  #e2e8f0 50%,
                  #edf1f5 100%
                )
              `,

              contact: `
                radial-gradient(
                  circle at 10% 0%,
                  rgba(211,47,47,0.12),
                  transparent 35%
                ),
                linear-gradient(
                  135deg,
                  #fff1f2 0%,
                  #ffe4e6 50%,
                  #f5edf0 100%
                )
              `,

              form: `
                radial-gradient(
                  circle at 10% 0%,
                  rgba(0,137,123,0.13),
                  transparent 35%
                ),
                linear-gradient(
                  135deg,
                  #ecfdf9 0%,
                  #dff5f0 50%,
                  #edf5f5 100%
                )
              `,
            };

            return (
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
                  // 🎨 FONDO AUTOMÁTICO SEGÚN SECCIÓN Y TEMA
                  // =================================================

                  background:
                    theme.palette.mode === "dark"
                      ? darkBackgrounds[id]
                      : lightBackgrounds[id],

                  // =================================================
                  // ✨ BORDE
                  // =================================================

                  border: `1px solid ${color}65`,

                  // =================================================
                  // 🌑 SOMBRA
                  // =================================================

                  boxShadow:
                    theme.palette.mode === "dark"
                      ? `
                        0 10px 30px rgba(0,0,0,0.40),
                        inset 0 1px 0 rgba(255,255,255,0.035)
                      `
                      : `
                        0 10px 30px rgba(15,23,42,0.08),
                        inset 0 1px 0 rgba(255,255,255,0.85)
                      `,

                  scrollMarginTop: scrollOffset,

                  transition:
                    "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",

                  willChange: "transform",

                  // =================================================
                  // 🖱️ HOVER
                  // =================================================

                  "&:hover": {
                    transform:
                      "translateY(-4px) scale(1.01)",

                    border:
                      `1px solid ${color}`,

                    boxShadow:
                      theme.palette.mode === "dark"
                        ? `
                          0 16px 40px rgba(0,0,0,0.55),
                          0 0 25px ${color}20
                        `
                        : `
                          0 16px 40px rgba(15,23,42,0.12),
                          0 0 20px ${color}18
                        `,
                  },
                })}
              >
                <Component t={t} />
              </Paper>
            );
          })}
        </Container>

        <Footer t={t} />

        {/* =====================================================
            📱 WHATSAPP
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
            🌙 CAMBIAR TEMA
        ====================================================== */}

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

        {/* =====================================================
            🌎 IDIOMA
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
            {lang === "es" ? "EN" : "ES"}
          </Fab>
        </Tooltip>

        <ChatBot
          t={t}
          lang={lang}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
