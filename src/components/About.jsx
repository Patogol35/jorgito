import { Container, Typography, Paper, Stack } from "@mui/material";
import { motion } from "framer-motion";

// Variantes para animaciones en cascada
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // efecto cascada
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

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
      {/* Título con fade elegante */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 6,
            fontWeight: "bold",
            color: "#1976d2",
            letterSpacing: 1,
          }}
        >
          Educación y Formación
        </Typography>
      </motion.div>

      {/* Contenedor con efecto cascada */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Stack spacing={4}>
          {estudios.map((est, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #ffffff, #f7f9fc)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
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
