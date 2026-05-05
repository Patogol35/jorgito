import { Typography, Grid, Box, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

// Íconos
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MovieIcon from "@mui/icons-material/Movie";
import QuizIcon from "@mui/icons-material/Quiz";
import FunctionsIcon from "@mui/icons-material/Functions";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

// =====================
// 🎬 Animaciones
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

// =====================
// 🎯 CONFIG CENTRALIZADA
// =====================
const PROJECT_CONFIG = [
  { icon: WbSunnyIcon, color: "#1976d2" },
  { icon: ShoppingCartIcon, color: "#9333ea" },
  { icon: MovieIcon, color: "#16a34a" },
  { icon: QuizIcon, color: "#e11d48" },
  { icon: FunctionsIcon, color: "#f59e0b" },
  { icon: AccessTimeIcon, color: "#0ea5e9" },
  { icon: QrCode2Icon, color: "#10b981" },
];

// =====================
// Tarjeta optimizada
// =====================
const ProjectCard = memo(function ProjectCard({ project, palette }) {
  const Icon = project.icon;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div variants={fadeCinematic}>
        <Box sx={{ textAlign: "center", px: 1 }}>
          <Icon sx={{ fontSize: 30, color: project.color }} />

          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                color: palette.text.primary,
                fontWeight: "bold",
                transition: "0.3s",
                "&:hover": { color: project.color },
              }}
            >
              {project.titulo}
            </Link>
          </Typography>

          {/* 🔥 NUEVO: descripción */}
          <Typography
            variant="body2"
            sx={{
              color: palette.text.secondary,
              mt: 0.5,
              fontSize: "0.8rem",
            }}
          >
            {project.descripcion}
          </Typography>
        </Box>
      </motion.div>
    </Grid>
  );
});

// =====================
// MAIN COMPONENT
// =====================
export default function Projects({ t }) {
  const { palette } = useTheme();
  const isDark = palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  // 🔥 MEMO para evitar renders innecesarios
  const proyectos = useMemo(() => {
    return t.projects.items.map((item, i) => {
      const config = PROJECT_CONFIG[i % PROJECT_CONFIG.length];

      return {
        ...item,
        icon: config.icon,
        color: config.color,
      };
    });
  }, [t]);

  return (
    <Box
      id="projects"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: palette.text.primary,
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* HEADER */}
        <motion.div variants={fadeCinematic}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 3,
                py: 1,
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
              <WorkOutlineIcon sx={{ fontSize: 22, color: primaryColor }} />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: primaryColor,
                }}
              >
                {t.projects.title}
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* GRID */}
        <Grid container spacing={3} justifyContent="center">
          {proyectos.map((project, i) => (
            <ProjectCard
              key={project.titulo || i}
              project={project}
              palette={palette}
            />
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}
