import { Container, Typography, Box, Paper, Stack } from "@mui/material";
import { motion } from "framer-motion";

export default function About() {
  const estudios = [
    {
      titulo: "💻 Máster en Ingeniería de Software y Sistemas Informáticos",
      institucion: "Universidad Internacional de La Rioja, España",
      detalle: "Nota TFM: 9 | Promedio final: 8.68",
    },
    {
      titulo: "🎓 Ingeniero en Sistemas",
      institucion: "Universidad Indoamérica, Ecuador",
      detalle: "Nota Tesis: 9.50 | Promedio final: 9",
    },
  ];

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 6, // Este margen es interno solo del título
            fontWeight: "bold",
            color: "#1976d2",
          }}
        >
          Educación y Formación
        </Typography>

        <Stack spacing={4}>
          {estudios.map((est, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: "16px",
                  background: "#fff",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#1976d2" }}
                >
                  {est.titulo}
                </Typography>
                <Typography variant="body1" sx={{ color: "#333" }}>
                  {est.institucion}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", fontWeight: "500" }}
                >
                  {est.detalle}
                </Typography>
              </Paper>
            </motion.div>
          ))}
        </Stack>
      </motion.div>
    </Container>
  );
          }
