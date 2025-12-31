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
  Divider,
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

  const scrollOffset = "96px";

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
                  default: "#f4f6fb",
                  paper: "rgba(255,255,255,0.85)",
                },
                text: {
                  primary: "#0f172a",
                },
              }
            : {
                background: {
                  default: "#0b0f19",
                  paper: "rgba(30,30,30,0.85)",
                },
                text: {
                  primary: "#ffffff",
                },
              }),
        },
        shape: {
          borderRadius: 20,
        },
        typography: {
          fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
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

      {/* FONDO GLOBAL */}
      <Box
        sx={{
          minHeight: "100vh",
          overflowX: "hidden",
          background:
            mode === "light"
              ? `
                radial-gradient(circle at top, rgba(0,191,165,0.08), transparent 40%),
                linear-gradient(180deg, #f4f6fb 0%, #eaeef5 100%)
              `
              : `
                radial-gradient(circle at top, rgba(66,165,245,0.15), transparent 40%),
                linear-gradient(180deg, #0b0f19 0%, #06080f 100%)
              `,
        }}
      >
        {/* NAVBAR */}
        <Navbar mode={mode} setMode={setMode} />

        {/* HERO */}
        <Hero mode={mode} setMode={setMode} />

        {/* CONTENIDO */}
        <Container
          maxWidth="xl"
          sx={{
            py: { xs: 8, md: 12 },
            px: { xs: 2, sm: 4, md: 6, lg: 10 },
          }}
        >
          {sections.map(({ id, color, Component }, index) => (
            <Box key={id}>
              <MotionPaper
                id={id}
                elevation={0}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                sx={{
                  mb: 10,
                  p: { xs: 3, md: 6 },
                  scrollMarginTop: scrollOffset,
                  backdropFilter: "blur(12px)",
                  backgroundColor: "background.paper",
                  border: `1px solid ${
                    mode === "light"
                      ? "rgba(0,0,0,0.05)"
                      : "rgba(255,255,255,0.08)"
                  }`,
                  boxShadow:
                    mode === "light"
                      ? "0 20px 50px rgba(0,0,0,0.08)"
                      : "0 20px 50px rgba(0,0,0,0.6)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    background: `linear-gradient(90deg, ${color}, transparent)`,
                  },
                  transition: "all 0.4s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow:
                      mode === "light"
                        ? "0 30px 70px rgba(0,0,0,0.12)"
                        : "0 30px 70px rgba(0,0,0,0.8)",
                  },
                }}
              >
                <Component />
              </MotionPaper>

              {/* DIVISOR ENTRE SECCIONES */}
              {index < sections.length - 1 && (
                <Divider
                  sx={{
                    mb: 10,
                    opacity: 0.15,
                  }}
                />
              )}
            </Box>
          ))}
        </Container>

        {/* FOOTER */}
        <Footer />

        {/* BOTÓN WHATSAPP */}
        <Tooltip title="Chatea por WhatsApp" placement="left">
          <Fab
            aria-label="whatsapp"
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 1000,
              bgcolor: "#25D366",
              boxShadow: "0 10px 30px rgba(37,211,102,0.45)",
              "&:hover": {
                bgcolor: "#1ebe5c",
                transform: "scale(1.05)",
              },
            }}
            onClick={() =>
              window.open("https://wa.me/593997979099", "_blank")
            }
          >
            <WhatsAppIcon sx={{ fontSize: 30, color: "#fff" }} />
          </Fab>
        </Tooltip>

        {/* CHATBOT IA */}
        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
