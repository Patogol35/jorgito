import { Typography, Grid, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Brain } from "lucide-react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export default function Certifications({ t }) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  /* 🔥 textos desde i18n */
  const certificaciones = t.certifications.items;

  /* 🔥 iconos originales (se mantienen) */
  const iconTypes = [
    BookOpen,
    BookOpen,
    GraduationCap,
    BookOpen,
    Brain,
    Brain,
  ];

  /* 🔥 colores originales (se mantienen) */
  const iconColors = [
    "#1976d2",
    "#d97706",
    "#e11d48",
    "#22c55e",
    "#9333ea",
    "#1e40af",
  ];

  return (
    <Box
      id="certifications"
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
          <WorkspacePremiumIcon sx={{ fontSize: 22, color: primary }} />

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: primary,
              lineHeight: 1,
            }}
          >
            {t.certifications.title}
          </Typography>
        </Box>
      </motion.div>

      {/* ================= GRID ================= */}
      <Grid container spacing={3} justifyContent="center">
        {certificaciones.map((cert, i) => {
          const Icon = iconTypes[i];

          return (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    px: 2,
                    py: 2,
                    borderRadius: "16px",
                    background: theme.palette.background.paper,

                    // 🔥 borde SIEMPRE visible
                    border: `1px solid ${primary}`,

                    transition:
                      "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",

                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[3],
                    },

                    // 🔥 quitar focus feo
                    "&:focus": {
                      outline: "none",
                    },
                    "&:focus-visible": {
                      outline: "none",
                    },
                  }}
                >
                  <Icon size={28} color={iconColors[i]} />

                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mt: 1 }}
                  >
                    {cert.titulo}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {cert.institucion} | {cert.año}
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
