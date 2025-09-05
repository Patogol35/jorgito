import { Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Brain } from "lucide-react";

const certificaciones = [
  { titulo: "Curso de React.js", institucion: "Platzi", año: 2025, icon: <BookOpen size={28} color="#1976d2" /> },
  { titulo: "React & TypeScript - The Practical Guide", institucion: "Udemy", año: 2024, icon: <BookOpen size={28} color="#d97706" /> },
  { titulo: "Curso de Python", institucion: "Platzi", año: 2025, icon: <BookOpen size={28} color="#22c55e" /> },
  { titulo: "Data Analysis with Python", institucion: "freeCodeCamp", año: 2024, icon: <Brain size={28} color="#9333ea" /> },
  { titulo: "Fundamentos de la Inteligencia Artificial", institucion: "IBM", año: 2025, icon: <Brain size={28} color="#1e40af" /> },
  { titulo: "IA y Universidad: Docencia, Investigación y Transferencia", institucion: "UNIR & ESPE", año: 2024, icon: <GraduationCap size={28} color="#e11d48" /> },
];

export default function Certifications() {
  return (
    <Box id="certifications" sx={{ py: 4 }}>
      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "1rem" }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            color: "#1976d2",
            position: "relative",
            display: "inline-block",
          }}
        >
          Certificaciones
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
      </motion.div>

      {/* Grid */}
      <Grid container spacing={3} justifyContent="center">
        {certificaciones.map((c, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <Box sx={{ textAlign: "center", px: 1 }}>
                {c.icon}
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
                  {c.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {c.institucion} | {c.año}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
