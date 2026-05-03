import { Typography, Grid, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Brain } from "lucide-react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

// =====================
// 🎬 Animaciones estilo Hero
// =====================
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

export default function Certifications({ t }) {
  const { palette } = useTheme();
  const isDark = palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  const certificaciones = t.certifications.items;

  const iconTypes = [
    BookOpen,
    BookOpen,
    GraduationCap,
    BookOpen,
    Brain,
    Brain,
  ];

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
        color: palette.text.primary,
      }}
    >
      {/* 🎬 CONTENEDOR ANIMADO */}
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
              <WorkspacePremiumIcon
                sx={{ fontSize: 22, color: primaryColor }}
              />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: primaryColor,
                  lineHeight: 1,
                }}
              >
                {t.certifications.title}
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* GRID con animación coordinada */}
        <Grid container spacing={3} justifyContent="center">
          {certificaciones.map((cert, i) => {
            const Icon = iconTypes[i];

            return (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <motion.div
                  variants={fadeCinematic}
                  whileHover={{ y: -5, scale: 1.05 }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <Box sx={{ textAlign: "center", px: 1 }}>
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
      </motion.div>
    </Box>
  );
        }
