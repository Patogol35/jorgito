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
import { alpha } from "@mui/material/styles";

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
          background: {
            // 🎯 Fondo general
            default: mode === "dark" ? "#0b0b0b" : "#ffffff",
            paper: mode === "dark" ? "#121212" : "#ffffff",
          },
          text: {
            primary: mode === "dark" ? "#ffffff" : "#111111",
          },
        },
      }),
    [mode]
  );

  const CARD_BG_ALPHA = 0.035;

  const sections = [
    { id: "about", color: "#2e7d32", Component: About },
    { id: "skills", color: "#fb8c00", Component: Skills },
    { id: "certifications", color: "#C0A660", Component: Certifications },
    { id: "projects", color: "#1976d2", Component: Projects },
    { id: "contact", color: "#d32f2f", Component: Contact },
    { id: "form", color: "#00897b", Component: Form },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ minHeight: "100vh", overflowX: "hidden" }}>
        <Navbar mode={mode} setMode={setMode} />
        <Hero mode={mode} setMode={setMode} />

        <Container maxWidth="lg" disableGutters sx={{ py: 6 }}>
          {sections.map(({ id, color, Component }) => (
            <Paper
              key={id}
              id={id}
              elevation={0}
              sx={{
                mb: 4,
                p: { xs: 3, md: 6 },
                borderRadius: 3,

                /* 🎨 Cards claramente más claras */
                backgroundColor:
                  mode === "light"
                    ? alpha(color, CARD_BG_ALPHA)
                    : "#242424",

                /* 🧠 Separación visual PRO */
                boxShadow:
                  mode === "dark"
                    ? "inset 0 0 0 1px rgba(255,255,255,0.06)"
                    : "none",

                border: `1.5px solid ${
                  mode === "light"
                    ? "rgba(0,0,0,0.85)"
                    : "rgba(255,255,255,0.85)"
                }`,
                borderLeft: `5px solid ${color}`,

                scrollMarginTop: scrollOffset,

                transition:
                  "border-left-width 0.25s ease, box-shadow 0.25s ease",

                "&:hover": {
                  borderLeftWidth: "7px",
                  boxShadow:
                    mode === "dark"
                      ? "inset 0 0 0 1px rgba(255,255,255,0.1), 0 12px 28px rgba(0,0,0,0.9)"
                      : "0 14px 32px rgba(0,0,0,0.16)",
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
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
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
