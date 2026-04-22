import { Typography, Grid, Box } from "@mui/material";
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
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

// =====================
// CARD PRO (estilo limpio premium)
// =====================
function ProjectCard({ p, i, palette }) {
  const Icon = p.icon;
  const isDark = palette.mode === "dark";

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.a
        href={p.link}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: i * 0.07 }}
        style={{ textDecoration: "none" }}
      >
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            height: "100%",

            background: isDark ? "#1b1b1b" : "#ffffff",

            border: `1px solid ${
              isDark ? "rgba(255,255,255,0.06)" : "#eaeaea"
            }`,

            transition: "all 0.25s ease",

            "&:hover": {
              transform: "translateY(-4px)",
              borderColor: p.color,
              boxShadow: isDark
                ? "0 8px 25px rgba(0,0,0,0.5)"
                : "0 8px 25px rgba(0,0,0,0.08)",
            },
          }}
        >
          {/* TOP */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${p.color}15`,
              }}
            >
              <Icon sx={{ fontSize: 20, color: p.color }} />
            </Box>

            <ArrowOutwardIcon
              sx={{
                fontSize: 18,
                opacity: 0.5,
                transition: "0.25s",
                ".MuiBox-root:hover &": {
                  transform: "translate(3px,-3px)",
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* TITULO */}
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "0.98rem",
              lineHeight: 1.4,
              color: palette.text.primary,
            }}
          >
            {p.titulo}
          </Typography>
        </Box>
      </motion.a>
    </Grid>
  );
}

// =====================
// COMPONENTE PRINCIPAL
// =====================
export default function Projects({ t }) {
  const { palette } = useTheme();
  const isDark = palette.mode === "dark";
  const primaryColor = isDark ? "#90caf9" : "#1976d2";

  const proyectosText = t.projects.items;

  const colors = [
    "#2563eb",
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
        py: 8,
        px: 2,
        maxWidth: "1000px", // 🔥 más compacto = más profesional
        mx: "auto",
      }}
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ textAlign: "center", marginBottom: "3rem" }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 2.5,
            py: 0.8,
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
          <WorkOutlineIcon sx={{ fontSize: 18, color: primaryColor }} />

          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "0.9rem",
              color: primaryColor,
            }}
          >
            {t.projects.title}
          </Typography>
        </Box>
      </motion.div>

      {/* GRID */}
      <Grid container spacing={2.2}>
        {proyectos.map((p, i) => (
          <ProjectCard key={i} p={p} i={i} palette={palette} />
        ))}
      </Grid>
    </Box>
  );
    }
