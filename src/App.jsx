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
                background: {
                  default: "#f5f7fa",
                  paper: "#ffffff",
                },
                text: { primary: "#111" },
              }
            : {
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
                text: { primary: "#ffffff" },
              }),
        },
      }),
    [mode]
  );

  // 👇 ANIMACIÓN DE APARICIÓN DE SECCIONES
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll(".reveal-section");
    sections.forEach((sec) => observer.observe(sec));

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
          ].map(({ id, color, Component }) => (
            <Paper
              key={id}
              id={id}
              elevation={3}
              className="reveal-section"
              sx={{
                mb: 4,
                p: { xs: 3, md: 6 },
                borderRadius: "12px",
                borderLeft: `4px solid ${color}`, // 👈 borde delgado
                scrollMarginTop: scrollOffset,
                opacity: 0,
                transform: "translateX(-30px)",
                transition: "all 0.6s ease-out",

                "&.visible": {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              }}
            >
              <Component />
            </Paper>
          ))}
        </Container>

        <Footer />

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

        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
