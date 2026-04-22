import { Typography, Grid, Box, Link } from "@mui/material";
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
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// =====================
// Tarjeta individual (MEJORADA VISUALMENTE)
// =====================
function ProjectCard({ p, i, palette }) {
  const Icon = p.icon;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6, scale: 1.03 }}
        transition={{ duration: 0.6, delay: i * 0.12 }}
        viewport={{ once: false }}
      >
        <Box sx={{ textAlign: "center", px: 1 }}>
          {/* Icono */}
          <Icon sx={{ fontSize: 32, color: p.color }} />

          {/* Título + Link */}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              mt: 1,
              letterSpacing: 0.3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.6,
            }}
          >
            <Link
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                position: "relative",
                display: "inline-block",
                px: 1.5,
                py: 0.5,
                borderRadius: "8px",
                color: palette.text.primary,
                fontWeight: "bold",
                transition: "all 0.25s ease",

                "&:hover": {
                  color: "#fff",
                  backgroundColor: p.color,
                  boxShadow: `0 4px 12px ${p.color}55`,
                  transform: "translateY(-2px)",
                },

                /* Línea animada */
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "0%",
                  height: "2px",
                  bottom: 0,
                  left: 0,
                  backgroundColor: p.color,
                  transition: "width 0.3s ease",
                },
                "&:hover::after": {
                  width: "100%",
                },
              }}
            >
              {p.titulo}
            </Link>

            {/* Icono externo */}
            <OpenInNewIcon sx={{ fontSize: 16, opacity: 0.6 }} />
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

  /* 🔥 textos desde i18n */
  const proyectosText = t.projects.items;

  /* 🔥 tus colores originales */
  const colors = [
    "#1976d2",
    "#9333ea",
    "#16a34a",
    "#e11d48",
    "#f59e0b",
    "#0ea5e9",
    "#10b981",
  ];

  /* 🔥 tus iconos originales */
  const icons = [
    WbSunnyIcon,
    ShoppingCartIcon,
    MovieIcon,
    QuizIcon,
    FunctionsIcon,
    AccessTimeIcon,
    QrCode2Icon,
  ];

  /* 🔥 construimos proyectos */
  const proyectos = proyectosText.map((item, i) => ({
    ...item,
    color: colors[i],
    icon: icons[i],
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
      {/* =========================
          TÍTULO
      ========================= */}
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
            sx={{ fontWeight: "bold", color: primaryColor, lineHeight: 1 }}
          >
            {t.projects.title}
          </Typography>
        </Box>
      </motion.div>

      {/* =========================
          GRID
      ========================= */}
      <Grid container spacing={3} justifyContent="center">
        {proyectos.map((p, i) => (
          <ProjectCard key={i} p={p} i={i} palette={palette} />
        ))}
      </Grid>
    </Box>
  );
}
