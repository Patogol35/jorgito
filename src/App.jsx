import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { Box, Paper } from "@mui/material";

// Estilos comunes para cada sección Paper
const sectionStyles = {
  m: { xs: 3, md: 6 },
  p: { xs: 4, md: 8 },
  borderRadius: 4,
  backdropFilter: "blur(12px)",
  background: "rgba(40,40,50,0.95)", // fondo más opaco y contraste
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.5)", // sombra para separar del fondo
  color: "#fff",
  "& *": {
    color: "#fff",
    textShadow: "0 0 6px rgba(0,0,0,0.7)", // mejora la legibilidad del texto
  },
};

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0d1117 0%, #1a1c23 100%)",
        color: "#fff",
      }}
    >
      <Navbar />

      {/* Hero */}
      <Paper elevation={6} sx={sectionStyles}>
        <Hero />
      </Paper>

      {/* About */}
      <Paper elevation={6} sx={sectionStyles}>
        <About />
      </Paper>

      {/* Skills */}
      <Paper elevation={6} sx={sectionStyles}>
        <Skills />
      </Paper>

      {/* Certifications */}
      <Paper elevation={6} sx={sectionStyles}>
        <Certifications />
      </Paper>

      {/* Contact */}
      <Paper elevation={6} sx={sectionStyles}>
        <Contact />
      </Paper>

      <Footer />
    </Box>
  );
}

export default App;
