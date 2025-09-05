import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Certifications from "./components/Certifications.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <Navbar />
      
      {/* Hero */}
      <Box id="hero">
        <Hero />
      </Box>

      {/* About */}
      <Box
        id="about"
        sx={{
          bgcolor: "#0d1117",
          py: 10,
        }}
      >
        <About />
      </Box>

      {/* Skills */}
      <Box
        id="skills"
        sx={{
          bgcolor: "#1c1f2a",
          py: 10,
        }}
      >
        <Skills />
      </Box>

      {/* Projects */}
      <Box
        id="projects"
        sx={{
          bgcolor: "#f5f5f5",
          py: 10,
        }}
      >
        <Projects />
      </Box>

      {/* Separador suave */}
      <Box
        sx={{
          height: 20,
          background: "linear-gradient(to right, #f5f5f5, #e8f0ff)",
        }}
      />

      {/* Certifications */}
      <Box
        id="certifications"
        sx={{
          bgcolor: "#e8f0ff",
          py: 10,
        }}
      >
        <Certifications />
      </Box>

      {/* Contact */}
      <Box
        id="contact"
        sx={{
          bgcolor: "#0d1117",
          py: 10,
        }}
      >
        <Contact />
      </Box>

      <Footer />
    </>
  );
}

export default App;
