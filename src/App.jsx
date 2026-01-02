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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          overflowX: "hidden",
          scrollBehavior: "smooth",
        }}
      >
        {/* NAVBAR */}
        <Navbar mode={mode} setMode={setMode} />

        {/* HERO */}
        <Hero mode={mode} setMode={setMode} />

        {/* CONTENIDO */}
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
              sx={{
                position: "relative",
                overflow: "hidden",

                mb: 4,
                p: { xs: 3, md: 6 },
                borderRadius: 3,
                scrollMarginTop: scrollOffset,
                backdropFilter: "blur(6px)",

                /* Línea izquierda inicial */
                borderLeft: `5px solid ${color}`,

                transition:
                  "transform 0.35s cubic-bezier(.4,0,.2,1), box-shadow 0.35s",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 14px 32px rgba(0,0,0,0.18)",
                },

                /* Activar animación del trazo */
                "&:hover .animated-border": {
                  strokeDashoffset: "0",
                },
              }}
            >
              {/* BORDE SVG ANIMADO */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
              >
                <rect
                  x="1"
                  y="1"
                  width="98"
                  height="98"
                  rx="6"
                  ry="6"
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  pathLength="1"
                  className="animated-border"
                  style={{
                    strokeDasharray: "0.22 0.78",
                    strokeDashoffset: "1",
                    transition:
                      "stroke-dashoffset 0.8s cubic-bezier(.4,0,.2,1)",
                  }}
                />
              </svg>

              <Component />
            </Paper>
          ))}
        </Container>

        {/* FOOTER */}
        <Footer />

        {/* BOTÓN WHATSAPP */}
        <Tooltip title="Chatea por WhatsApp" placement="left">
          <Fab
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

        {/* CHATBOT */}
        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
