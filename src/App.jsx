import { useState, useMemo, useEffect, useRef } from "react";
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

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ChatBot from "./components/ChatBot.jsx";

function App() {
  const storedMode = localStorage.getItem("themeMode") || "light";
  const [mode, setMode] = useState(storedMode);
  const scrollOffset = "80px";

  const sectionRefs = useRef([]);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    const options = {
      threshold: 0.25,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible-border");
        }
      });
    }, options);

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <style>
        {`
          .border-animate {
            position: relative;
            border-left: 5px solid transparent;
          }

          .border-animate::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            height: 0%;
            width: 5px;
            background: currentColor;
            transition: height 1.2s ease-out;
          }

          .visible-border::before {
            height: 100%;
          }
        `}
      </style>

      <Box sx={{ minHeight: "100vh", overflowX: "hidden" }}>
        {/* NAVBAR */}
        <Navbar mode={mode} setMode={setMode} />

        {/* HERO */}
        <Hero mode={mode} setMode={setMode} />

        {/* CONTENIDO */}
        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            py: 6,
            px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 },
          }}
        >
          {[
            { id: "about", color: "#2e7d32", Component: About },
            { id: "skills", color: "#fb8c00", Component: Skills },
            { id: "certifications", color: "#8e24aa", Component: Certifications },
            { id: "projects", color: "#1976d2", Component: Projects },
            { id: "contact", color: "#d32f2f", Component: Contact },
          ].map(({ id, color, Component }, index) => (
            <Paper
              key={id}
              id={id}
              ref={(el) => (sectionRefs.current[index] = el)}
              className="border-animate"
              elevation={3}
              sx={{
                color,
                mb: 4,
                p: { xs: 3, md: 6 },
                borderRadius: 3,
                scrollMarginTop: scrollOffset,
                transition: "transform 0.3s ease, box-shadow 0.4s ease",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: `0 8px 24px rgba(0,0,0,0.18)`,
                },
              }}
            >
              <Component />
            </Paper>
          ))}
        </Container>

        {/* FOOTER */}
        <Footer />

        {/* BOTÓN FLOTANTE WHATSAPP */}
        <Tooltip title="Chatea por WhatsApp" placement="left">
          <Fab
            aria-label="whatsapp"
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 1000,
              bgcolor: "#25D366",
              "&:hover": { bgcolor: "#1ebe5c" },
            }}
            onClick={() =>
              window.open("https://wa.me/593997979099", "_blank")
            }
          >
            <WhatsAppIcon sx={{ fontSize: 32, color: "#fff" }} />
          </Fab>
        </Tooltip>

        {/* CHATBOT IA PERSONAL */}
        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
