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
  Box,
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
    <Box
      id="projects"
      sx={{
        background: "linear-gradient(135deg, #f5f5f5, #e8f0ff)",
        py: 10,
      }}
    >
      <Container>
        {/* Título animado */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2", mb: 5 }}
          >
            🚀 Proyectos destacados
          </Typography>

          <Grid container spacing={4}>
            {proyectos.map((p, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card
                    sx={{
                      borderRadius: "16px",
                      boxShadow: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={p.imagen}
                      alt={p.titulo}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                        {p.titulo}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {p.descripcion}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ mb: 2, flexWrap: "wrap" }}
                      >
                        {p.tags.map((tag, idx) => (
                          <Chip
                            key={idx}
                            label={tag}
                            size="small"
                            sx={{
                              backgroundColor: "#e3f2fd",
                              fontWeight: "bold",
                              "&:hover": { backgroundColor: "#bbdefb" },
                            }}
                          />
                        ))}
                      </Stack>
                      <Button
                        variant="contained"
                        color="primary"
                        href={p.link}
                        sx={{
                          textTransform: "none",
                          fontWeight: "bold",
                          "&:hover": { backgroundColor: "#1565c0" },
                        }}
                      >
                        Ver más
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
