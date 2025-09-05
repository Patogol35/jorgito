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
      {/* Título uniforme */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "4rem" }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#1976d2",
          }}
        >
          🎓 Educación y Formación
        </Typography>

        {/* Línea decorativa */}
        <Box
          sx={{
            height: "4px",
            width: "60px",
            background: "linear-gradient(90deg, #1976d2, #42a5f5)",
            borderRadius: "2px",
            margin: "12px auto 0",
          }}
        />
      </motion.div>

      {/* Tarjetas con degradado hover */}
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
              elevation={3}
              sx={{
                p: 4,
                borderRadius: "16px",
                background: "#fff",
                transition: "all 0.4s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-6px) scale(1.03)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
                  background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
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
    </Container>
  );
}
