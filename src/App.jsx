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
  alpha,
  GlobalStyles,
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
import Form from "./components/Form.jsx";

function App() {
  const storedMode = localStorage.getItem("themeMode") || "dark";
  const [mode, setMode] = useState(storedMode);
  const scrollOffset = "80px";

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
              }
            : {
                background: {
                  default: "#0e1014",
                  paper: "#1a1d24",
                },
              }),
        },
      }),
    [mode]
  );

  /* =========================
     Premium Glass Card Style
  ========================= */
  const premiumGlassCard = (color) => ({
    position: "relative",
    overflow: "hidden",

    backgroundColor:
      mode === "light"
        ? alpha("#ffffff", 0.78)
        : alpha("#1a1d24", 0.78),

    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",

    borderLeft: `6px solid ${color}`,
    borderTop: `1px solid ${alpha("#fff", mode === "light" ? 0.5 : 0.08)}`,
    borderRight: `1px solid ${alpha("#fff", mode === "light" ? 0.4 : 0.06)}`,
    borderBottom: `1px solid ${alpha("#000", mode === "light" ? 0.05 : 0.4)}`,

    /* Animated gradient layer */
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background: `
        linear-gradient(
          120deg,
          ${alpha(color, 0.22)},
          transparent 45%,
          ${alpha(color, 0.08)}
        )
      `,
      opacity: 0.35,
      backgroundSize: "200% 200%",
      animation: "premiumGradient 24s ease infinite",
      zIndex: 0,
    },

    /* Content above gradient */
    "& > *": {
      position: "relative",
      zIndex: 1,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Global animation */}
      <GlobalStyles
        styles={{
          "@keyframes premiumGradient": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        }}
      />

      <Box sx={{ minHeight: "100vh", overflowX: "hidden" }}>
        {/* NAVBAR */}
        <Navbar mode={mode} setMode={setMode} />

        {/* HERO */}
        <Hero mode={mode} setMode={setMode} />

        {/* CONTENT */}
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
            { id: "form", color: "#00897b", Component: Form },
          ].map(({ id, color, Component }) => (
            <Paper
              key={id}
              id={id}
              elevation={0}
              sx={{
                mb: 6,
                p: { xs: 3, md: 6 },
                borderRadius: "18px",
                scrollMarginTop: scrollOffset,

                ...premiumGlassCard(color),

                transition:
                  "transform 0.45s ease, box-shadow 0.45s ease",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: `
                    0 20px 45px ${alpha(color, 0.28)}
                  `,
                },
              }}
            >
              <Component />
            </Paper>
          ))}
        </Container>

        {/* FOOTER */}
        <Footer />

        {/* WHATSAPP */}
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

        {/* CHATBOT */}
        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
