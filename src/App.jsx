import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { Box, Paper, Container } from "@mui/material";

function App() {
  const scrollOffset = "80px";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #f5f7fa 0%, #e6ebf0 100%)",
        color: "#111",
      }}
    >
      <Navbar />

      {/* Hero fuera de Paper */}
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
            background: "#ffffff",
            borderLeft: "10px solid #2e7d32", // Verde
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
            background: "#ffffff",
            borderLeft: "10px solid #fb8c00", // Naranja
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
            background: "#ffffff",
            borderLeft: "10px solid #8e24aa", // Morado
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
            background: "#ffffff",
            borderLeft: "10px solid #1976d2", // Azul
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
            background: "#ffffff",
            borderLeft: "10px solid #d32f2f", // Rojo
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
  );
}

export default App;
