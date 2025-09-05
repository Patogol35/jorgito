import { Container, Typography, Stack, Paper, Box } from "@mui/material";
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
    <Container maxWidth="md" sx={{ py: 10 }}>
      {/* Título con gradiente igual a Certificaciones */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "4rem" }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 6,
            background: "linear-gradient(90deg, #1976d2, #6d28d9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            position: "relative",
            display: "inline-block",
          }}
        >
          Educación y Formación
          <Box
            component="span"
            sx={{
              position: "absolute",
              left: 0,
              bottom: -6,
              width: "100%",
              height: "4px",
              background: "linear-gradient(90deg, #1976d2, #6d28d9)",
              borderRadius: "8px",
            }}
          />
        </Typography>
      </motion.div>

      {/* Tarjetas de Educación */}
      <Stack spacing={5}>
        {estudios.map((est, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Paper
              elevation={10}
              sx={{
                p: 4,
                borderRadius: "20px",
                textAlign: "center",
                backdropFilter: "blur(10px)",
                background: "rgba(255, 255, 255, 0.7)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                cursor: "default",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
                  transform: "translateY(-5px) scale(1.02)",
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
              <Typography variant="body1" sx={{ color: "#333", mb: 1 }}>
                {est.institucion}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#555", fontWeight: 500 }}
              >
                {est.detalle}
              </Typography>
            </Paper>
          </motion.div>
        ))}
      </Stack>
    </Container>
  );
}
