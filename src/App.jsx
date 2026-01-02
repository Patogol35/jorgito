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
          {sections.map(({ id, color, Component }) => (
            <Paper
              key={id}
              id={id}
              elevation={2}
              sx={{
                mb: 4,
                p: { xs: 3, md: 6 },
                borderRadius: 3,
                position: "relative",
                scrollMarginTop: scrollOffset,
                overflow: "hidden",

                /* SOMBRA BASE */
                boxShadow:
                  mode === "light"
                    ? "0 10px 26px rgba(0,0,0,0.06)"
                    : "0 10px 26px rgba(0,0,0,0.55)",

                transition:
                  "transform 0.3s ease, box-shadow 0.3s ease",

                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow:
                    mode === "light"
                      ? "0 20px 40px rgba(0,0,0,0.14)"
                      : "0 20px 40px rgba(0,0,0,0.8)",
                },

                /* 🎨 BORDE + GLOW */
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "9px",
                  height: "100%",
                  background: `linear-gradient(180deg, ${color}, transparent)`,
                  borderRadius: "3px 0 0 3px",
                  animation: "borderGrow 0.9s ease forwards",
                  zIndex: 0,
                },

                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "9px",
                  height: "100%",
                  background: color,
                  opacity: mode === "light" ? 0.25 : 0.4,
                  filter: "blur(10px)",
                  zIndex: 0,
                },

                "@keyframes borderGrow": {
                  from: {
                    transform: "scaleY(0)",
                    transformOrigin: "top",
                  },
                  to: {
                    transform: "scaleY(1)",
                  },
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Component />
              </Box>
            </Paper>
          ))}
        </Container>

        <Footer />

        {/* WHATSAPP */}
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
