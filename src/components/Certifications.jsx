import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import { motion } from "framer-motion";

const certificaciones = [
  {
    titulo: "React & TypeScript - The Practical Guide",
    institucion: "Udemy",
    año: 2024,
  },
  {
    titulo: "Data Analysis with Python",
    institucion: "freeCodeCamp",
    año: 2024,
  },
  {
    titulo: "Fundamentos de la Inteligencia Artificial",
    institucion: "IBM",
    año: 2024,
  },
  {
    titulo: "Aprendizaje automático y aprendizaje profundo con Python",
    institucion: "Cursa",
    año: 2024,
  },
  {
    titulo: "Curso de Programación Básica",
    institucion: "Platzi",
    año: 2024,
  },
  {
    titulo: "Curso de Preparación para la Certificación AZ-900: Microsoft Azure Fundamentals",
    institucion: "Universidad Internacional de La Rioja (UNIR)",
    año: 2024,
  },
];

export default function Certifications() {
  return (
    <Box
      id="certifications"
      sx={{
        background: "linear-gradient(135deg, #f5f5f5, #e8f0ff)",
        py: 10,
      }}
    >
      <Container>
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2", mb: 5 }}
          >
            🎓 Certificaciones
          </Typography>

          {/* Grid centrado */}
          <Grid container spacing={4} justifyContent="center">
            {certificaciones.map((c, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Paper
                    elevation={6}
                    sx={{
                      p: 3,
                      borderRadius: "16px",
                      textAlign: "center",
                      background: "#fff",
                      cursor: "default",
                      transition: "0.3s",
                      "&:hover": { background: "#e3f2fd" },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      {c.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {c.institucion} | {c.año}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
                }
