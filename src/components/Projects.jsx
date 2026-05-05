import { Typography, Grid, Box, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useMemo } from "react";

// Íconos
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MovieIcon from "@mui/icons-material/Movie";
import QuizIcon from "@mui/icons-material/Quiz";
import FunctionsIcon from "@mui/icons-material/Functions";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import QrCode2Icon from "@mui/icons-material/QrCode2";

// =====================
// 🎬 Animaciones (OPTIMIZADAS)
// =====================
const easeOutExpo = [0.16, 1, 0.3, 1];

// ❌ SIN blur (causaba flash)
const fadeCinematic = {
  hidden: {
    opacity: 0,
    y: 20,
    clipPath: "inset(0 0 100% 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
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
// Tarjeta individual
// =====================
function ProjectCard({ p, palette }) {
  const Icon = p.icon;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        variants={fadeCinematic}
        initial={false} // ✅ evita re-animación
        style={{ willChange: "transform, opacity" }}
      >
        <Box sx={{ textAlign: "center", px: 1 }}>
          {Icon && <Icon sx={{ fontSize: 30, color: p.color }} />}

          {/* ✅ Typography controla color */}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              mt: 1,
              color: palette.text.primary,
              transition: "color 0.3s ease",
            }}
          >
            <Link
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              color="inherit" // ✅ hereda del theme
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  color: p.color,
                  textShadow: `0 0 6px ${p.color}33`,
                },
              }}
            >
              {p.titulo}
            </Link>
          </Typography>
        </Box>
      </motion.div>
    </Grid>
  );
}

// =====================
// Componente principal
// =====================
export default function Projects({ t }) {
  const { palette } = useTheme();
  const isDark = palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  const proyectosText = t?.projects?.items || [];

  const colors = [
    "#1976d2",
    "#3b82f6",
    "#2563eb",
    "#1976d2",
    "#3b82f6",
    "#2563eb",
  ];

  const icons = [
    WbSunnyIcon,
    ShoppingCartIcon,
    MovieIcon,
    QuizIcon,
    FunctionsIcon,
    AccessTimeIcon,
    QrCode2Icon,
  ];

  // ✅ MEMO para evitar re-render innecesario
  const proyectos = useMemo(() => {
    return proyectosText.map((item, i) => ({
      ...item,
      color: colors[i % colors.length],
      icon: icons[i % icons.length],
    }));
  }, [proyectosText]);

  return (
    <Box
      id="projects"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: palette.text.primary,
      }}
    >
      {/* 🎬 CONTENEDOR */}
      <motion.div
        variants={container}
        initial={false} // ✅ CLAVE para quitar flash
        animate="visible"
      >
        {/* TÍTULO */}
        <motion.div variants={fadeCinematic} initial={false}>
          <Box sx={{ textAlign: "center", mb: "2rem" }}>
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
              <WorkOutlineIcon sx={{ fontSize: 22, color: primaryColor }} />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: primaryColor,
                  lineHeight: 1,
                }}
              >
                {t?.projects?.title || ""}
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* GRID */}
        <Grid container spacing={3} justifyContent="center">
          {proyectos.map((p) => (
            <ProjectCard
              key={p.titulo} // ✅ KEY REAL (no index)
              p={p}
              palette={palette}
            />
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
    }
