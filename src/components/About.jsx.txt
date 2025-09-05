
import { Container, Typography, Paper } from "@mui/material";

export default function About() {
  return (
    <Container id="about" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: "16px" }}>
        <Typography variant="h4" gutterBottom>
          Sobre mí
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Soy un desarrollador apasionado por crear aplicaciones modernas y escalables.
          Tengo experiencia en Django REST Framework, React, y despliegues en la nube con Render y Vercel.
        </Typography>
      </Paper>
    </Container>
  );
}
