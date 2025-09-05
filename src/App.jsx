// App.jsx
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <Navbar />
      <Hero />

      <Box id="about" sx={{ bgcolor: "#f9f9f9", py: 10 }}>
        <About />
      </Box>

      <Box id="skills" sx={{ bgcolor: "white", py: 10 }}>
        <Skills />
      </Box>

      <Box id="projects" sx={{ bgcolor: "#f9f9f9", py: 10 }}>
        <Projects />
      </Box>

      <Box id="contact" sx={{ bgcolor: "white", py: 10 }}>
        <Contact />
      </Box>

      <Footer />
    </>
  );
}

export default App;
