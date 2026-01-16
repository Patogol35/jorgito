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
                  default: "#f4f6fb",
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
     Base Glass Card
  ========================= */
  const glassCard = (color) => ({
    position: "relative",
    overflow: "hidden",
    backgroundColor:
      mode === "light"
        ? alpha("#ffffff", 0.92)
        : alpha("#1a1d24", 0.92),

    borderLeft: `6px solid ${color}`,

    "&::before": {
      content: '""',
      position: "absolute",
      inset: "-40%",
      background: `
        radial-gradient(
          circle at top left,
          ${alpha(color, 0.35)},
          transparent 60%
        )
      `,
      animation: "softMove 26s ease infinite",
      zIndex: 0,
    },

    "&::after": {
      content: '""',
      position: "absolute",
      inset: 0,
      background:
        mode === "light"
          ? "rgba(255,255,255,0.35)"
          : "rgba(255,255,255,0.04)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      zIndex: 0,
    },

    "& > *": {
      position: "relative",
      zIndex: 1,
    },
  });

  /* =========================
     FORM CTA CARD (STRONG)
  ========================= */
  const formCard = (color) => ({
    ...glassCard(color),

    minHeight: "80vh",
    display: "flex",
    alignItems: "center",

    "&::before": {
      content: '""',
      position: "absolute",
      inset: "-50%",
      background: `
        radial-gradient(
          circle at center,
          ${alpha(color, 0.45)},
          transparent 65%
        )
      `,
      animation: "softMove 30s ease infinite",
      zIndex: 0,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <GlobalStyles
        styles={{
          "@keyframes softMove": {
            "0%": { transform: "translate(0, 0)" },
            "50%": { transform: "translate(40px, 30px)" },
            "100%": { transform: "translate(0, 0)" },
          },
        }}
      />

      <Box sx={{ minHeight: "100vh", overflowX: "hidden" }}>
        <Navbar mode={mode} setMode={setMode} />
        <Hero mode={mode} setMode={setMode} />

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
            {
              id: "form",
              color: "#00897b",
              Component: Form,
              isForm: true,
            },
          ].map(({ id, color, Component, isForm }) => (
            <Paper
              key={id}
              id={id}
              elevation={isForm ? 6 : 3}
              sx={{
                mb: 6,
                p: { xs: 3, md: 6 },
                borderRadius: "20px",
                scrollMarginTop: scrollOffset,

                ...(isForm ? formCard(color) : glassCard(color)),

                transition: "all 0.45s ease",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: `0 22px 50px ${alpha(color, 0.4)}`,
                },
              }}
            >
              <Component />
            </Paper>
          ))}
        </Container>

        <Footer />

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

        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
