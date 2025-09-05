import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { Box, Paper, Container } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #f5f7fa 0%, #e6ebf0 100%)", // fondo claro degradado
        color: "#111", // <-- ahora el texto es oscuro
      }}
    >
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Hero */}
        <Paper
          elevation={6}
          sx={{
            mb: 4,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#ffffff", // fondo blanco limpio
            color: "#111", // texto oscuro
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <Hero />
        </Paper>

        {/* About */}
        <Paper
          elevation={3}
          sx={{
            mb: 4,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#ffffff",
            color: "#111",
          }}
        >
          <About />
        </Paper>

        {/* Skills */}
        <Paper
          elevation={3}
          sx={{
            mb: 4,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#ffffff",
            color: "#111",
          }}
        >
          <Skills />
        </Paper>

        {/* Certifications */}
        <Paper
          elevation={3}
          sx={{
            mb: 4,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#ffffff",
            color: "#111",
          }}
        >
          <Certifications />
        </Paper>

        {/* Contact */}
        <Paper
          elevation={3}
          sx={{
            mb: 4,
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: "#ffffff",
            color: "#111",
          }}
        >
          <Contact />
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
}

export default App;
