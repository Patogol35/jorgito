// src/App.jsx
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

// Componentes
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ChatBot from "./components/ChatBot.jsx";

// Hook
import useOnScreen from "./hooks/useOnScreen";

function App() {
  const storedMode = localStorage.getItem("themeMode") || "light";
  const [mode, setMode] = useState(storedMode);
  const scrollOffset = "80px";

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#f5f7fa", paper: "#ffffff" },
                text: { primary: "#111" },
              }
            : {
                background: { default: "#121212", paper: "#1e1e1e" },
                text: { primary: "#ffffff" },
              }),
        },
        typography: {
          fontFamily: "Inter, Roboto, sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ minHeight: "100vh", overflowX: "hidden" }}>
        <Navbar mode={mode} setMode={setMode} />
        <Hero mode={mode} setMode={setMode} />

        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            py: 6,
            px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 },
          }}
        >
          {[
            { id: "about", color: "#2e7d32", Component: About },
            { id: "skills", color: "#fb8c00", Component: Skills },
            { id: "certifications", color: "#8e24aa", Component: Certifications },
            { id: "projects", color: "#1976d2", Component: Projects },
            { id: "contact", color: "#d32f2f", Component: Contact },
          ].map(({ id, color, Component }) => {
            const [ref, isIntersecting] = useOnScreen({
              threshold: 0.25,
            });

            // 🔒 animar SOLO UNA VEZ
            const [hasAnimated, setHasAnimated] = useState(false);

            useEffect(() => {
              if (isIntersecting && !hasAnimated) {
                setHasAnimated(true);
              }
            }, [isIntersecting, hasAnimated]);

            return (
              <Paper
                ref={ref}
                key={id}
                id={id}
                elevation={6}
                sx={{
                  mb: 6,
                  p: { xs: 3, md: 6 },
                  borderRadius: 4,
                  position: "relative",
                  scrollMarginTop: scrollOffset,
                  overflow: "hidden",

                  /* ⛔ NO se toca el tamaño */
                  display: "block",

                  background:
                    mode === "light"
                      ? "linear-gradient(180deg, #ffffff, #f9fafc)"
                      : "linear-gradient(180deg, #1e1e1e, #232323)",

                  transition: "all 0.5s ease",
                  transform: hasAnimated
                    ? "translateY(0)"
                    : "translateY(24px)",
                  opacity: hasAnimated ? 1 : 0,

                  boxShadow:
                    mode === "light"
                      ? "0 8px 24px rgba(0,0,0,0.08)"
                      : "0 8px 24px rgba(0,0,0,0.5)",

                  "&:hover": {
                    transform: "translateY(-6px) scale(1.01)",
                    boxShadow:
                      mode === "light"
                        ? "0 20px 40px rgba(0,0,0,0.15)"
                        : "0 20px 40px rgba(0,0,0,0.7)",
                  },
                }}
              >
                {/* BORDE IZQUIERDO */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "6px",
                    height: "100%",
                    background: `linear-gradient(180deg, ${color}, transparent)`,
                    borderRadius: "4px 0 0 4px",
                    transformOrigin: "top",
                    transform: hasAnimated ? "scaleY(1)" : "scaleY(0)",
                    transition:
                      "transform 1s cubic-bezier(0.25,0.46,0.45,0.94)",
                    boxShadow: hasAnimated
                      ? `0 0 10px ${color}`
                      : "none",
                    zIndex: 0,
                  }}
                />

                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Component />
                </Box>
              </Paper>
            );
          })}
        </Container>

        <Footer />

        <Tooltip title="Chatea por WhatsApp" placement="left">
          <Fab
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              bgcolor: "#25D366",
              zIndex: 1000,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#1ebe5c",
                transform: "scale(1.05)",
                boxShadow: "0 0 20px rgba(37,211,102,0.6)",
              },
            }}
            onClick={() =>
              window.open("https://wa.me/593997979099", "_blank")
            }
          >
            <WhatsAppIcon sx={{ fontSize: 32, color: "#fff" }} />
          </Fab>
        </Tooltip>

        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
