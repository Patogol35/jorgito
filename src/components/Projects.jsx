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
// Tarjeta individual
// =====================
function ProjectCard({ p, i, palette, primary }) {
  const theme = useTheme();
  const Icon = p.icon;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        whileHover={{ y: -5, scale: 1.05 }}
      >
        <Box
          sx={{
            textAlign: "center",
            px: 2,
            py: 2,
            borderRadius: "16px",
            background: palette.background.paper,

            // 🔥 borde azul SIEMPRE (igual certificaciones)
            border: `1px solid ${primary}`,

            transition:
              "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",

            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: theme.shadows[3],
            },

            "&:focus": { outline: "none" },
            "&:focus-visible": { outline: "none" },
          }}
        >
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
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const proyectosText = t.projects.items;

  // 🔥 colores (se mantienen)
  const colors = [
    "#1976d2",
    "#9333ea",
    "#16a34a",
    "#e11d48",
    "#f59e0b",
    "#0ea5e9",
    "#10b981",
  ];

  // 🔥 iconos (se mantienen)
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
        color: theme.palette.text.primary,
      }}
    >
      {/* ================= HEADER ================= */}
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
            gap: 1,
            px: 3,
            py: 1,
            borderRadius: "999px",
            background: theme.palette.action.hover,
            border: `1px solid ${theme.palette.divider}`,
            backdropFilter: "blur(6px)",
          }}
        >
          <WorkOutlineIcon sx={{ fontSize: 22, color: primary }} />

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: primary,
              lineHeight: 1,
            }}
          >
            {t.projects.title}
          </Typography>
        </Box>
      </motion.div>

      {/* ================= GRID ================= */}
      <Grid container spacing={3} justifyContent="center">
        {proyectos.map((p, i) => (
          <ProjectCard
            key={i}
            p={p}
            i={i}
            palette={theme.palette}
            primary={primary}
          />
        ))}
      </Grid>
    </Box>
  );
    }
