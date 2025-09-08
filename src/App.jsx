import { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box, Paper, Container } from "@mui/material";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [mode, setMode] = useState("light"); // estado para controlar el modo
  const scrollOffset = "80px";

  // Tema dinámico
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
      <Box sx={{ minHeight: "100vh" }}>
        {/* Navbar con control de modo */}
        <Navbar mode={mode} setMode={setMode} />

        {/* Hero con control de modo */}
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
      </Box>
    </ThemeProvider>
  );
}

export default App;
