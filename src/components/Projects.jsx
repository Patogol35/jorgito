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
// Tarjeta limpia PRO
// =====================
function ProjectCard({ p, i, palette }) {
  const Icon = p.icon;
  const isDark = palette.mode === "dark";

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: i * 0.08 }}
      >
        <Box
          component="a"
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "block",
            p: 2.2,
            borderRadius: 3,
            textAlign: "center",
            textDecoration: "none",

            background: isDark ? "#1e1e1e" : "#ffffff",

            border: `1px solid ${
              isDark ? "rgba(255,255,255,0.06)" : "#eee"
            }`,

            boxShadow: isDark
              ? "0 2px 10px rgba(0,0,0,0.4)"
              : "0 2px 10px rgba(0,0,0,0.05)",

            transition: "all 0.25s ease",

            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: isDark
                ? "0 6px 20px rgba(0,0,0,0.6)"
                : "0 6px 20px rgba(0,0,0,0.1)",
              borderColor: p.color,
            },
          }}
        >
          {/* ICONO */}
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              mb: 1.2,
              background: `${p.color}15`,
            }}
          >
            <Icon sx={{ fontSize: 22, color: p.color }} />
          </Box>

          {/* TITULO */}
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              fontSize: "0.95rem",
              color: palette.text.primary,
            }}
          >
            {p.titulo}
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
  const primaryColor = isDark ? "#90caf9" : "#1976d2";

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
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      {/* TITULO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
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
            background: isDark
              ? "rgba(144,202,249,0.08)"
              : "rgba(25,118,210,0.08)",
            border: `1px solid ${
              isDark
                ? "rgba(144,202,249,0.25)"
                : "rgba(25,118,210,0.25)"
            }`,
          }}
        >
          <WorkOutlineIcon sx={{ fontSize: 20, color: primaryColor }} />

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: primaryColor }}
          >
            {t.projects.title}
          </Typography>
        </Box>
      </motion.div>

      {/* GRID LIMPIO */}
      <Grid container spacing={2}>
        {proyectos.map((p, i) => (
          <ProjectCard key={i} p={p} i={i} palette={palette} />
        ))}
      </Grid>
    </Box>
  );
            }
