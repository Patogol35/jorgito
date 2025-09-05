// components/Projects.jsx
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";

const proyectos = [
  {
    titulo: "E-commerce con Django + React",
    descripcion: "Plataforma completa con carrito, pagos y autenticación JWT.",
    imagen: "/assets/ecommerce.png",
    link: "#",
    tags: ["Django", "React", "JWT"],
  },
  {
    titulo: "API con Django REST",
    descripcion: "API escalable con JWT y documentación con Swagger.",
    imagen: "/assets/api.png",
    link: "#",
    tags: ["Django REST", "Swagger", "JWT"],
  },
  {
    titulo: "Frontend en React",
    descripcion: "UI moderna con Context API y Tailwind.",
    imagen: "/assets/frontend.png",
    link: "#",
    tags: ["React", "Tailwind", "Context API"],
  },
];

export default function Projects() {
  return (
    <Container id="projects" sx={{ py: 10 }}>
      <Typography variant="h4" gutterBottom>
        🚀 Proyectos
      </Typography>
      <Grid container spacing={4}>
        {proyectos.map((p, i) => (
          <Grid item xs={12} md={4} key={i}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia component="img" height="180" image={p.imagen} alt={p.titulo} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{p.titulo}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {p.descripcion}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
                    {p.tags.map((tag, idx) => (
                      <Chip key={idx} label={tag} size="small" />
                    ))}
                  </Stack>
                  <Button variant="contained" href={p.link}>
                    Ver más
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
