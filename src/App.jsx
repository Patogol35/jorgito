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

  // --------------------------------------------------
  // PERSISTENCIA
  // --------------------------------------------------

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  // --------------------------------------------------
  // RESTAURAR SECCIÓN DESPUÉS DE REDIMENSIONAR
  // --------------------------------------------------

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

  const t = translations[lang] || translations["es"];

  // --------------------------------------------------
  // THEME
  // --------------------------------------------------

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
                ? "#080A0D"
                : "#E7ECF2",

            paper:
              mode === "dark"
                ? "#171B22"
                : "#FFFFFF",
          },

          text: {
            primary:
              mode === "dark"
                ? "#FFFFFF"
                : "#111827",
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

  // --------------------------------------------------
  // SECCIONES
  // --------------------------------------------------

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

      {/* --------------------------------------------------
          FONDO GENERAL
      -------------------------------------------------- */}

      <Box
        sx={(theme) => ({
          minHeight: "100vh",
          overflowX: "hidden",

          background:
            theme.palette.mode === "dark"
              ? "#080A0D"
              : `
                linear-gradient(
                  180deg,
                  #E7ECF2 0%,
                  #F3F5F8 50%,
                  #E7ECF2 100%
                )
              `,
        })}
      >

        {/* NAVBAR */}

        <Navbar
          mode={mode}
          setMode={setMode}
          t={t}
          lang={lang}
        />

        {/* HERO */}

        <Hero
          mode={mode}
          setMode={setMode}
          t={t}
          lang={lang}
          setLang={setLang}
        />

        {/* --------------------------------------------------
            SECCIONES
        -------------------------------------------------- */}

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
            ({ id, color, Component }) => (

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

                  // --------------------------------------------------
                  // FONDO DE LAS CARDS
                  // --------------------------------------------------

                  background:
                    theme.palette.mode === "dark"
                      ? `
                        linear-gradient(
                          145deg,
                          #202630 0%,
                          #171B22 100%
                        )
                      `
                      : `
                        linear-gradient(
                          145deg,
                          #FFFFFF 0%,
                          #E8EEF5 100%
                        )
                      `,

                  // --------------------------------------------------
                  // BORDE DE COLOR SEGÚN LA SECCIÓN
                  // --------------------------------------------------

                  border:
                    `1.5px solid ${color}99`,

                  // --------------------------------------------------
                  // SOMBRA
                  // --------------------------------------------------

                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 12px 35px rgba(0, 0, 0, 0.55)"
                      : "0 10px 30px rgba(15, 23, 42, 0.12)",

                  scrollMarginTop:
                    scrollOffset,

                  // --------------------------------------------------
                  // TRANSICIÓN
                  // --------------------------------------------------

                  transition:
                    "transform 0.25s ease, box-shadow 0.25s ease, border 0.25s ease",

                  willChange: "transform",

                  // --------------------------------------------------
                  // HOVER
                  // --------------------------------------------------

                  "&:hover": {
                    transform:
                      "translateY(-4px) scale(1.01)",

                    border:
                      `1.5px solid ${color}`,

                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 18px 45px rgba(0, 0, 0, 0.65)"
                        : "0 15px 35px rgba(15, 23, 42, 0.16)",
                  },
                })}
              >

                <Component t={t} />

              </Paper>
            )
          )}

        </Container>

        {/* FOOTER */}

        <Footer t={t} />

        {/* --------------------------------------------------
            WHATSAPP
        -------------------------------------------------- */}

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

        {/* --------------------------------------------------
            BOTÓN TEMA
        -------------------------------------------------- */}

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
            {mode === "light"
              ? <Brightness4 />
              : <Brightness7 />
            }
          </Fab>
        </Tooltip>

        {/* --------------------------------------------------
            BOTÓN IDIOMA
        -------------------------------------------------- */}

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
              : "ES"
            }
          </Fab>
        </Tooltip>

        {/* CHATBOT */}

        <ChatBot
          t={t}
          lang={lang}
        />

      </Box>
    </ThemeProvider>
  );
}

export default App;
