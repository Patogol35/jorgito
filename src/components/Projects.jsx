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
// Tarjeta PRO 🔥
// =====================
function ProjectCard({ p, i, palette }) {
  const Icon = p.icon;
  const isDark = palette.mode === "dark";

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -10, scale: 1.04 }}
        transition={{ duration: 0.6, delay: i * 0.12 }}
      >
        <Box
          sx={{
            p: 3,
            borderRadius: "20px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",

            // 🌫️ Glass effect
            backdropFilter: "blur(12px)",
            background: isDark
              ? "rgba(255,255,255,0.04)"
              : "rgba(255,255,255,0.7)",

            border: `1px solid ${
              isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.06)"
            }`,

            boxShadow: isDark
              ? "0 10px 30px rgba(0,0,0,0.4)"
              : "0 10px 25px rgba(0,0,0,0.08)",

            transition: "all 0.3s ease",

            "&:hover": {
              boxShadow: `0 15px 40px ${p.color}33`,
            },

            // ✨ Glow superior
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "3px",
              background: p.color,
            },
          }}
        >
          {/* Icono */}
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "16px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `${p.color}15`,
              mb: 2,
            }}
          >
            <Icon sx={{ fontSize: 30, color: p.color }} />
          </Box>

          {/* Título */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 1,
              letterSpacing: 0.3,
            }}
          >
            {p.titulo}
          </Typography>

          {/* Descripción (si existe en i18n) */}
          {p.descripcion && (
            <Typography
              variant="body2"
              sx={{
                opacity: 0.7,
                mb: 2,
                fontSize: "0.9rem",
              }}
            >
              {p.descripcion}
            </Typography>
          )}

          {/* Botón */}
          <Link
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              px: 2,
              py: 0.7,
              borderRadius: "999px",
              fontWeight: "bold",
              fontSize: "0.85rem",
              transition: "all 0.25s ease",

              color: isDark ? "#fff" : p.color,
              border: `1px solid ${p.color}`,

              "&:hover": {
                backgroundColor: p.color,
                color: "#fff",
                boxShadow: `0 6px 20px ${p.color}55`,
                transform: "translateY(-2px)",
              },
            }}
          >
            Ver proyecto
            <OpenInNewIcon sx={{ fontSize: 16 }} />
          </Link>
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

  const proyectosText = t.projects.items;

  const colors = [
    "#1976d2",
    "#9333ea",
    "#16a34a",
    "#e11d48",
    "#f59e0b",
    "#0ea5e9",
    "#10b981",
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
    color: colors[i],
    icon: icons[i],
  }));

  return (
    <Box
      id="projects"
      sx={{
        py: 6,
        scrollMarginTop: "80px",
        color: palette.text.primary,
      }}
    >
      {/* TÍTULO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "3rem" }}
      >
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
            sx={{ fontWeight: "bold", color: primaryColor }}
          >
            {t.projects.title}
          </Typography>
        </Box>
      </motion.div>

      {/* GRID */}
      <Grid container spacing={4} justifyContent="center">
        {proyectos.map((p, i) => (
          <ProjectCard key={i} p={p} i={i} palette={palette} />
        ))}
      </Grid>
    </Box>
  );
}
