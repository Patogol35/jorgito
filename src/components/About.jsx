import { Container, Typography, Box, Paper, Stack, Avatar } from "@mui/material";
import { motion } from "framer-motion";

export default function About() {
  return (
    <Box
      id="about"
      sx={{
        background: "linear-gradient(135deg, #f5f5f5, #e0e0e0)",
        py: 10,
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: "16px",
              background: "rgba(255,255,255,0.9)",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={4}
              alignItems="center"
            >
              {/* Foto o avatar */}
              <Avatar
                alt="Jorge Patricio Santamaría Cherrez"
                src="/profile.jpg" // Aquí puedes poner tu foto en public/profile.jpg
                sx={{ width: 150, height: 150, boxShadow: 3 }}
              />

              {/* Texto de presentación */}
              <Box>
                <Typography variant="h4" gutterBottom>
                  Hola! Soy Jorge Patricio Santamaría Cherrez
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  💻 Máster en Ingeniería de Software y Sistemas Informáticos
                </Typography>
                <Typography variant="body1" paragraph>
                  📍 Apasionado por el desarrollo Full Stack, la gestión de entornos DevOps 
                  y la Innovación Tecnologíca.
                </Typography>
                <Typography variant="body1" paragraph>
                  Me destaco por integrar soluciones innovadoras, optimizar procesos y aportar 
                  valor en cada proyecto mediante un enfoque estratégico y orientado a resultados. 
                  Mi compromiso es transformar ideas en aplicaciones eficientes, seguras y escalables, 
                  siempre buscando la excelencia y el crecimiento continuo.
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
