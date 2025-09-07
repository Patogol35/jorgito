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
        background: "linear-gradient(135deg, #eef2f7 0%, #dfe6ed 100%)",
        color: "#111",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Navbar />

      {/* Hero protagonista */}
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
          <Contact />
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
}

export default App;
