import { useState, useMemo, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
  Fab,
  Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles"; // 👈 Importante para los bordes semitransparentes
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

const MotionPaper = motion(Box); // 👈 Usamos Box en lugar de Paper para mayor control de estilos

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

  // ✨ Colores profesionales y significativos
  const sections = [
    { id: "about", color: "#0288d1", Component: About },         // Azul profesional → confianza
    { id: "skills", color: "#5e35b1", Component: Skills },       // Púrpura técnico → innovación
    { id: "certifications", color: "#00796b", Component: Certifications }, // Verde esmeralda → logro
    { id: "projects", color: "#c2185b", Component: Projects },   // Rosa intenso → creatividad
    { id: "contact", color: "#689f38", Component: Contact },     // Verde oliva → accesibilidad
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

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
              component="section"
              elevation={0}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              sx={{
                mb: 6,
                p: { xs: 3, md: 5 },
                scrollMarginTop: scrollOffset,
                backgroundColor: "background.paper",

                // ✅ Borde semitransparente adaptativo
                border: "1px solid",
                borderColor: alpha(color, mode === "light" ? 0.25 : 0.35),
                borderRadius: 3,

                // ✅ Sombras refinadas
                boxShadow:
                  mode === "light"
                    ? "0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.08)"
                    : "0 4px 20px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.2)",

                // ✅ Transiciones suaves y naturales
                transition:
                  "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), " +
                  "box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), " +
                  "border-color 0.3s ease",

                // ✅ Efecto hover elegante
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow:
                    mode === "light"
                      ? "0 10px 30px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.1)"
                      : "0 10px 30px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.25)",
                  borderColor: alpha(color, mode === "light" ? 0.4 : 0.55),
                },
              }}
            >
              <Component />
            </MotionPaper>
          ))}
        </Container>

        <Footer />

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
