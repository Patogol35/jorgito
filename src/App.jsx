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
      <Box
        id="hero"
        sx={{
          py: 10,
          bgcolor: "#0d1117",
        }}
      >
        <Hero />
      </Box>

      {/* Transición suave Hero → About */}
      <Box
        sx={{
          height: 40,
          background: "linear-gradient(#0d1117, #0d1117)", // mismo color para que no corte
        }}
      />

      {/* About */}
      <Box
        id="about"
        sx={{
          py: 10,
          bgcolor: "#0d1117",
        }}
      >
        <About />
      </Box>

      {/* Transición About → Skills */}
      <Box
        sx={{
          height: 40,
          background: "linear-gradient(#0d1117, #1c1f2a)",
        }}
      />

      {/* Skills */}
      <Box
        id="skills"
        sx={{
          py: 10,
          bgcolor: "#1c1f2a",
        }}
      >
        <Skills />
      </Box>

      {/* Transición Skills → Projects */}
      <Box
        sx={{
          height: 40,
          background: "linear-gradient(#1c1f2a, #f5f5f5)",
        }}
      />

      {/* Projects */}
      <Box
        id="projects"
        sx={{
          py: 10,
          bgcolor: "#f5f5f5",
        }}
      >
        <Projects />
      </Box>

      {/* Transición Projects → Certifications */}
      <Box
        sx={{
          height: 40,
          background: "linear-gradient(#f5f5f5, #e8f0ff)",
        }}
      />

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

      {/* Transición Certifications → Contact */}
      <Box
        sx={{
          height: 40,
          background: "linear-gradient(#e8f0ff, #0d1117)",
        }}
      />

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
