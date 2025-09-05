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
    <Container maxWidth="md" sx={{ py: 12 }}>
      {/* Título impactante */}
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ textAlign: "center", marginBottom: "5rem", position: "relative" }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-25px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100px",
            height: "6px",
            borderRadius: "3px",
            background: "linear-gradient(90deg, #42a5f5, #1976d2, #6d28d9)",
          }}
        />

        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontSize: { xs: "2rem", md: "3.5rem" },
            background: "linear-gradient(90deg, #1976d2, #42a5f5, #00e5ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0px 3px 8px rgba(25,118,210,0.3)",
          }}
        >
          Educación y Formación
        </Typography>

        {/* Línea animada */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "220px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            height: "6px",
            margin: "16px auto 0",
            borderRadius: "3px",
            background: "linear-gradient(90deg, #1976d2, #42a5f5, #00e5ff)",
          }}
        />
      </motion.div>

      {/* Tarjetas con efecto premium */}
      <Stack spacing={6}>
        {estudios.map((est, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 5,
                borderRadius: "20px",
                background: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(14px)",
                border: "2px solid transparent",
                backgroundImage:
                  "linear-gradient(white, white), linear-gradient(135deg, #1976d2, #42a5f5, #6d28d9)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                transition: "all 0.5s ease",
                "&:hover": {
                  transform: "translateY(-10px) scale(1.03)",
                  boxShadow: "0 14px 36px rgba(0,0,0,0.25)",
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#1976d2", mb: 1 }}
              >
                {est.titulo}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#222", mb: 1 }}
              >
                {est.institucion}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#555", fontWeight: 600 }}
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
