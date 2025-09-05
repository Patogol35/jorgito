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
      {/* Título impactante */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ textAlign: "center", marginBottom: "4rem", position: "relative" }}
      >
        {/* Decoración geométrica */}
        <Box
          sx={{
            position: "absolute",
            top: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "6px",
            borderRadius: "3px",
            background: "linear-gradient(90deg, #42a5f5, #1976d2)",
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
            textShadow: "0px 2px 6px rgba(25,118,210,0.4)",
          }}
        >
          Educación y Formación
        </Typography>

        {/* Línea animada debajo */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "200px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            height: "5px",
            margin: "14px auto 0",
            borderRadius: "3px",
            background: "linear-gradient(90deg, #1976d2, #42a5f5, #00e5ff)",
          }}
        />
      </motion.div>

      {/* Tarjetas */}
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
                background: "rgba(255, 255, 255, 0.75)",
                backdropFilter: "blur(12px)",
                border: "2px solid transparent",
                backgroundImage:
                  "linear-gradient(white, white), linear-gradient(135deg, #1976d2, #42a5f5)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                transition: "all 0.4s ease",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
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
