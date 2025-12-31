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
              ? "linear-gradient(180deg, #f5f7fa 0%, #edf1f7 100%)"
              : "linear-gradient(180deg, #121212 0%, #0e0e0e 100%)",
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
            py: 9,
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
              transition={{ duration: 0.55, ease: "easeOut" }}
              sx={{
                position: "relative",
                mb: 7,
                p: { xs: 3, md: 5 },
                scrollMarginTop: scrollOffset,
                backgroundColor: "background.paper",

                /* DETALLE SUPERIOR */
                borderTop: `4px solid ${color}`,
                borderRadius: 16,

                /* SOMBRA NATURAL */
                boxShadow:
                  mode === "light"
                    ? `
                      0 1px 3px rgba(0,0,0,0.06),
                      0 12px 24px rgba(0,0,0,0.08)
                    `
                    : `
                      0 1px 3px rgba(0,0,0,0.3),
                      0 12px 24px rgba(0,0,0,0.6)
                    `,

                transition:
                  "transform 0.25s ease, box-shadow 0.25s ease",

                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow:
                    mode === "light"
                      ? `
                        0 4px 6px rgba(0,0,0,0.08),
                        0 18px 36px rgba(0,0,0,0.12)
                      `
                      : `
                        0 4px 6px rgba(0,0,0,0.5),
                        0 18px 36px rgba(0,0,0,0.8)
                      `,
                },

                /* MICRO DETALLE INTERNO */
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  borderRadius: 16,
                  pointerEvents: "none",
                  boxShadow:
                    mode === "light"
                      ? "inset 0 1px 0 rgba(255,255,255,0.6)"
                      : "inset 0 1px 0 rgba(255,255,255,0.05)",
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
              boxShadow: "0 8px 25px rgba(37,211,102,0.45)",
              "&:hover": {
                bgcolor: "#1ebe5c",
                transform: "scale(1.04)",
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
