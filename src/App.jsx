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

  const sectionStyles = {
    mb: 4,
    p: { xs: 3, md: 6 },
    borderRadius: 3,
    scrollMarginTop: scrollOffset,
    borderLeft: "0",
    backgroundImage:
      "linear-gradient(to right, rgba(31,53,85,0.85) 0%, rgba(31,53,85,0.85) 6px, transparent 6px)",
    backdropFilter: "blur(3px)",
    transition: "all 0.35s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      backgroundImage:
        "linear-gradient(to right, rgba(45,80,120,1) 0%, rgba(45,80,120,1) 6px, transparent 6px)",
    },
  };

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
            { id: "about", Component: About },
            { id: "skills", Component: Skills },
            { id: "certifications", Component: Certifications },
            { id: "projects", Component: Projects },
            { id: "contact", Component: Contact },
          ].map(({ id, Component }) => (
            <Paper key={id} id={id} elevation={3} sx={sectionStyles}>
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
