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

// =====================
// Tarjeta individual (OPTIMIZADA)
// =====================
function ProjectCard({ p, i, palette }) {
  const Icon = p.icon;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: i * 0.08,
        }}
        viewport={{ once: true, margin: "-50px" }}
        style={{
          willChange: "transform, opacity",
        }}
      >
        <Box sx={{ textAlign: "center", px: 1 }}>
          <Icon sx={{ fontSize: 30, color: p.color }} />

          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
            <Link
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                color: palette.text.primary,
                fontWeight: "bold",
                transition: "color 0.2s ease",
                "&:hover": { color: p.color },
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
        py: 4,
        scrollMarginTop: "80px",
        color: palette.text.primary,
      }}
    >
      {/* TÍTULO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
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
              ? "rgba(144,202,249,0.08)"
              : "rgba(25,118,210,0.08)",
            border: `1px solid ${
              isDark
                ? "rgba(144,202,249,0.25)"
                : "rgba(25,118,210,0.25)"
            }`,
            backdropFilter: "blur(4px)",
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

      {/* GRID */}
      <Grid container spacing={2.5} justifyContent="center">
        {proyectos.map((p, i) => (
          <ProjectCard key={i} p={p} i={i} palette={palette} />
        ))}
      </Grid>
    </Box>
  );
}
