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
import { alpha } from "@mui/material/styles";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ChatBot from "./components/ChatBot.jsx";

// Motion wrapper con layout y hover
const MotionSection = motion(Box);

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
                background: { default: "#f8fafc", paper: "#ffffff" },
                text: { primary: "#0f172a" },
                divider: "rgba(15,23,42,0.12)",
              }
            : {
                background: { default: "#020814", paper: "#0f172a" },
                text: { primary: "#f1f5f9" },
                divider: "rgba(241,245,249,0.12)",
              }),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", -apple-system, BlinkMacSystemFont, sans-serif',
          h1: { fontWeight: 700 },
          h2: { fontWeight: 600 },
          body1: { fontWeight: 400, lineHeight: 1.6 },
        },
        shape: { borderRadius: 8 },
      }),
    [mode]
  );

  const sections = [
    { id: "about", color: "#3b82f6", Component: About },        // Azul moderno (confianza + tech)
    { id: "skills", color: "#8b5cf6", Component: Skills },      // Violeta (complejidad controlada)
    { id: "certifications", color: "#10b981", Component: Certifications }, // Esmeralda (logro sostenible)
    { id: "projects", color: "#ec4899", Component: Projects },  // Rosa eléctrico (creatividad técnica)
    { id: "contact", color: "#f59e0b", Component: Contact },    // Ámbar (energía + accesibilidad)
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
              ? "linear-gradient(to bottom, #f8fafc, #e2e8f0)"
              : "radial-gradient(circle at 10% 20%, rgba(30,41,59,0.8), rgba(2,8,20,1))",
        }}
      >
        <Navbar mode={mode} setMode={setMode} />
        <Hero mode={mode} setMode={setMode} />

        <Container
          maxWidth="xl"
          sx={{
            py: { xs: 6, md: 10 },
            px: { xs: 2, sm: 3, md: 4, lg: 6 },
          }}
        >
          <AnimatePresence>
            {sections.map(({ id, color, Component }, index) => (
              <MotionSection
                key={id}
                id={id}
                component="section"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                sx={{
                  mb: 8,
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 4,
                  scrollMarginTop: scrollOffset,

                  // ✨ Gradiente de fondo sutil
                  background: mode === "light"
                    ? `linear-gradient(140deg, ${alpha(color, 0.03)}, ${alpha(color, 0.01)})`
                    : `linear-gradient(140deg, ${alpha(color, 0.06)}, ${alpha(color, 0.02)})`,

                  // ✨ Borde con iluminación dinámica
                  border: "1px solid",
                  borderColor: alpha(color, mode === "light" ? 0.18 : 0.25),

                  // ✨ Sombra arquitectónica
                  boxShadow: mode === "light"
                    ? "0 10px 30px -10px rgba(0,0,0,0.07)"
                    : "0 10px 30px -10px rgba(0,0,0,0.4)",

                  // ✨ Efecto de brillo en hover
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(90deg, transparent, ${alpha(color, 0.08)}, transparent)`,
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                    pointerEvents: "none",
                  },
                  "&:hover::before": {
                    opacity: 1,
                  },
                }}
              >
                <Box
                  p={{ xs: 3, md: 5 }}
                  sx={{
                    backgroundColor: "background.paper",
                    borderRadius: 3,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <Component />
                </Box>
              </MotionSection>
            ))}
          </AnimatePresence>
        </Container>

        <Footer />

        {/* WhatsApp FAB mejorado */}
        <Tooltip title="Chatea por WhatsApp" placement="left">
          <Fab
            aria-label="whatsapp"
            component={motion.div}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 1300,
              bgcolor: "#25D366",
              boxShadow:
                "0 4px 14px rgba(37,211,102,0.4), 0 2px 6px rgba(0,0,0,0.15)",
              "&:hover": { bgcolor: "#128C7E" },
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
