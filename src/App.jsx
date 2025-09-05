import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { Box, Paper } from "@mui/material";

const paperStyles = {
  m: 2,
  p: { xs: 3, md: 6 },
  borderRadius: 3,
  backdropFilter: "blur(12px)",
  background: "rgba(25,25,30,0.85)", // más contraste para que el texto se vea
  color: "#fff", // asegurar texto blanco
};

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0d1117 0%, #1a1c23 100%)", // fondo global oscuro degradado
        color: "#fff",
      }}
    >
      <Navbar />

      {/* Hero */}
      <Paper elevation={4} sx={paperStyles}>
        <Hero />
      </Paper>

      {/* About */}
      <Paper elevation={4} sx={paperStyles}>
        <About />
      </Paper>

      {/* Skills */}
      <Paper elevation={4} sx={paperStyles}>
        <Skills />
      </Paper>

      {/* Certifications */}
      <Paper elevation={4} sx={paperStyles}>
        <Certifications />
      </Paper>

      {/* Contact */}
      <Paper elevation={4} sx={paperStyles}>
        <Contact />
      </Paper>

      <Footer />
    </Box>
  );
}

export default App;
