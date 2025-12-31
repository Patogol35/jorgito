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
import { motion } from "framer-motion";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ChatBot from "./components/ChatBot.jsx";

const MotionPaper = motion(Paper);

/* 🎨 GRADIENTE NORMALIZADO Y SUAVE */
const softGradient = (color, isDark) =>
  isDark
    ? `linear-gradient(
        135deg,
        ${color}22 0%,
        transparent 70%
      )`
    : `linear-gradient(
        135deg,
        ${color}14 0%,
        #ffffff 75%
      )`;

/* ✨ GRADIENTE HOVER (UN POCO MÁS VISIBLE) */
const hoverGradient = (color, isDark) =>
  isDark
    ? `linear-gradient(
        135deg,
        ${color}30 0%,
        transparent 70%
      )`
    : `linear-gradient(
        135deg,
        ${color}22 0%,
        #ffffff 75%
      )`;

function App() {
  const storedMode = localStorage.getItem("themeMode") || "light";
  const [mode, setMode] = useState(storedMode);

  const scrollOffset = "90px";
  const isDark = mode === "dark";

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
        shape: {
          borderRadius: 6,
        },
      }),
    [mode]
  );

  /* 🎯 COLORES BASE (YA NORMALIZADOS) */
  const sections = [
    { id: "about", color: "#26a69a", Component: About },
    { id: "skills", color: "#fb8c00", Component: Skills },
    { id: "certifications", color: "#8e24aa", Component: Certifications },
    { id: "projects", color: "#1e88e5", Component: Projects },
    { id: "contact", color: "#e53935", Component: Contact },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* FONDO GENERAL */}
      <Box
        sx={{
          minHeight: "100vh",
          overflowX: "hidden",
          background: isDark
            ? "linear-gradient(180deg, #121212 0%, #0e0e0e 100%)"
            : "linear-gradient(180deg, #f5f7fa 0%, #edf1f7 100%)",
        }}
      >
        <Navbar mode={mode} setMode={setMode} />
        <Hero mode={mode} setMode={setMode} />

        <Container
          maxWidth="xl"
          sx={{
            py: 8,
            px: { xs: 2, sm: 4, md: 6, lg: 10 },
          }}
        >
          {sections.map(({ id, color, Component }) => (
            <MotionPaper
              key={id}
              id={id}
              elevation={0}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              sx={{
                mb: 6,
                p: { xs: 3, md: 5 },
                scrollMarginTop: scrollOffset,

                /* 🎨 FONDO ELEGANTE */
                background: softGradient(color, isDark),

                /* BORDE FINO Y CONSISTENTE */
                border: `1px solid ${color}55`,
                borderRadius: 6,

                /* SOMBRA SUAVE */
                boxShadow: isDark
                  ? "0 8px 20px rgba(0,0,0,0.45)"
                  : "0 8px 20px rgba(0,0,0,0.08)",

                transition:
                  "transform 0.35s ease, box-shadow 0.35s ease, background 0.35s ease",

                "&:hover": {
                  transform: "translateY(-4px)",
                  background: hoverGradient(color, isDark),
                  boxShadow: isDark
                    ? "0 14px 32px rgba(0,0,0,0.65)"
                    : "0 14px 32px rgba(0,0,0,0.14)",
                },
              }}
            >
              <Component />
            </MotionPaper>
          ))}
        </Container>

        <Footer />

        {/* BOTÓN WHATSAPP */}
        <Tooltip title="Chatea por WhatsApp" placement="left">
          <Fab
            aria-label="whatsapp"
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              zIndex: 1000,
              bgcolor: "#25D366",
              boxShadow: "0 6px 20px rgba(37,211,102,0.45)",
              "&:hover": { bgcolor: "#1ebe5c" },
            }}
            onClick={() =>
              window.open("https://wa.me/593997979099", "_blank")
            }
          >
            <WhatsAppIcon sx={{ fontSize: 28, color: "#fff" }} />
          </Fab>
        </Tooltip>

        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
