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
  const scrollOffset = "80px"; // Altura del navbar fijo

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #eef2f7 0%, #f9fbfc 100%)",
        color: "#111",
        fontFamily: "'Poppins', sans-serif", // ✅ Tipografía más moderna
      }}
    >
      <Navbar />

      {/* Hero destacado */}
      <Hero />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* About */}
        <Paper
          id="about"
          elevation={2}
          sx={{
            mb: 5,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#ffffff",
            scrollMarginTop: scrollOffset,
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            },
          }}
        >
          <About />
        </Paper>

        {/* Skills */}
        <Paper
          id="skills"
          elevation={2}
          sx={{
            mb: 5,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#fafafa",
            scrollMarginTop: scrollOffset,
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            },
          }}
        >
          <Skills />
        </Paper>

        {/* Certifications */}
        <Paper
          id="certifications"
          elevation={2}
          sx={{
            mb: 5,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#ffffff",
            scrollMarginTop: scrollOffset,
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            },
          }}
        >
          <Certifications />
        </Paper>

        {/* Projects */}
        <Paper
          id="projects"
          elevation={3}
          sx={{
            mb: 5,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#fafafa",
            scrollMarginTop: scrollOffset,
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            },
          }}
        >
          <Projects />
        </Paper>

        {/* Contact */}
        <Paper
          id="contact"
          elevation={2}
          sx={{
            mb: 5,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#ffffff",
            scrollMarginTop: scrollOffset,
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            },
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
