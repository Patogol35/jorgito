import { Container, Typography, Paper, Stack, Box } from "@mui/material";
import { motion } from "framer-motion";

// Variantes para animación en cascada
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
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
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Título animado */}
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
            mb: 8,
            fontWeight: "bold",
            color: "#0d47a1",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Educación y Formación
        </Typography>
      </motion.div>

      {/* Cards con efecto Glassmorphism */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Stack spacing={5}>
          {estudios.map((est, index) => (
            <motion.div key={index} variants={itemVariants}>
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
                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: "#1976d2",
                      fontSize: "1.25rem",
                    }}
                  >
                    {est.titulo}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#222", fontSize: "1rem", mb: 1 }}
                  >
                    {est.institucion}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#555",
                      fontWeight: "600",
                      fontSize: "0.95rem",
                    }}
                  >
                    {est.detalle}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          ))}
        </Stack>
      </motion.div>
    </Container>
  );
}
