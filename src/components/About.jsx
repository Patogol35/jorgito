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
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Título mejorado con gradient + underline animado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ textAlign: "center", marginBottom: "3rem" }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: 2,
            background: "linear-gradient(90deg, #1976d2, #42a5f5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Educación y Formación
        </Typography>

        {/* Subrayado animado */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "120px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            height: "4px",
            margin: "8px auto 0",
            borderRadius: "2px",
            background: "linear-gradient(90deg, #1976d2, #42a5f5)",
          }}
        />
      </motion.div>

      {/* Aquí siguen tus tarjetas de estudios */}
      <Stack spacing={5}>
        {estudios.map((est, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.65)",
                backdropFilter: "blur(10px)",
                border: "2px solid transparent",
                backgroundImage:
                  "linear-gradient(white, white), linear-gradient(135deg, #1976d2, #42a5f5)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                transition: "all 0.4s ease",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
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
              <Typography variant="body1" sx={{ color: "#222" }}>
                {est.institucion}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#555", fontWeight: "600" }}
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
