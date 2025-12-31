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
                  default: "#f5f7fa",
                  paper: "#ffffff",
                },
              }
            : {
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
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

      <Box sx={{ minHeight: "100vh", overflowX: "hidden" }}>
        <Navbar mode={mode} setMode={setMode} />
        <Hero mode={mode} setMode={setMode} />

        <Container
          maxWidth="lg"
          sx={{ py: 6, px: { xs: 2, sm: 4, md: 6 } }}
        >
          {sections.map(({ id, color, Component }) => (
            <Paper
              key={id}
              id={id}
              elevation={0}
              sx={{
                mb: 5,
                p: { xs: 3, md: 6 },
                borderRadius: 4,
                borderLeft: `8px solid ${color}`,
                scrollMarginTop: scrollOffset,
                background:
                  mode === "dark"
                    ? "linear-gradient(180deg, #1e1e1e, #151515)"
                    : "linear-gradient(180deg, #ffffff, #f9fafb)",
                boxShadow:
                  mode === "dark"
                    ? "0 10px 35px rgba(0,0,0,.45)"
                    : "0 10px 35px rgba(0,0,0,.08)",
                transition: "all .35s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
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
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
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

        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
