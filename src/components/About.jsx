import { Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SchoolIcon from "@mui/icons-material/School";
import { useTheme } from "@mui/material/styles";

const estudios = [
  {
    titulo: "💻 Máster en Ingeniería de Software y Sistemas Informáticos",
    institucion: "Universidad Internacional de La Rioja, España",
    detalle: "Nota TFM: 9 | Promedio final: 8.68",
    iconColor: "#1976d2",
  },
  {
    titulo: "💻 Ingeniero en Sistemas",
    institucion: "Universidad Indoamérica, Ecuador",
    detalle: "Nota Tesis: 9.50 | Promedio final: 9",
    iconColor: "#9333ea",
  },
];

export default function About() {
  const theme = useTheme();

  return (
    <Box
      id="about"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: theme.palette.text.primary,
      }}
    >
      {/* Encabezado tipo badge con texto */}
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
    background: isDark
      ? "rgba(144,202,249,0.1)"
      : "rgba(25,118,210,0.1)",
  }}
>
  <SchoolIcon
    sx={{
      fontSize: 26,
      mr: 1.2, // espacio a la derecha del icono
      color: isDark ? "#bbdefb" : "#1976d2",
    }}
  />
  <Typography
    variant="h6"
    sx={{
      fontWeight: "bold",
      color: isDark ? "#bbdefb" : "#1976d2",
    }}
  >
    Formación Académica 
  </Typography>
</Box>
      </motion.div>

      {/* Grid */}
      <Grid container spacing={3} justifyContent="center">
        {estudios.map((est, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.3 }}
              viewport={{ once: false }}
            >
              <Box sx={{ textAlign: "center", px: 1 }}>
                <GraduationCap size={28} color={est.iconColor} />
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mt: 1 }}
                >
                  {est.titulo}
                </Typography>
                <Typography
                  variant="body2"
                  color={theme.palette.text.secondary}
                >
                  {est.institucion}
                </Typography>
                <Typography
                  variant="body2"
                  color={theme.palette.text.secondary}
                >
                  {est.detalle}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
