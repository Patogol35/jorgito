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
          borderRadius: 16,
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
              ? "linear-gradient(180deg, #f5f7fa 0%, #e9edf3 100%)"
              : "linear-gradient(180deg, #121212 0%, #0d0d0d 100%)",
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
            py: 8,
            px: { xs: 2, sm: 4, md: 6, lg: 10 },
          }}
        >
          {sections.map(({ id, color, Component }) => (
            <MotionPaper
              key={id}
              id={id}
              elevation={0}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              sx={{
                mb: 6,
                p: { xs: 3, md: 5 },
                scrollMarginTop: scrollOffset,
                backgroundColor: "background.paper",
                borderTop: `6px solid ${color}`,
                boxShadow:
                  mode === "light"
                    ? "0 12px 30px rgba(0,0,0,0.08)"
                    : "0 12px 30px rgba(0,0,0,0.45)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                },
              }}
            >
              <Component />
            </MotionPaper>
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
              bottom: 20,
              right: 20,
              zIndex: 1000,
              bgcolor: "#25D366",
              "&:hover": { bgcolor: "#1ebe5c" },
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
