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

// Hook personalizado para detectar visibilidad
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

        {/* CONTENIDO PRINCIPAL */}
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
            const [ref, isIntersecting] = useOnScreen({ threshold: 0.1 });

            return (
              <Paper
                ref={ref}
                key={id}
                id={id}
                elevation={3}
                sx={{
                  mb: 4,
                  p: { xs: 3, md: 6 },
                  borderRadius: 3,
                  position: "relative",
                  scrollMarginTop: scrollOffset,
                  overflow: "hidden", // 👈 esencial para respetar el radio durante la animación
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                {/* ✨ BORDE IZQUIERDO ANIMADO: aparece de arriba a abajo + curvado */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "6px",
                    height: "100%",
                    backgroundColor: color,
                    borderRadius: "3px 0 0 3px", // 👈 curvatura idéntica a la del Paper
                    transformOrigin: "top",
                    transform: isIntersecting ? "scaleY(1)" : "scaleY(0)",
                    transition: "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    zIndex: 0,
                  }}
                />
                {/* Contenido siempre visible */}
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Component />
                </Box>
              </Paper>
            );
          })}
        </Container>

        {/* FOOTER */}
        <Footer />

        {/* BOTÓN FLOTANTE DE WHATSAPP */}
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
