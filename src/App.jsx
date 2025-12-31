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

function App() {
  const storedMode = localStorage.getItem("themeMode") || "light";
  const [mode, setMode] = useState(storedMode);
  const isDark = mode === "dark";

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(isDark
            ? {
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
                text: { primary: "#fff" },
              }
            : {
                background: {
                  default: "#f5f7fa",
                  paper: "#ffffff",
                },
                text: { primary: "#111" },
              }),
        },
        shape: {
          borderRadius: 6,
        },
      }),
    [mode, isDark]
  );

  /* 🎯 Colores SOLO para identidad */
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

      {/* FONDO GLOBAL */}
      <Box
        sx={{
          minHeight: "100vh",
          background: isDark
            ? "linear-gradient(180deg, #121212, #0e0e0e)"
            : "linear-gradient(180deg, #f5f7fa, #edf1f7)",
        }}
      >
        <Navbar mode={mode} setMode={setMode} />
        <Hero mode={mode} setMode={setMode} />

        <Container maxWidth="xl" sx={{ py: 8 }}>
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
                position: "relative",
                mb: 6,
                p: { xs: 3, md: 5 },
                backgroundColor: "background.paper",

                /* 🧱 BORDE PRINCIPAL */
                border: `2px solid ${color}`,

                /* ✨ EFECTO INGENIERÍA */
                boxShadow: isDark
                  ? "0 6px 20px rgba(0,0,0,0.55)"
                  : "0 6px 20px rgba(0,0,0,0.08)",

                transition: "all 0.35s ease",

                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  borderRadius: 6,
                  pointerEvents: "none",
                  opacity: 0,
                  transition: "opacity 0.35s ease",
                  boxShadow: `0 0 0 1px ${color}, 0 0 18px ${color}55`,
                },

                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: isDark
                    ? "0 14px 36px rgba(0,0,0,0.7)"
                    : "0 14px 36px rgba(0,0,0,0.14)",

                  "&::before": {
                    opacity: 1,
                  },
                },
              }}
            >
              <Component />
            </MotionPaper>
          ))}
        </Container>

        <Footer />

        {/* WHATSAPP */}
        <Tooltip title="Chatea por WhatsApp" placement="left">
          <Fab
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              bgcolor: "#25D366",
              boxShadow: "0 6px 20px rgba(37,211,102,0.45)",
              "&:hover": { bgcolor: "#1ebe5c" },
            }}
            onClick={() =>
              window.open("https://wa.me/593997979099", "_blank")
            }
          >
            <WhatsAppIcon sx={{ color: "#fff", fontSize: 28 }} />
          </Fab>
        </Tooltip>

        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
