import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { Box, Paper } from "@mui/material";

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
      <Paper
        elevation={4}
        sx={{
          m: 2,
          p: { xs: 3, md: 6 },
          borderRadius: 3,
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <Hero />
      </Paper>

      {/* About */}
      <Paper
        elevation={4}
        sx={{
          m: 2,
          p: { xs: 3, md: 6 },
          borderRadius: 3,
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <About />
      </Paper>

      {/* Skills */}
      <Paper
        elevation={4}
        sx={{
          m: 2,
          p: { xs: 3, md: 6 },
          borderRadius: 3,
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <Skills />
      </Paper>

      {/* Certifications */}
      <Paper
        elevation={4}
        sx={{
          m: 2,
          p: { xs: 3, md: 6 },
          borderRadius: 3,
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <Certifications />
      </Paper>

      {/* Contact */}
      <Paper
        elevation={4}
        sx={{
          m: 2,
          p: { xs: 3, md: 6 },
          borderRadius: 3,
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <Contact />
      </Paper>

      <Footer />
    </Box>
  );
}

export default App;
