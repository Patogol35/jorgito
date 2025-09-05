import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
// import Projects from "./components/Projects.jsx";
import Certifications from "./components/Certifications.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { Box, Container, Paper } from "@mui/material";

function App() {
  return (
    <>
      <Navbar />

      {/* Fondo general uniforme */}
      <Box sx={{ bgcolor: "#f0f4f9", minHeight: "100vh", pt: 10, pb: 6 }}>
        <Container maxWidth="lg">
          {/* Hero (no lo meto en tarjeta porque ya suele ocupar toda la vista) */}
          <Box id="hero" sx={{ mb: 8 }}>
            <Hero />
          </Box>

          {/* About */}
          <Paper
            id="about"
            elevation={3}
            sx={{
              p: 4,
              mb: 8,
              borderRadius: "16px",
              bgcolor: "white",
            }}
          >
            <About />
          </Paper>

          {/* Skills */}
          <Paper
            id="skills"
            elevation={3}
            sx={{
              p: 4,
              mb: 8,
              borderRadius: "16px",
              bgcolor: "white",
            }}
          >
            <Skills />
          </Paper>

          {/* Certifications */}
          <Paper
            id="certifications"
            elevation={3}
            sx={{
              p: 4,
              mb: 8,
              borderRadius: "16px",
              bgcolor: "white",
            }}
          >
            <Certifications />
          </Paper>

          {/* Contact */}
          <Paper
            id="contact"
            elevation={3}
            sx={{
              p: 4,
              mb: 8,
              borderRadius: "16px",
              bgcolor: "white",
            }}
          >
            <Contact />
          </Paper>
        </Container>
      </Box>

      <Footer />
    </>
  );
}

export default App;

      
