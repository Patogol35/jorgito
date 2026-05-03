import { Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useTheme } from "@mui/material/styles";

export default function About({ t }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  const secondary = theme.palette.text.secondary;
  const subtitleStyle = { fontWeight: "bold", mt: 1 };

  /* 🔥 textos desde i18n */
  const estudios = t.about.studies;

  /* 🔥 COLORES ORIGINALES (NO SE TOCAN) */
  const iconColors = ["#1976d2", "#9333ea"];

  return (
    <Box
      id="about"
      sx={(theme) => ({
        py: 4,
        scrollMarginTop: "80px",

        color: theme.palette.text.primary,

        // 🔥 FIX: evita flash blanco
        backgroundColor: theme.palette.background.paper,

        // 🔥 transición suave entre temas
        transition: "background-color 0.2s ease, color 0.2s ease",

        // 🔥 optimización render
        willChange: "background-color",
      })}
    >
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
            gap: 1,
            px: 3,
            py: 0.9,
            borderRadius: "999px",

            // 🔥 leve ajuste para evitar mezcla con blanco
            background: isDark
              ? "rgba(144,202,249,0.08)"
              : "rgba(25,118,210,0.08)",

            border: `1px solid ${
              isDark
                ? "rgba(144,202,249,0.25)"
                : "rgba(25,118,210,0.25)"
            }`,
            backdropFilter: "blur(6px)",
          }}
        >
          <GraduationCap size={22} color={primaryColor} />

          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: primaryColor, lineHeight: 1 }}
          >
            {t.about.title}
          </Typography>
        </Box>
      </motion.div>

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
                <GraduationCap size={28} color={iconColors[i]} />

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
