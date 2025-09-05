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
      <Box id="hero" sx={{ py: 10, bgcolor: "#0d1117" }}>
        <Hero />
      </Box>

      {/* Onda Hero → About */}
      <Box sx={{ lineHeight: 0 }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0d1117"
            d="M0,192L80,176C160,160,320,128,480,144C640,160,800,224,960,240C1120,256,1280,224,1360,208L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>
      </Box>

      {/* About */}
      <Box id="about" sx={{ py: 10, bgcolor: "#0d1117" }}>
        <About />
      </Box>

      {/* Onda About → Skills */}
      <Box sx={{ lineHeight: 0 }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#1c1f2a"
            d="M0,256L48,234.7C96,213,192,171,288,160C384,149,480,171,576,192C672,213,768,235,864,229.3C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </Box>

      {/* Skills */}
      <Box id="skills" sx={{ py: 10, bgcolor: "#1c1f2a" }}>
        <Skills />
      </Box>

      {/* Onda Skills → Projects */}
      <Box sx={{ lineHeight: 0 }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#f5f5f5"
            d="M0,64L60,69.3C120,75,240,85,360,101.3C480,117,600,139,720,138.7C840,139,960,117,1080,117.3C1200,117,1320,139,1380,149.3L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>
      </Box>

      {/* Projects */}
      <Box id="projects" sx={{ py: 10, bgcolor: "#f5f5f5" }}>
        <Projects />
      </Box>

      {/* Onda Projects → Certifications */}
      <Box sx={{ lineHeight: 0 }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#e8f0ff"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,229.3C960,256,1056,256,1152,250.7C1248,245,1344,235,1392,229.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </Box>

      {/* Certifications */}
      <Box id="certifications" sx={{ py: 10, bgcolor: "#e8f0ff" }}>
        <Certifications />
      </Box>

      {/* Onda Certifications → Contact */}
      <Box sx={{ lineHeight: 0 }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0d1117"
            d="M0,64L40,101.3C80,139,160,213,240,213.3C320,213,400,139,480,138.7C560,139,640,213,720,229.3C800,245,880,203,960,192C1040,181,1120,203,1200,192C1280,181,1360,139,1400,117.3L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          />
        </svg>
      </Box>

      {/* Contact */}
      <Box id="contact" sx={{ py: 10, bgcolor: "#0d1117" }}>
        <Contact />
      </Box>

      <Footer />
    </>
  );
}

export default App;
