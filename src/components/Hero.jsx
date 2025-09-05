
import { Container, Typography, Button } from "@mui/material";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <Container sx={{ textAlign: "center", py: 8 }}>
      <Typography variant="h3" gutterBottom>
        Hola, soy <strong>Andres</strong> 👋
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Desarrollador Web | Django | React
      </Typography>

      <div style={{ marginTop: 20 }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Mail size={18} />}
          href="mailto:andres@email.com"
          sx={{ mx: 1 }}
        >
          Contáctame
        </Button>
        <Button
          variant="outlined"
          startIcon={<Github size={18} />}
          href="https://github.com/tuusuario"
          target="_blank"
          sx={{ mx: 1 }}
        >
          GitHub
        </Button>
        <Button
          variant="outlined"
          startIcon={<Linkedin size={18} />}
          href="https://linkedin.com/in/tuusuario"
          target="_blank"
          sx={{ mx: 1 }}
        >
          LinkedIn
        </Button>
      </div>
    </Container>
  );
}
