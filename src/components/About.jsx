import {
  Container,
  Typography,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";

export default function About() {
  const estudios = [
    {
      titulo: "💻 Máster en Ingeniería de Software y Sistemas Informáticos",
      institucion: "Universidad Internacional de La Rioja, España",
      detalle: "Nota TFM: 9 | Promedio final: 8.68",
      color: "#42a5f5",
    },
    {
      titulo: "🎓 Ingeniero en Sistemas",
      institucion: "Universidad Indoamérica, Ecuador",
      detalle: "Nota Tesis: 9.50 | Promedio final: 9",
      color: "#42a5f5",
    },
  ];

  return (
    <Box
      id="about"
      sx={{
        background: "linear-gradient(135deg, #0d1117, #1c1f2a)",
        py: 10,
        color: "#fff",
      }}
    >
      <Container maxWidth="md">
        {/* Contenedor principal animado */}
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
              mb: 6,
              fontWeight: "bold",
              color: "#ffeb3b",
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
                  elevation={6}
                  sx={{
                    p: 4,
                    borderRadius: "20px",
                    background: "rgba(25, 25, 35, 0.95)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: est.color }}
                  >
                    {est.titulo}
                  </Typography>
                  <Typography variant="body1">{est.institucion}</Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#ffeb3b", fontWeight: "500" }}
                  >
                    {est.detalle}
                  </Typography>
                </Paper>
              </motion.div>
            ))}
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
