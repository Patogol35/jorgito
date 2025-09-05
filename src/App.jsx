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
  background: "#f5f5f5", // fondo claro
  boxShadow: "0 8px 24px rgba(0,0,0,0.2)", // sombra para separar secciones
  color: "#000", // texto oscuro
};

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#eaeaea", // fondo general claro
      }}
    >
      <Navbar />

      {/* Hero */}
      <Paper elevation={4} sx={sectionStyles}>
        <Hero />
      </Paper>

      {/* About */}
      <Paper elevation={4} sx={sectionStyles}>
        <About />
      </Paper>

      {/* Skills */}
      <Paper elevation={4} sx={sectionStyles}>
        <Skills />
      </Paper>

      {/* Certifications */}
      <Paper elevation={4} sx={sectionStyles}>
        <Certifications />
      </Paper>

      {/* Contact */}
      <Paper elevation={4} sx={sectionStyles}>
        <Contact />
      </Paper>

      <Footer />
    </Box>
  );
}

export default App;
