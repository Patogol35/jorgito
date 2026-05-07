import { Typography, Grid, Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

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
// Tarjeta
// =====================
function ProjectCard({ p, palette, variants }) {
  const Icon = p.icon;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        variants={variants}
        whileHover={{
          y: -6,
          scale: 1.06,
          transition: { duration: 0.25 },
        }}
        style={{ willChange: "transform, opacity" }}
      >
      <Box
  sx={{
    textAlign: "center",
    px: 1,
    py: 2,

    borderRadius: "24px",

    background:
      palette.mode === "dark"
        ? "linear-gradient(145deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))"
        : "linear-gradient(145deg, rgba(25,118,210,0.02), rgba(255,255,255,0.9))",

    border: `1px solid ${
      palette.mode === "dark"
        ? "rgba(144,202,249,0.32)"
        : "rgba(25,118,210,0.22)"
    }`,

    boxShadow:
      palette.mode === "dark"
        ? "0 8px 24px rgba(0,0,0,0.28)"
        : "0 8px 24px rgba(25,118,210,0.08)",

    backdropFilter: "blur(10px)",
  }}
>
          <Icon sx={{ fontSize: 30, color: p.color }} />

          {/* TÍTULO */}
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
            {p.titulo}
          </Typography>

          {/* DESCRIPCIÓN */}
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mt: 0.5,
              fontSize: "0.85rem",
            }}
          >
            {p.descripcion}
          </Typography>

          {/* LINK SEPARADO */}
          {p.link && (
  <Button
    href={p.link}
    target="_blank"
    rel="noopener noreferrer"
    size="small"
    variant="outlined"
    sx={{
      mt: 1,
      textTransform: "none",
      fontSize: "0.75rem",
      borderRadius: "999px",
      color: p.color,
      borderColor: p.color,
      "&:hover": {
        borderColor: p.color,
        background:
          palette.mode === "dark"
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.05)",
      },
    }}
  >
    {p.viewText || "Ver proyecto"}
  </Button>
)}
        </Box>
      </motion.div>
    </Grid>
  );
}

// =====================
// MAIN COMPONENT
// =====================
export default function Projects({ t }) {
  const { palette } = useTheme();
  const isDark = palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  const proyectosText = t.projects.items;

  const colors = [
    "#1976d2",
    "#3b82f6",
    "#2563eb",
    "#1976d2",
    "#3b82f6",
    "#2563eb",
    "#1976d2",
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

  const proyectos = proyectosText.map((item, i) => ({
    ...item,
    color: colors[i % colors.length],
    icon: icons[i % icons.length],
    viewText: t.projects.view,
  }));

  return (
    <Box
      id="projects"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: palette.text.primary,
      }}
    >
      {/* 🎬 ANIMACIÓN SCROLL */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* HEADER */}
        <motion.div variants={fadeCinematic}>
          <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
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
                {t.projects.title}
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* GRID */}
        <Grid container spacing={3} justifyContent="center">
          {proyectos.map((p, i) => (
            <ProjectCard
              key={i}
              p={p}
              palette={palette}
              variants={fadeCinematic}
            />
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}
