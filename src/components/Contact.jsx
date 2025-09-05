import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";

const proyectos = [
  {
    titulo: "E-commerce con Django + React",
    descripcion: "Plataforma completa con carrito, pagos y autenticación JWT.",
    link: "#"
  },
  {
    titulo: "API con Django REST",
    descripcion: "API escalable con JWT y documentación con Swagger.",
    link: "#"
  },
  {
    titulo: "Frontend en React",
    descripcion: "UI moderna con Context API y Tailwind.",
    link: "#"
  },
];

export default function Projects() {
  return (
    <Container id="projects" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        🚀 Proyectos
      </Typography>
      <Grid container spacing={3}>
        {proyectos.map((p, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{ borderRadius: "16px", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{p.titulo}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {p.descripcion}
                </Typography>
                <Button variant="text" href={p.link} sx={{ mt: 2 }}>
                  Ver más
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
