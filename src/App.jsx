import {
  Container,
  Typography,
  Box,
  Avatar,
  Button,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5f5f5, #e8f0ff)", // Fondo claro
        color: "#333",
        py: { xs: 8, md: 12 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
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
              width: 180,
              height: 180,
              mx: "auto",
              mb: 3,
              border: "4px solid white",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
          />
        </motion.div>

        {/* Texto de presentación */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
          >
            Hola, soy <span style={{ color: "#1976d2" }}>Jorge Santamaría</span>
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 500, color: "#1976d2", mb: 2 }}
          >
            💻 Full Stack Developer | DevOps Enthusiast
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{ maxWidth: 700, mx: "auto", opacity: 0.8, mb: 3 }}
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
                background: "#1976d2",
                fontWeight: "bold",
                px: 4,
                "&:hover": { background: "#125aa0" },
              }}
            >
              ⚡ Tecnologías
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="#contact"
              sx={{
                borderColor: "#1976d2",
                color: "#1976d2",
                fontWeight: "bold",
                px: 4,
                "&:hover": { background: "#1976d2", color: "#fff" },
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
