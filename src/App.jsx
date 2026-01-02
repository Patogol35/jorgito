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
                  default: "#eef2f7",
                  paper: "#ffffff",
                },
              }
            : {
                background: {
                  default: "#0d0d0d",
                  paper: "#1a1a1a",
                },
              }),
        },
      }),
    [mode]
  );

  const sections = [
    { id: "about", color: "#2e7d32", Component: About },
    { id: "skills", color: "#fb8c00", Component: Skills },
    { id: "certifications", color: "#8e24aa", Component: Certifications },
    { id: "projects", color: "#1976d2", Component: Projects },
    { id: "contact", color: "#d32f2f", Component: Contact },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ minHeight: "100vh" }}>
        <Navbar mode={mode} setMode={setMode} />
        <Hero mode={mode} setMode={setMode} />

        <Container
          maxWidth="lg"
          sx={{ py: 8 }}
        >
          {sections.map(({ id, color, Component }) => (
            <Paper
              key={id}
              id={id}
              elevation={0}
              sx={{
                mb: 6,
                p: { xs: 4, md: 7 },
                borderRadius: 4,
                scrollMarginTop: scrollOffset,

                // 🔥 CAMBIOS QUE SE NOTAN
                border: `2px solid ${color}`,
                background:
                  mode === "light"
                    ? `${color}08`
                    : `${color}12`,

                boxShadow:
                  mode === "light"
                    ? "0 10px 30px rgba(0,0,0,0.15)"
                    : "0 10px 40px rgba(0,0,0,0.8)",

                transition: "all 0.25s ease",

                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow:
                    mode === "light"
                      ? `0 20px 50px ${color}55`
                      : `0 25px 60px ${color}88`,
                },
              }}
            >
              <Component />
            </Paper>
          ))}
        </Container>

        <Footer />

        <Tooltip title="WhatsApp" placement="left">
          <Fab
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              bgcolor: "#25D366",
            }}
            onClick={() =>
              window.open("https://wa.me/593997979099", "_blank")
            }
          >
            <WhatsAppIcon sx={{ color: "#fff" }} />
          </Fab>
        </Tooltip>

        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
