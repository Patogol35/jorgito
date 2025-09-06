import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Projects from "./components/Projects.js";   // 👈 Importación aquí
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { Box, Paper, Container } from "@mui/material";

function App() {
  const scrollOffset = "80px"; // Altura del navbar fijo

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

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* About */}
        <Paper
          id="about"
          elevation={3}
          sx={{
            mb: 4,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#ffffff",
            scrollMarginTop: scrollOffset,
          }}
        >
          <About />
        </Paper>

        {/* Skills */}
        <Paper
          id="skills"
          elevation={3}
          sx={{
            mb: 4,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#ffffff",
            scrollMarginTop: scrollOffset,
          }}
        >
          <Skills />
        </Paper>

        {/* Certifications */}
        <Paper
          id="certifications"
          elevation={3}
          sx={{
            mb: 4,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#ffffff",
            scrollMarginTop: scrollOffset,
          }}
        >
          <Certifications />
        </Paper>

        {/* Proyectos 👇 lo insertamos aquí */}
        <Paper
          id="projects"
          elevation={3}
          sx={{
            mb: 4,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#ffffff",
            scrollMarginTop: scrollOffset,
          }}
        >
          <Proyectos />
        </Paper>

        {/* Contact */}
        <Paper
          id="contact"
          elevation={3}
          sx={{
            mb: 4,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#ffffff",
            scrollMarginTop: scrollOffset,
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
