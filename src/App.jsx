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
  useMediaQuery,
  keyframes,
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

// Animación vibración
const vibrate = keyframes`
  0% { transform: scale(1); }
  20% { transform: scale(1.1) rotate(-5deg); }
  40% { transform: scale(1.1) rotate(5deg); }
  60% { transform: scale(1.1) rotate(-5deg); }
  80% { transform: scale(1.1) rotate(5deg); }
  100% { transform: scale(1); }
`;

function App() {
  const [mode, setMode] = useState("light");
  const [isIdle, setIsIdle] = useState(true); // Estado de inactividad
  const scrollOffset = "80px";
  const isMobile = useMediaQuery("(max-width:600px)");

  // Detectar inactividad (sin mover mouse/scroll)
  useEffect(() => {
    let timeout;
    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsIdle(true), 5000); // 5s sin interacción = idle
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("scroll", resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      clearTimeout(timeout);
    };
  }, []);

  // Tema
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#f5f7fa", paper: "#ffffff" },
                text: { primary: "#111" },
              }
            : {
                background: { default: "#121212", paper: "#1e1e1e" },
                text: { primary: "#ffffff" },
              }),
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Navbar mode={mode} setMode={setMode} />
        <Hero mode={mode} setMode={setMode} />

        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Paper
            id="about"
            elevation={3}
            sx={{
              mb: 6,
              p: { xs: 3, md: 6 },
              borderRadius: 3,
              borderLeft: "10px solid #2e7d32",
              scrollMarginTop: scrollOffset,
              transition: "all 0.3s ease",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <About />
          </Paper>

          <Paper
            id="skills"
            elevation={3}
            sx={{
              mb: 6,
              p: { xs: 3, md: 6 },
              borderRadius: 3,
              borderLeft: "10px solid #fb8c00",
              scrollMarginTop: scrollOffset,
              transition: "all 0.3s ease",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <Skills />
          </Paper>

          <Paper
            id="certifications"
            elevation={3}
            sx={{
              mb: 6,
              p: { xs: 3, md: 6 },
              borderRadius: 3,
              borderLeft: "10px solid #8e24aa",
              scrollMarginTop: scrollOffset,
              transition: "all 0.3s ease",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <Certifications />
          </Paper>

          <Paper
            id="projects"
            elevation={3}
            sx={{
              mb: 6,
              p: { xs: 3, md: 6 },
              borderRadius: 3,
              borderLeft: "10px solid #1976d2",
              scrollMarginTop: scrollOffset,
              transition: "all 0.3s ease",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <Projects />
          </Paper>

          <Paper
            id="contact"
            elevation={3}
            sx={{
              mb: 6,
              p: { xs: 3, md: 6 },
              borderRadius: 3,
              borderLeft: "10px solid #d32f2f",
              scrollMarginTop: scrollOffset,
              transition: "all 0.3s ease",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <Contact />
          </Paper>
        </Container>

        <Footer />

        {/* BOTÓN FLOTANTE DE WHATSAPP */}
        <Tooltip title="Chatea por WhatsApp" placement="left">
          <Fab
            color="success"
            aria-label="whatsapp"
            sx={{
              position: "fixed",
              bottom: isMobile ? 20 : 24,
              right: isMobile ? 20 : 24,
              zIndex: 2000,
              bgcolor: "#25D366",
              width: isMobile ? 60 : 56,
              height: isMobile ? 60 : 56,
              boxShadow: "0 0 15px rgba(37,211,102,0.5)", // Glow verde
              animation: isIdle ? `${vibrate} 1.5s ease-in-out infinite` : "none",
              "&:hover": {
                bgcolor: "#1ebe5c",
                transform: "scale(1.1)",
                boxShadow: "0 0 20px rgba(37,211,102,0.7)",
              },
            }}
            onClick={() =>
              window.open("https://wa.me/593997979099", "_blank")
            }
          >
            <WhatsAppIcon
              sx={{ fontSize: isMobile ? 34 : 30, color: "#fff" }}
            />
          </Fab>
        </Tooltip>
      </Box>
    </ThemeProvider>
  );
}

export default App;
