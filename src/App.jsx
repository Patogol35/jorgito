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
import Form from "./components/Form.jsx";

function App() {
  const storedMode = localStorage.getItem("themeMode") || "dark";
  const [mode, setMode] = useState(storedMode);
  const scrollOffset = "90px";

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
                  default: "#eef2f7", // 👈 fondo claro elegante (NO blanco)
                  paper: "#ffffff",
                },
                text: {
                  primary: "#1a1a1a",
                  secondary: "#4b5563",
                },
              }
            : {
                background: {
                  default: "#0f172a",
                  paper: "#111827",
                },
                text: {
                  primary: "#f9fafb",
                  secondary: "#9ca3af",
                },
              }),
        },
        shape: {
          borderRadius: 14,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ minHeight: "100vh", overflowX: "hidden" }}>
        {/* NAVBAR */}
        <Navbar mode={mode} setMode={setMode} />

        {/* HERO */}
        <Hero mode={mode} setMode={setMode} />

        {/* CONTENIDO */}
        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            py: 8,
            px: { xs: 2, sm: 4, md: 6, lg: 8 },
          }}
        >
          {[
            { id: "about", color: "#2e7d32", Component: About },
            { id: "skills", color: "#fb8c00", Component: Skills },
            { id: "certifications", color: "#8e24aa", Component: Certifications },
            { id: "projects", color: "#1976d2", Component: Projects },
            { id: "contact", color: "#d32f2f", Component: Contact },
            { id: "form", color: "#00897b", Component: Form },
          ].map(({ id, color, Component }) => (
            <Paper
              key={id}
              id={id}
              elevation={0}
              sx={{
                mb: 5,
                p: { xs: 3, md: 6 },
                borderRadius: 4,
                background:
                  mode === "light"
                    ? "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)"
                    : "linear-gradient(180deg, #111827 0%, #0f172a 100%)",
                borderLeft: `6px solid ${color}`, // 👈 línea de color intacta
                scrollMarginTop: scrollOffset,
                boxShadow:
                  mode === "light"
                    ? "0 12px 30px rgba(0,0,0,0.08)"
                    : "0 12px 30px rgba(0,0,0,0.5)",
                transition: "all 0.35s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow:
                    mode === "light"
                      ? "0 18px 40px rgba(0,0,0,0.12)"
                      : "0 18px 40px rgba(0,0,0,0.7)",
                },
              }}
            >
              <Component />
            </Paper>
          ))}
        </Container>

        {/* FOOTER */}
        <Footer />

        {/* BOTÓN WHATSAPP */}
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
            <WhatsAppIcon sx={{ fontSize: 30, color: "#fff" }} />
          </Fab>
        </Tooltip>

        {/* CHATBOT */}
        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
