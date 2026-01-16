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
                  default: "#dbeafe",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#0f172a",
                  secondary: "#334155",
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

  // 🎨 GRADIENTES SUAVES POR SECCIÓN
  const sectionGradients = {
    about:
      mode === "light"
        ? "linear-gradient(135deg, rgba(46,125,50,0.08), rgba(219,234,254,0.6))"
        : "linear-gradient(135deg, rgba(46,125,50,0.18), rgba(30,41,59,0.8))",

    skills:
      mode === "light"
        ? "linear-gradient(135deg, rgba(251,140,0,0.08), rgba(248,250,252,0.9))"
        : "linear-gradient(135deg, rgba(251,140,0,0.18), rgba(30,41,59,0.85))",

    certifications:
      mode === "light"
        ? "linear-gradient(135deg, rgba(142,36,170,0.08), rgba(219,234,254,0.6))"
        : "linear-gradient(135deg, rgba(142,36,170,0.2), rgba(30,41,59,0.85))",

    projects:
      mode === "light"
        ? "linear-gradient(135deg, rgba(25,118,210,0.08), rgba(241,245,249,0.9))"
        : "linear-gradient(135deg, rgba(25,118,210,0.2), rgba(30,41,59,0.85))",

    contact:
      mode === "light"
        ? "linear-gradient(135deg, rgba(211,47,47,0.08), rgba(254,242,242,0.9))"
        : "linear-gradient(135deg, rgba(211,47,47,0.18), rgba(30,41,59,0.85))",

    form:
      mode === "light"
        ? "linear-gradient(135deg, rgba(0,137,123,0.08), rgba(224,242,241,0.9))"
        : "linear-gradient(135deg, rgba(0,137,123,0.2), rgba(30,41,59,0.85))",
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* FONDO GENERAL */}
      <Box
        sx={{
          minHeight: "100vh",
          overflowX: "hidden",
          background:
            mode === "light"
              ? "linear-gradient(135deg, #dbeafe 0%, #c7ddf5 40%, #b6d0ee 70%, #aac6e8 100%)"
              : "none",
        }}
      >
        <Navbar mode={mode} setMode={setMode} />
        <Hero mode={mode} setMode={setMode} />

        <Container
          maxWidth="lg"
          disableGutters
          sx={{ py: 6, px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 } }}
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
              elevation={2}
              sx={{
                mb: 4,
                p: { xs: 3, md: 6 },
                borderRadius: 3,
                borderLeft: `4px solid ${color}`,
                scrollMarginTop: scrollOffset,
                background: sectionGradients[id],
                backdropFilter: "blur(3px)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
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
            <WhatsAppIcon sx={{ color: "#fff", fontSize: 32 }} />
          </Fab>
        </Tooltip>

        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
