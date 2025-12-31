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
          borderRadius: 8,
        },
      }),
    [mode]
  );

  /* 🎯 Colores por sección (solo estructurales) */
  const sections = [
    { id: "about", color: "#1976d2", Component: About },
    { id: "skills", color: "#6d28d9", Component: Skills },
    { id: "certifications", color: "#9333ea", Component: Certifications },
    { id: "projects", color: "#2563eb", Component: Projects },
    { id: "contact", color: "#475569", Component: Contact },
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
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              sx={{
                position: "relative",
                mb: 6,
                p: { xs: 3, md: 5 },
                overflow: "hidden",
                backgroundColor: "background.paper",

                /* 🧠 BORDE INGENIERÍA */
                borderLeft: `6px solid ${color}`,
                borderRadius: 8,

                /* SOMBRA TÉCNICA */
                boxShadow:
                  mode === "light"
                    ? "0 10px 26px rgba(0,0,0,0.08)"
                    : "0 10px 30px rgba(0,0,0,0.55)",

                transition: "all 0.45s ease",

                /* CAPA LÓGICA (muy leve) */
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(
                    90deg,
                    ${color}14,
                    transparent 45%
                  )`,
                  opacity: 0,
                  transition: "opacity 0.45s ease",
                  pointerEvents: "none",
                },

                /* LÍNEA SUPERIOR (arquitectura) */
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "3px",
                  width: "100%",
                  background: `linear-gradient(90deg, ${color}, transparent)`,
                  opacity: 0.35,
                },

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow:
                    mode === "light"
                      ? "0 18px 40px rgba(0,0,0,0.15)"
                      : "0 18px 46px rgba(0,0,0,0.75)",

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
