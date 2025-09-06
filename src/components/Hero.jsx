import { Container, Typography, Box, Avatar, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";

export default function Hero() {
  const viewCV = () => {
    window.open("/Jorge.CV.pdf", "_blank"); // abre en nueva pestaña
  };

  return (
    <Box
      id="hero"
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)",
        py: { xs: 6, sm: 8, md: 14 }, // 👈 menos espacio en móviles vertical
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg"> {/* 👈 más ancho en escritorio */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Avatar flotante */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
            style={{ display: "inline-block", borderRadius: "50%", marginBottom: "1.5rem" }}
          >
            <Avatar
              src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
              alt="Jorge"
              sx={{
                width: { xs: 140, md: 200, lg: 220 }, // 👈 más grande en PC
                height: { xs: 140, md: 200, lg: 220 },
                mx: "auto",
                border: "3px solid #1976d2",
                boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
              }}
            />
          </motion.div>

          {/* Nombre y título */}
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: "1.8rem", md: "2.5rem", lg: "2.8rem" }, // 👈 escala en PC
              color: "#1976d2",
              position: "relative",
              display: "inline-block",
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
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 500,
              color: "#1976d2",
              mb: 2,
              fontSize: { xs: "1rem", md: "1.3rem", lg: "1.5rem" }, // 👈 mejor escala
            }}
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
              fontSize: { xs: "0.95rem", md: "1.1rem", lg: "1.2rem" },
              lineHeight: 1.7,
            }}
          >
            Transformo ideas en soluciones digitales eficientes, seguras y escalables.  
            Apasionado por la innovación tecnológica, siempre buscando aportar valor  
            y optimizar procesos en cada proyecto.
          </Typography>

          {/* Botón CV */}
          <Stack direction="row" justifyContent="center">
            <Button
              variant="outlined"
              size="large"
              onClick={viewCV}
              sx={{
                border: "2px solid",
                borderColor: "#1976d2",
                color: "#1976d2",
                fontWeight: "bold",
                px: { xs: 4, md: 5 },
                py: 1.5,
                "&:hover": {
                  background: "linear-gradient(90deg, #1976d2, #6d28d9)",
                  color: "#fff",
                  borderColor: "#1976d2",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}
            >
              📄 Ver CV
            </Button>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
