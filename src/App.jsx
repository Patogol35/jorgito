import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { Box, Paper, Container, Typography } from "@mui/material";

function App() {
  const scrollOffset = "80px";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef2f7 0%, #dfe6ed 100%)",
        color: "#111",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Navbar />

      {/* Hero con más protagonismo */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Hero />
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* About */}
        <Paper
          id="about"
          elevation={3}
          sx={{
            mb: 6,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#fff",
            borderLeft: "6px solid #1976d2",
            scrollMarginTop: scrollOffset,
            transition: "all 0.3s",
            "&:hover": { transform: "translateY(-6px)" },
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Sobre mí
          </Typography>
          <About />
        </Paper>

        {/* Skills */}
        <Paper
          id="skills"
          elevation={3}
          sx={{
            mb: 6,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#fafafa",
            borderLeft: "6px solid #43a047",
            scrollMarginTop: scrollOffset,
            transition: "all 0.3s",
            "&:hover": { transform: "translateY(-6px)" },
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold" color="success.main">
            Habilidades
          </Typography>
          <Skills />
        </Paper>

        {/* Certifications */}
        <Paper
          id="certifications"
          elevation={3}
          sx={{
            mb: 6,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#fff",
            borderLeft: "6px solid #ff9800",
            scrollMarginTop: scrollOffset,
            transition: "all 0.3s",
            "&:hover": { transform: "translateY(-6px)" },
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold" color="warning.main">
            Certificaciones
          </Typography>
          <Certifications />
        </Paper>

        {/* Projects */}
        <Paper
          id="projects"
          elevation={3}
          sx={{
            mb: 6,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#fafafa",
            borderLeft: "6px solid #9c27b0",
            scrollMarginTop: scrollOffset,
            transition: "all 0.3s",
            "&:hover": { transform: "translateY(-6px)" },
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold" color="secondary">
            Proyectos
          </Typography>
          <Projects />
        </Paper>

        {/* Contact */}
        <Paper
          id="contact"
          elevation={3}
          sx={{
            mb: 6,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#fff",
            borderLeft: "6px solid #e91e63",
            scrollMarginTop: scrollOffset,
            transition: "all 0.3s",
            "&:hover": { transform: "translateY(-6px)" },
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold" color="error">
            Contacto
          </Typography>
          <Contact />
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
}

export default App;
