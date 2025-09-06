import { Container, Typography, Box, Avatar, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      const yOffset = -70; // compensar navbar fijo
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/JorgePatricio_CV.pdf"; // Ruta a tu CV
    link.download = "JorgePatricio_CV.pdf";
    link.click();
  };

  return (
    <Box
      id="hero"
      sx={{
        background: "linear-gradient(135deg, #f5f5f5, #e8f0ff)",
        color: "#333",
        py: { xs: 8, md: 14 },
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="md">
        {/* Avatar flotante */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
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
                border: "3px solid #1976d2",
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Texto de presentación */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{
              color: "#1976d2",
              position: "relative",
              display: "inline-block",
              mb: 2,
            }}
          >
            Hola, soy Jorge Patricio Santamaría Cherrez
            <Box
              component="span"
              sx={{
                position: "absolute",
                left: "50%",
                bottom: -6,
                transform: "translateX(-50%)",
                width: "60%",
                height: "3px",
                background: "#1976d2",
                borderRadius: "6px",
              }}
            />
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
              onClick={() => scrollTo("#skills")}
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
              onClick={downloadCV}
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
              📄 Descargar CV
            </Button>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
