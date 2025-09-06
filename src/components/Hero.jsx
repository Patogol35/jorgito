import { Container, Typography, Box, Avatar, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";

export default function Hero() {
  const viewCV = () => {
    window.open("/Jorge.CV.pdf", "_blank");
  };

  return (
    <Box
      id="hero"
      sx={{
        minHeight: { xs: "90vh", md: "80vh" }, // menos alto en PC
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)",
        py: { xs: 6, sm: 8, md: 10 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // 👈 columna en móvil, fila en PC
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 4, md: 8 },
          }}
        >
          {/* Avatar con animación */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
            style={{ display: "inline-block", borderRadius: "50%" }}
          >
            <Avatar
              src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
              alt="Jorge"
              sx={{
                width: { xs: 140, md: 200, lg: 220 },
                height: { xs: 140, md: 200, lg: 220 },
                border: "3px solid #1976d2",
                boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
              }}
            />
          </motion.div>

          {/* Texto */}
          <Box textAlign={{ xs: "center", md: "left" }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: { xs: "1.8rem", md: "2.5rem", lg: "2.8rem" },
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
                  left: { xs: "50%", md: "0%" },
                  bottom: -6,
                  transform: { xs: "translateX(-50%)", md: "none" },
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
                fontSize: { xs: "1rem", md: "1.3rem", lg: "1.5rem" },
              }}
            >
              🎓 Máster en Ingeniería de Software y Sistemas Informáticos
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{
                maxWidth: 700,
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
            <Stack direction="row" justifyContent={{ xs: "center", md: "flex-start" }}>
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
          </Box>
        </Box>
      </Container>
    </Box>
  );
    }
