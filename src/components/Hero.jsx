import { Container, Typography, Box, Avatar, Button, Stack, Grid } from "@mui/material";
import { motion } from "framer-motion";

export default function Hero() {
  const viewCV = () => {
    window.open("/Jorge.CV.pdf", "_blank");
  };

  return (
    <Box
      id="hero"
      sx={{
        minHeight: { xs: "85vh", md: "70vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)",
        py: { xs: 6, md: 10 },
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={6}
          alignItems="center"
          justifyContent="center"
        >
          {/* Columna Avatar */}
          <Grid item xs={12} md={5} sx={{ position: "relative" }}>
            {/* Fondo decorativo */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: 260, md: 340 },
                height: { xs: 260, md: 340 },
                borderRadius: "50%",
                background: "radial-gradient(circle at 30% 30%, #93c5fd 0%, transparent 70%)",
                filter: "blur(40px)",
                zIndex: 0,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "20%",
                left: "60%",
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "radial-gradient(circle, #c4b5fd 0%, transparent 70%)",
                filter: "blur(30px)",
                zIndex: 0,
              }}
            />

            {/* Avatar animado */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
              style={{
                display: "inline-block",
                borderRadius: "50%",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Avatar
                src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
                alt="Jorge"
                sx={{
                  width: { xs: 160, md: 220 },
                  height: { xs: 160, md: 220 },
                  mx: { xs: "auto", md: 0 },
                  border: "4px solid #1976d2",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
                }}
              />
            </motion.div>
          </Grid>

          {/* Columna Texto */}
          <Grid item xs={12} md={7} textAlign={{ xs: "center", md: "left" }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#1976d2", position: "relative", display: "inline-block" }}
              >
                Hola, soy Jorge Patricio Santamaría Cherrez
                <Box
                  component="span"
                  sx={{
                    position: "absolute",
                    left: { xs: "50%", md: 0 },
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
                sx={{ fontWeight: 500, color: "#1976d2", mb: 2 }}
              >
                🎓 Máster en Ingeniería de Software y Sistemas Informáticos
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  maxWidth: 600,
                  opacity: 0.85,
                  mb: 4,
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  lineHeight: 1.6,
                }}
              >
                Transformo ideas en soluciones digitales eficientes, seguras y escalables. 
                Apasionado por la innovación tecnológica, siempre buscando aportar valor 
                y optimizar procesos en cada proyecto.
              </Typography>

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
                    px: { xs: 4, md: 6 },
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
