import { Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useTheme } from "@mui/material/styles";

const estudios = [
  {
    titulo: "Máster en Ingeniería de Software y Sistemas Informáticos",
    institucion: "Universidad Internacional de La Rioja, España",
    detalle: "Nota TFM: 9 | Promedio final: 8.68",
    iconColor: "#1976d2",
  },
  {
    titulo: "Ingeniero en Sistemas",
    institucion: "Universidad Indoamérica, Ecuador",
    detalle: "Nota Tesis: 9.50 | Promedio final: 9",
    iconColor: "#9333ea",
  },
];

export default function About() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  const secondary = theme.palette.text.secondary;
  const subtitleStyle = { fontWeight: "bold", mt: 1 };

  return (
    <Box
      id="about"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: theme.palette.text.primary,
      }}
    >
      {/* Encabezado — MISMO ESTILO QUE CERTIFICACIONES */}
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
              ? "linear-gradient(135deg, rgba(144,202,249,0.12), rgba(144,202,249,0.04))"
              : "linear-gradient(135deg, rgba(25,118,210,0.12), rgba(25,118,210,0.04))",
            border: `1px solid ${
              isDark
                ? "rgba(144,202,249,0.25)"
                : "rgba(25,118,210,0.25)"
            }`,
          }}
        >
          {/* Icono con círculo */}
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: isDark ? "#1e3a5f" : "#1976d2",
              mr: 1.2,
            }}
          >
            <GraduationCap size={20} color="#fff" />
          </Box>

          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: primaryColor }}
          >
            Formación
          </Typography>
        </Box>
      </motion.div>

      {/* Grid de estudios */}
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
                <Typography variant="subtitle1" sx={subtitleStyle}>
                  {est.titulo}
                </Typography>
                <Typography variant="body2" color={secondary}>
                  {est.institucion}
                </Typography>
                <Typography variant="body2" color={secondary}>
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
