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
                text: {
                  primary: "#111",
                },
              }
            : {
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
                text: {
                  primary: "#ffffff",
                },
              }),
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
            py: { xs: 6, md: 10 },
            px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 },
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

                /* FONDO ELEGANTE */
                backgroundImage:
                  mode === "light"
                    ? "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)"
                    : "linear-gradient(180deg, #1e1e1e 0%, #181818 100%)",

                /* LÍNEA DE COLOR (SE MANTIENE) */
                borderLeft: `5px solid ${color}`,

                /* BORDE SUAVE */
                border:
                  mode === "light"
                    ? "1px solid rgba(0,0,0,0.06)"
                    : "1px solid rgba(255,255,255,0.06)",

                scrollMarginTop: scrollOffset,

                /* SOMBRA */
                boxShadow:
                  mode === "light"
                    ? "0 10px 30px rgba(0,0,0,0.08)"
                    : "0 10px 30px rgba(0,0,0,0.45)",

                transition: "all 0.35s ease",

                "&:hover": {
                  transform: "translateY(-6px) scale(1.01)",
                  boxShadow:
                    mode === "light"
                      ? "0 20px 40px rgba(0,0,0,0.12)"
                      : "0 20px 40px rgba(0,0,0,0.6)",
                },

                /* BARRA SUPERIOR DECORATIVA */
                "&::before": {
                  content: '""',
                  display: "block",
                  width: "60px",
                  height: "4px",
                  borderRadius: "2px",
                  backgroundColor: color,
                  marginBottom: "24px",
                },

                /* ANIMACIÓN DE ENTRADA */
                animation: "fadeUp 0.6s ease both",

                "@keyframes fadeUp": {
                  from: {
                    opacity: 0,
                    transform: "translateY(20px)",
                  },
                  to: {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              <Component />
            </Paper>
          ))}
        </Container>

        {/* FOOTER */}
        <Footer />

        {/* BOTÓN FLOTANTE WHATSAPP */}
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

        {/* CHATBOT IA PERSONAL */}
        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
