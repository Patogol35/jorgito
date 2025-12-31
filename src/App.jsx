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

/* 👉 FONDO SUAVE POR COLOR (ELEGANTE) */
const softGradient = (color, isDark) =>
  isDark
    ? `linear-gradient(135deg, ${color}22, transparent)`
    : `linear-gradient(135deg, ${color}18, #ffffff)`;

function App() {
  const storedMode = localStorage.getItem("themeMode") || "light";
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

  const sections = [
    { id: "about", color: "#00bfa5", Component: About },
    { id: "skills", color: "#ff9800", Component: Skills },
    { id: "certifications", color: "#ab47bc", Component: Certifications },
    { id: "projects", color: "#42a5f5", Component: Projects },
    { id: "contact", color: "#ef5350", Component: Contact },
  ];

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
              ? "linear-gradient(180deg, #f5f7fa 0%, #edf1f7 100%)"
              : "linear-gradient(180deg, #121212 0%, #0e0e0e 100%)",
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
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              sx={{
                mb: 6,
                p: { xs: 3, md: 5 },
                scrollMarginTop: scrollOffset,

                /* 🎨 FONDO CON COLOR SUAVE */
                background: softGradient(color, mode === "dark"),

                /* BORDE FINO */
                border: `1.5px solid ${color}`,
                borderRadius: 6,

                /* SOMBRA SOBRIA */
                boxShadow:
                  mode === "light"
                    ? "0 8px 22px rgba(0,0,0,0.08)"
                    : "0 8px 22px rgba(0,0,0,0.5)",

                transition:
                  "transform 0.25s ease, box-shadow 0.25s ease",

                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow:
                    mode === "light"
                      ? "0 12px 30px rgba(0,0,0,0.12)"
                      : "0 12px 30px rgba(0,0,0,0.7)",
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
