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
// Tarjeta PRO
// =====================
function ProjectCard({ p, i, palette }) {
  const Icon = p.icon;
  const isDark = palette.mode === "dark";

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.1 }}
      >
        <Box
          sx={{
            p: 3,
            borderRadius: 4,
            textAlign: "center",
            cursor: "pointer",

            background: isDark
              ? "linear-gradient(145deg, #1e1e1e, #2a2a2a)"
              : "#ffffff",

            boxShadow: isDark
              ? "0 4px 20px rgba(0,0,0,0.6)"
              : "0 4px 20px rgba(0,0,0,0.08)",

            border: `1px solid ${
              isDark ? "rgba(255,255,255,0.05)" : "#eee"
            }`,

            transition: "all 0.3s ease",

            "&:hover": {
              transform: "translateY(-8px) scale(1.02)",
              boxShadow: `0 10px 30px ${p.color}33`,
            },
          }}
        >
          {/* ICONO */}
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              mb: 2,
              background: `${p.color}15`,
            }}
          >
            <Icon sx={{ fontSize: 30, color: p.color }} />
          </Box>

          {/* TITULO */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 1,
            }}
          >
            {p.titulo}
          </Typography>

          {/* LINK */}
          <Link
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              color: p.color,
              transition: "0.3s",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Ver proyecto →
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
        py: 5,
        scrollMarginTop: "80px",
        color: palette.text.primary,
      }}
    >
      {/* TITULO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
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
      <Grid container spacing={3} justifyContent="center">
        {proyectos.map((p, i) => (
          <ProjectCard key={i} p={p} i={i} palette={palette} />
        ))}
      </Grid>
    </Box>
  );
              }
