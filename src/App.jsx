import { useState, useMemo, useEffect, useRef } from "react";
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

function App() {
  const storedMode = localStorage.getItem("themeMode") || "light";
  const [mode, setMode] = useState(storedMode);
  const scrollOffset = "80px";
  const prefersReducedMotion = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

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
      }),
    [mode]
  );

  /* =========================
     ANIMACIÓN POR SCROLL
  ========================= */
  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
          ].map(({ id, color, Component }, index) => (
            <Paper
              key={id}
              id={id}
              className="reveal"
              elevation={0}
              sx={{
                mb: 4,
                p: { xs: 3, md: 6 },
                borderRadius: 3,
                position: "relative",
                scrollMarginTop: scrollOffset,
                overflow: "hidden",

                /* Estado inicial */
                opacity: 0,
                transform: "translateY(32px)",
                transition: prefersReducedMotion.current
                  ? "none"
                  : `opacity 0.6s ease ${index * 0.12}s,
                     transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s,
                     box-shadow 0.3s ease`,

                "&.visible": {
                  opacity: 1,
                  transform: "translateY(0)",
                },

                /* Sombra premium */
                boxShadow:
                  mode === "light"
                    ? "0 10px 24px rgba(0,0,0,0.06)"
                    : "0 0 0 1px rgba(255,255,255,0.04), 0 16px 30px rgba(0,0,0,0.85)",

                "&:hover": {
                  transform: "translateY(-4px) scale(1.01)",
                  boxShadow:
                    mode === "light"
                      ? "0 20px 40px rgba(0,0,0,0.12)"
                      : "0 24px 44px rgba(0,0,0,0.9)",
                },

                /* Borde izquierdo elegante */
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "6px",
                  height: "100%",
                  background: `linear-gradient(180deg, ${color}, transparent)`,
                  opacity: 0.9,
                },
              }}
            >
              <Component />
            </Paper>
          ))}
        </Container>

        <Footer />

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
              animation: prefersReducedMotion.current
                ? "none"
                : "pulse 2.6s ease-in-out infinite",
              "&:hover": { bgcolor: "#1ebe5c" },

              "@keyframes pulse": {
                "0%, 100%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.08)" },
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
