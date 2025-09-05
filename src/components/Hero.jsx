import { Container, Typography, Box, Avatar, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5f5f5, #e8f0ff)",
        color: "#333",
        py: { xs: 8, md: 14 },
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="md">
        {/* Imagen/Avatar con animación flotante y borde neón degradado */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
            style={{ display: "inline-block", borderRadius: "50%" }}
          >
            <Avatar
              src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
              alt="Jorge"
              sx={{
                width: { xs: 140, md: 180 },
                height: { xs: 140, md: 180 },
                mx: "auto",
                mb: 3,
                border: "4px solid",
                borderImage: "linear-gradient(45deg, #1976d2, #ffeb3b, #e91e63) 1",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Texto de presentación */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              lineHeight: 1.2,
            }}
          >
            Hola, soy{" "}
            <Box
              component="span"
              sx={{
                color: "#1976d2", // Azul profesional
              }}
            >
              Jorge Patricio Santamaría Cherrez
            </Box>
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 500, color: "#1976d2", mb: 2 }}
          >
            🎓 Máster en Ingeniería de Software y Sistemas Informáticos
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{
              maxWidth: 700,
              mx: "auto",
              opacity: 0.85,
              mb: 4,
              fontSize: { xs: "0.95rem", md: "1.1rem" },
            }}
          >
            Transformo ideas en soluciones digitales eficientes, seguras y
            escalables. Apasionado por la innovación tecnológica, siempre
            buscando aportar valor y optimizar procesos en cada proyecto.
          </Typography>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center"
            spacing={2}
          >
            <Button
              variant="contained"
              size="large"
              href="#skills"
              sx={{
                background: "linear-gradient(90deg, #1976d2, #6d28d9)",
                fontWeight: "bold",
                px: 5,
                "&:hover": { background: "linear-gradient(90deg, #125aa0, #4f46e5)" },
              }}
            >
              ⚡ Tecnologías
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="#contact"
              sx={{
                border: "2px solid",
                borderColor: "#1976d2",
                color: "#1976d2",
                fontWeight: "bold",
                px: 5,
                "&:hover": {
                  background: "linear-gradient(90deg, #1976d2, #6d28d9)",
                  color: "#fff",
                  borderColor: "#1976d2",
                },
              }}
            >
              📩 Contacto
            </Button>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
