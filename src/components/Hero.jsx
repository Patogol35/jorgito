
import { Container, Typography, Box, Avatar } from "@mui/material";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1976d2, #42a5f5)",
        color: "#fff",
        py: 10,
        textAlign: "center",
      }}
    >
      <Container>
        {/* Imagen/Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Avatar
            src="/assets/profile.png"
            alt="Jorge"
            sx={{
              width: 150,
              height: 150,
              mx: "auto",
              mb: 3,
              border: "4px solid white",
              boxShadow: 3,
            }}
          />
        </motion.div>

        {/* Texto de presentación */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Hola! Soy Jorge Patricio Santamaría Cherrez
          </Typography>

          <Typography variant="h5" color="secondary" gutterBottom>
            💻 Máster en Ingeniería de Software y Sistemas Informáticos
          </Typography>

          <Typography variant="body1" paragraph sx={{ maxWidth: 700, mx: "auto", opacity: 0.9 }}>
            📍 Apasionado por el desarrollo Full Stack, la gestión de entornos DevOps
            y la Innovación Tecnológica.
          </Typography>

          <Typography variant="body1" paragraph sx={{ maxWidth: 700, mx: "auto", opacity: 0.9 }}>
            Me destaco por integrar soluciones innovadoras, optimizar procesos y aportar valor en cada proyecto mediante un enfoque estratégico y orientado a resultados. 
            Mi compromiso es transformar ideas en aplicaciones eficientes, seguras y escalables, siempre buscando la excelencia y el crecimiento continuo.
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}
