import { Container, Typography, Box, Paper, Stack } from "@mui/material";
import { motion } from "framer-motion";

export default function About() {
  return (
    <Box
      id="about"
      sx={{
        background: "linear-gradient(135deg, #0d1117, #1c1f2a)", // fondo oscuro premium
        py: 10,
        color: "#fff",
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 5,
              borderRadius: "20px",
              background: "rgba(25, 25, 35, 0.95)",
              color: "#fff",
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ color: "#ffeb3b" }}>
              Educación y Formación
            </Typography>

            <Stack spacing={4}>
              {/* Máster */}
              <Box>
                <Typography variant="h6" color="#42a5f5">
                  💻 Máster en Ingeniería de Software y Sistemas Informáticos
                </Typography>
                <Typography variant="body1">
                  Universidad Internacional de La Rioja, España
                </Typography>
                <Typography variant="body2" sx={{ color: "#ffeb3b" }}>
                  Nota TFM: 9 | Promedio final: 8.68
                </Typography>
              </Box>

              {/* Ingeniería */}
              <Box>
                <Typography variant="h6" color="#42a5f5">
                  🎓 Ingeniero en Sistemas
                </Typography>
                <Typography variant="body1">
                  Universidad Indoamérica, Ecuador
                </Typography>
                <Typography variant="body2" sx={{ color: "#ffeb3b" }}>
                  Nota Tesis: 9.50 | Promedio final: 9
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
