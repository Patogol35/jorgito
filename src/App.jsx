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
  const [active, setActive] = useState(null);
  const observers = useRef([]);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    observers.current.forEach((obs) => obs.disconnect());
    observers.current = [];

    document.querySelectorAll("[data-section]").forEach((el) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(el.dataset.section);
          }
        },
        { threshold: 0.6 }
      );
      obs.observe(el);
      observers.current.push(obs);
    });

    return () => observers.current.forEach((o) => o.disconnect());
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "light" ? "#eef2f7" : "#0b0b0b",
          },
        },
      }),
    [mode]
  );

  const sections = [
    { id: "about", color: "#2e7d32", Component: About },
    { id: "skills", color: "#fb8c00", Component: Skills },
    { id: "certifications", color: "#8e24aa", Component: Certifications },
    { id: "projects", color: "#1976d2", Component: Projects },
    { id: "contact", color: "#d32f2f", Component: Contact },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          scrollSnapType: "y mandatory",
          background:
            mode === "light"
              ? "linear-gradient(120deg, #fdfbfb, #ebedee)"
              : "linear-gradient(120deg, #0f0f0f, #1a1a1a)",
          backgroundSize: "200% 200%",
          animation: "bgMove 12s ease infinite",
          "@keyframes bgMove": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        }}
      >
        <Navbar mode={mode} setMode={setMode} />
        <Hero mode={mode} setMode={setMode} />

        <Container maxWidth="lg" sx={{ py: 8 }}>
          {sections.map(({ id, color, Component }, index) => (
            <Box key={id}>
              {/* Separador visual */}
              {index !== 0 && (
                <Box
                  sx={{
                    height: 40,
                    background:
                      mode === "light"
                        ? "linear-gradient(135deg, transparent 75%, #00000008 75%)"
                        : "linear-gradient(135deg, transparent 75%, #ffffff10 75%)",
                  }}
                />
              )}

              <Paper
                data-section={id}
                scrollSnapAlign="start"
                elevation={0}
                sx={{
                  mb: 8,
                  p: { xs: 4, md: 7 },
                  borderRadius: 4,

                  /* GLASSMORPHISM */
                  background:
                    mode === "light"
                      ? "rgba(255,255,255,0.75)"
                      : "rgba(30,30,30,0.75)",
                  backdropFilter: "blur(14px)",

                  border: `1px solid ${color}55`,

                  boxShadow:
                    active === id
                      ? `0 0 0 2px ${color}, 0 0 40px ${color}88`
                      : mode === "light"
                      ? "0 15px 40px rgba(0,0,0,0.15)"
                      : "0 20px 60px rgba(0,0,0,0.9)",

                  transform: active === id ? "scale(1.02)" : "scale(1)",
                  transition: "all 0.35s ease",

                  "&:hover": {
                    transform: "scale(1.04)",
                    boxShadow: `0 25px 70px ${color}88`,
                  },
                }}
              >
                <Component />
              </Paper>
            </Box>
          ))}
        </Container>

        <Footer />

        <Tooltip title="WhatsApp" placement="left">
          <Fab
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              bgcolor: "#25D366",
              "&:hover": { bgcolor: "#1ebe5c" },
            }}
            onClick={() =>
              window.open("https://wa.me/593997979099", "_blank")
            }
          >
            <WhatsAppIcon sx={{ color: "#fff" }} />
          </Fab>
        </Tooltip>

        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
