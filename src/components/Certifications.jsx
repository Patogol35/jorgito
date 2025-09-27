import { Typography, Grid, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Brain } from "lucide-react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const certificaciones = [
  { titulo: "Curso de React.js", institucion: "Platzi", año: 2025, iconColor: "#1976d2", iconType: BookOpen },
  { titulo: "React & TypeScript - The Practical Guide", institucion: "Udemy", año: 2024, iconColor: "#d97706", iconType: BookOpen },
  { titulo: "Curso de Python", institucion: "Platzi", año: 2025, iconColor: "#22c55e", iconType: BookOpen },
  { titulo: "Data Analysis with Python", institucion: "freeCodeCamp", año: 2024, iconColor: "#9333ea", iconType: Brain },
  { titulo: "Fundamentos de la Inteligencia Artificial", institucion: "IBM", año: 2025, iconColor: "#1e40af", iconType: Brain },
  { titulo: "Curso de Preparación para la Certificación AZ900: Microsoft Azure Fundamentals", institucion: "Universidad Internacional de la Rioja", año: 2023, iconColor: "#e11d48", iconType: GraduationCap },
];

export default function Certifications() {
  const { palette } = useTheme();
  const isDark = palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";
  const badgeBg = isDark ? "rgba(144,202,249,0.1)" : "rgba(25,118,210,0.1)";

  return (
    <Box
      id="certifications"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: palette.text.primary,
      }}
    >
      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            px: 4,
            py: 1.2,
            borderRadius: "999px",
            background: badgeBg,
          }}
        >
          <WorkspacePremiumIcon sx={{ fontSize: 26, mr: 1.2, color: primaryColor }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", color: primaryColor }}>
            Certificaciones
          </Typography>
        </Box>
      </motion.div>

      {/* Grid de certificaciones */}
      <Grid container spacing={3} justifyContent="center">
        {certificaciones.map(({ titulo, institucion, año, iconColor, iconType: Icon }, i) => (
          <Grid item xs={12} sm={6} md={4} key={titulo}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <Box sx={{ textAlign: "center", px: 1 }}>
                <Icon size={28} color={iconColor} />
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
                  {titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {institucion} | {año}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
              }
