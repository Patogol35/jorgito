import { Container, Typography, Box, Paper, Stack } from "@mui/material";
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
            <Typography variant="h4" gutterBottom>
              Educación y Formación
            </Typography>

            <Stack spacing={2}>
              <Box>
                <Typography variant="h6" color="primary">
                  💻 Máster en Ingeniería de Software y Sistemas Informáticos
                </Typography>
                <Typography variant="body1">
                  Universidad Internacional de La Rioja, España
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nota sobresaliente 9/10 en el Trabajo Fin de Máster
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" color="primary">
                  🎓 Ingeniero en Sistemas
                </Typography>
                <Typography variant="body1">
                  Universidad Indoamérica, Ecuador
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Promedio final: 8.68/10
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
