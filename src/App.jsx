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
                text: { primary: "#111" },
              }
            : {
                background: {
                  default: "#121212",
                  paper: "#1a1a1a",
                },
                text: { primary: "#ffffff" },
              }),
        },
        shape: {
          borderRadius: 14,
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

      <Box
        sx={{
          minHeight: "100vh",
          overflowX: "hidden",
          background:
            mode === "light"
              ? "linear-gradient(180deg, #f5f7fa 0%, #eef2f8 100%)"
              : "linear-gradient(180deg, #121212 0%, #0d0d0d 100%)",
        }}
      >
        <Navbar mode={mode} setMode={setMode} />
        <Hero mode={mode} setMode={setMode} />

        <Container maxWidth="xl" sx={{ py: 8, px: { xs: 2, md: 6, lg: 10 } }}>
          {sections.map(({ id, color, Component }) => (
            <MotionPaper
              key={id}
              id={id}
              elevation={0}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              sx={{
                position: "relative",
                mb: 7,
                p: { xs: 3.5, md: 5 },
                scrollMarginTop: scrollOffset,
                backgroundColor: "background.paper",
                borderRadius: 4,

                /* BARRA LATERAL ELEGANTE */
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "6px",
                  height: "100%",
                  background: color,
                  borderRadius: "16px 0 0 16px",
                },

                boxShadow:
                  mode === "light"
                    ? "0 10px 40px rgba(0,0,0,0.06)"
                    : "0 10px 40px rgba(0,0,0,0.55)",

                transition: "all 0.3s ease",

                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Component />
            </MotionPaper>
          ))}
        </Container>

        <Footer />

        {/* WHATSAPP FAB */}
        <Tooltip title="Chatea por WhatsApp" placement="left">
          <Fab
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 1000,
              bgcolor: "#25D366",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": { boxShadow: "0 0 0 0 rgba(37,211,102,0.6)" },
                "70%": { boxShadow: "0 0 0 14px rgba(37,211,102,0)" },
                "100%": { boxShadow: "0 0 0 0 rgba(37,211,102,0)" },
              },
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
