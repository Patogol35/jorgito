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
      <Hero />

      <Box id="about" sx={{ py: 10 }}>
        <About />
      </Box>

      <Box id="skills" sx={{ py: 10 }}>
        <Skills />
      </Box>

      <Box id="projects" sx={{ py: 10 }}>
        <Projects />
      </Box>

      <Box id="certifications" sx={{ py: 10 }}>
        <Certifications />
      </Box>

      <Box id="contact" sx={{ py: 10 }}>
        <Contact />
      </Box>

      <Footer />
    </>
  );
}

export default App;
