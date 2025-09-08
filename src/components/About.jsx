import { Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
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
        color: theme.palette.text.primary, // texto se adapta al modo
      }}
    >
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
            color: theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
            position: "relative",
            display: "inline-block",
          }}
        >
          Formación Académica
          <Box
            component="span"
            sx={{
              position: "absolute",
              left: "50%",
              bottom: -6,
              transform: "translateX(-50%)",
              width: "60%",
              height: "3px",
              background:
                theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
              borderRadius: "6px",
            }}
          />
        </Typography>
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
                <GraduationCap
                  size={28}
                  color={est.iconColor}
                />
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
