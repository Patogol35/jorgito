import { Typography, Grid, Box, Link, Paper } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
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
// Tarjeta individual MEJORADA
// =====================
function ProjectCard({ p, i, palette }) {
  const Icon = p.icon;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.1 }}
        viewport={{ once: false }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            textAlign: "center",
            background:
              palette.mode === "dark"
                ? "rgba(255,255,255,0.03)"
                : "#fff",
            border: `1px solid ${alpha(p.color, 0.2)}`,
            transition: "all 0.3s ease",
            cursor: "pointer",

            "&:hover": {
              transform: "translateY(-6px) scale(1.02)",
              boxShadow: `0 10px 25px ${alpha(p.color, 0.25)}`,
              borderColor: p.color,
            },
          }}
        >
          {/* Icono */}
          <Box
            sx={{
              width: 55,
              height: 55,
              margin: "0 auto",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: alpha(p.color, 0.1),
              mb: 1.5,
            }}
          >
            <Icon sx={{ fontSize: 28, color: p.color }} />
          </Box>

          {/* Título */}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              mt: 1,
            }}
          >
            <Link
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                color: palette.text.primary,
                transition: "all .2s ease",
                "&:hover": {
                  color: p.color,
                },
              }}
            >
              {p.titulo}
            </Link>
          </Typography>
        </Paper>
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
        px: 2,
        scrollMarginTop: "80px",
        color: palette.text.primary,
      }}
    >
      {/* =========================
          TÍTULO MEJORADO
      ========================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "2.5rem" }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 3,
            py: 1,
            borderRadius: "999px",
            background: alpha(primaryColor, 0.08),
            border: `1px solid ${alpha(primaryColor, 0.25)}`,
            backdropFilter: "blur(6px)",
          }}
        >
          <WorkOutlineIcon sx={{ fontSize: 22, color: primaryColor }} />

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: primaryColor,
              letterSpacing: 0.5,
            }}
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
