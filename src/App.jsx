import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
//import Projects from "./components/Projects.jsx";
import Certifications from "./components/Certifications.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <Box
        id="hero"
        sx={{
          py: 10,
          bgcolor: "#0d1117",
          mt: 0, // asegura separación uniforme arriba
        }}
      >
        <Hero />
      </Box>

      {/* About */}
      <Box
        id="about"
        sx={{
          py: 10,
          bgcolor: "#f5f5f5",
          mt: 0, // separación uniforme con Hero
        }}
      >
        <About />
      </Box>

      {/* Skills */}
      <Box
        id="skills"
        sx={{
          py: 10,
          bgcolor: "#1c1f2a",
          mt: 0, // separación uniforme con About
        }}
      >
        <Skills />

      
      </Box>

      {/* Certifications */}
      <Box
        id="certifications"
        sx={{
          py: 10,
          bgcolor: "#e8f0ff",
        }}
      >
        <Certifications />
      </Box>

      {/* Contact */}
      <Box
        id="contact"
        sx={{
          py: 10,
          bgcolor: "#0d1117",
        }}
      >
        <Contact />
      </Box>

      <Footer />
    </>
  );
}

export default App;
