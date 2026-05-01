import { Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useTheme } from "@mui/material/styles";

export default function About({ t }) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const secondary = theme.palette.text.secondary;
  const subtitleStyle = { fontWeight: "bold", mt: 1 };

  /* 🔥 textos desde i18n */
  const estudios = t.about.studies;

  /* 🔥 COLORES ORIGINALES (NO SE TOCAN) */
  const iconColors = ["#1976d2", "#9333ea"];

  return (
    <Box
      id="about"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: theme.palette.text.primary,
      }}
    >
      {/* ================= HEADER ================= */}
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
            gap: 1,
            px: 3,
            py: 1,
            borderRadius: "999px",
            background: theme.palette.action.hover,
            border: `1px solid ${theme.palette.divider}`,
            backdropFilter: "blur(6px)",
          }}
        >
          <GraduationCap size={22} color={primary} />

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: primary,
              lineHeight: 1,
            }}
          >
            {t.about.title}
          </Typography>
        </Box>
      </motion.div>

      {/* ================= GRID ================= */}
      <Grid container spacing={3} justifyContent="center">
        {estudios.map((est, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ y: -5, scale: 1.04 }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  px: 2,
                  py: 2,
                  borderRadius: "16px",
                  background: theme.palette.background.paper,

                  // 🔥 BORDE SIEMPRE
                  border: `1px solid ${primary}`,

                  transition:
                    "transform 0.25s ease, box-shadow 0.25s ease",

                  "&:hover": {
                    boxShadow: theme.shadows[3],
                  },

                  // 🔥 quitar focus feo
                  "&:focus": { outline: "none" },
                  "&:focus-visible": { outline: "none" },
                }}
              >
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
