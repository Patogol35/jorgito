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

  const sectionStyles = (color) => ({
    mb: 6,
    p: { xs: 3, md: 6 },
    borderRadius: 4,
    scrollMarginTop: scrollOffset,
    position: "relative",
    overflow: "hidden",
    transition: "transform .45s cubic-bezier(.22,1,.36,1)",
    backdropFilter: "blur(4px)",

    // Borde animado
    "&:before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "0px", // inicia invisible
      backgroundColor: color,
      transition: "width .45s cubic-bezier(.22,1,.36,1)",
      borderRadius: "0 6px 6px 0",
    },

    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 36px rgba(0,0,0,0.18)",
      "&:before": {
        width: "6px", // se expande suavemente 😎
      },
    },
  });

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
            py: 8,
            px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 },
          }}
        >
          {[
            { id: "about", color: "rgba(76, 175, 80, 1)", Component: About },
            { id: "skills", color: "rgba(255, 152, 0, 1)", Component: Skills },
            { id: "certifications", color: "rgba(156, 39, 176, 1)", Component: Certifications },
            { id: "projects", color: "rgba(25, 118, 210, 1)", Component: Projects },
            { id: "contact", color: "rgba(244, 67, 54, 1)", Component: Contact },
          ].map(({ id, color, Component }) => (
            <Paper key={id} id={id} elevation={0} sx={sectionStyles(color)}>
              <Component />
            </Paper>
          ))}
        </Container>

        <Footer />

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

        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
