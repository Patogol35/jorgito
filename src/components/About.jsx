  import { Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useTheme } from "@mui/material/styles";

/* =========================
   🎬 Animaciones tipo Hero
========================= */

const easeOutExpo = [0.16, 1, 0.3, 1];

const fadeCinematic = {
  hidden: {
    opacity: 0,
    y: 20,
    clipPath: "inset(0 0 100% 0)",
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export default function About({ t }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  const secondary = theme.palette.text.secondary;
  const subtitleStyle = { fontWeight: "bold", mt: 1 };

  const estudios = t.about.studies;

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
      {/* 🎬 CONTENEDOR PRINCIPAL */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* =========================
            TÍTULO estilo Hero
        ========================= */}
        <motion.div variants={fadeCinematic}>
          <Box
            sx={{
              textAlign: "center",
              marginBottom: "2rem",
            }}
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
                background: isDark
                  ? "rgba(144,202,249,0.06)"
                  : "rgba(25,118,210,0.06)",
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
                sx={{
                  fontWeight: "bold",
                  color: primaryColor,
                  lineHeight: 1,
                }}
              >
                {t.about.title}
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* GRID con entrada coordinada */}
        <Grid container spacing={3} justifyContent="center">
          {estudios.map((est, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div
                variants={fadeCinematic}
                style={{ willChange: "transform, opacity" }}
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
      </motion.div>
    </Box>
  );
    }
