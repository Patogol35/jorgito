import { Typography, Grid, Box, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Brain } from "lucide-react";
import { useTheme } from "@mui/material/styles";

const certificaciones = [
  { titulo: "Curso de React.js", institucion: "Platzi", año: 2025, iconColor: "#1976d2", iconType: BookOpen },
  { titulo: "React & TypeScript - The Practical Guide", institucion: "Udemy", año: 2024, iconColor: "#d97706", iconType: BookOpen },
  { titulo: "Curso de Python", institucion: "Platzi", año: 2025, iconColor: "#22c55e", iconType: BookOpen },
  { titulo: "Data Analysis with Python", institucion: "freeCodeCamp", año: 2024, iconColor: "#9333ea", iconType: Brain },
  { titulo: "Fundamentos de la Inteligencia Artificial", institucion: "IBM", año: 2025, iconColor: "#1e40af", iconType: Brain },
  { titulo: "Curso de Preparación para la Certificación AZ900: Microsoft Azure Fundamentals", institucion: "Universidad Internacional de la Rioja", año: 2023, iconColor: "#e11d48", iconType: GraduationCap },
];

export default function Certifications() {
  const theme = useTheme();

  return (
    <Box
      id="certifications"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: theme.palette.text.primary,
      }}
    >
      {/* Badge del título */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "3rem" }}
      >
        <Paper
          elevation={6}
          sx={{
            display: "inline-block",
            px: 3,
            py: 1,
            borderRadius: "30px",
            background: "linear-gradient(90deg, #2563eb, #9333ea)", // igual a los otros
            color: "white",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Certificaciones
          </Typography>
        </Paper>
      </motion.div>

      {/* Grid de certificaciones */}
      <Grid container spacing={3} justifyContent="center">
        {certificaciones.map((c, i) => {
          const IconComponent = c.iconType;
          return (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <Box sx={{ textAlign: "center", px: 1 }}>
                  <IconComponent size={28} color={c.iconColor} />
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
                    {c.titulo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {c.institucion} | {c.año}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
