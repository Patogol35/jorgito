import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import {
  Box,
  Paper,
  Container,
  CssBaseline,
  IconButton,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      ...(darkMode
        ? {
            background: {
              default: "#1e1e2f", // gris azulado suave
              paper: "#2c2c3e",   // gris oscuro elegante
            },
            text: {
              primary: "#f5f5f5",
              secondary: "#c7c7d1",
            },
          }
        : {
            background: {
              default: "#f5f7fa",
              paper: "#ffffff",
            },
            text: {
              primary: "#111",
              secondary: "#444",
            },
          }),
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#6d28d9",
      },
    },
  });

  const scrollOffset = "80px";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        {/* Botón de cambio de tema */}
        <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1200 }}>
          <IconButton
            sx={{ color: theme.palette.text.primary }}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        <Navbar />
        <Hero />

        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* About */}
          <Paper
            id="about"
            elevation={3}
            sx={{
              mb: 6,
              p: { xs: 3, md: 6 },
              borderRadius: 3,
              background: theme.palette.background.paper,
              borderLeft: "10px solid #2e7d32",
              scrollMarginTop: scrollOffset,
              transition: "all 0.3s ease",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <About />
          </Paper>

          {/* Skills */}
          <Paper
            id="skills"
            elevation={3}
            sx={{
              mb: 6,
              p: { xs: 3, md: 6 },
              borderRadius: 3,
              background: theme.palette.background.paper,
              borderLeft: "10px solid #fb8c00",
              scrollMarginTop: scrollOffset,
              transition: "all 0.3s ease",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <Skills />
          </Paper>

          {/* Certifications */}
          <Paper
            id="certifications"
            elevation={3}
            sx={{
              mb: 6,
              p: { xs: 3, md: 6 },
              borderRadius: 3,
              background: theme.palette.background.paper,
              borderLeft: "10px solid #8e24aa",
              scrollMarginTop: scrollOffset,
              transition: "all 0.3s ease",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <Certifications />
          </Paper>

          {/* Projects */}
          <Paper
            id="projects"
            elevation={3}
            sx={{
              mb: 6,
              p: { xs: 3, md: 6 },
              borderRadius: 3,
              background: theme.palette.background.paper,
              borderLeft: "10px solid #1976d2",
              scrollMarginTop: scrollOffset,
              transition: "all 0.3s ease",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <Projects />
          </Paper>

          {/* Contact */}
          <Paper
            id="contact"
            elevation={3}
            sx={{
              mb: 6,
              p: { xs: 3, md: 6 },
              borderRadius: 3,
              background: theme.palette.background.paper,
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
