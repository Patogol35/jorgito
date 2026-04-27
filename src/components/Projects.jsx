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
// Tarjeta individual (MEJORADA)
// =====================
function ProjectCard({ p, i, palette }) {
  const Icon = p.icon;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: i * 0.1 }}
        viewport={{ once: false }}
      >
        <Box
          sx={{
            textAlign: "center",
            px: 2,
            py: 2.5,
            borderRadius: "16px",
            background:
              palette.mode === "dark"
                ? "rgba(255,255,255,0.03)"
                : "rgba(0,0,0,0.03)",
            border: `1px solid ${
              palette.mode === "dark"
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)"
            }`,
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-6px) scale(1.02)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            },
          }}
        >
          {/* ICONO CON FONDO */}
          <Box
            sx={{
              width: 55,
              height: 55,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              background: `${p.color}20`,
            }}
          >
            <Icon sx={{ fontSize: 28, color: p.color }} />
          </Box>

          {/* TITULO */}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", mt: 1.2 }}
          >
            <Link
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                color: palette.text.primary,
                fontWeight: "bold",
                transition: "0.2s",
                "&:hover": { color: p.color },
              }}
            >
              {p.titulo}
            </Link>
          </Typography>

          {/* DESCRIPCION (opcional si existe en i18n) */}
          {p.descripcion && (
            <Typography
              variant="body2"
              sx={{
                opacity: 0.7,
                mt: 0.5,
                fontSize: "0.85rem",
              }}
            >
              {p.descripcion}
            </Typography>
          )}
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

  /* textos desde i18n */
  const proyectosText = t.projects.items;

  /* colores */
  const colors = [
    "#1976d2",
    "#9333ea",
    "#16a34a",
    "#e11d48",
    "#f59e0b",
    "#0ea5e9",
    "#10b981",
  ];

  /* iconos */
  const icons = [
    WbSunnyIcon,
    ShoppingCartIcon,
    MovieIcon,
    QuizIcon,
    FunctionsIcon,
    AccessTimeIcon,
    QrCode2Icon,
  ];

  /* construir proyectos */
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
      {/* =========================
          TÍTULO
      ========================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: "center", marginBottom: "3rem" }}
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
            sx={{ fontWeight: "bold", color: primaryColor, lineHeight: 1 }}
          >
            {t.projects.title}
          </Typography>
        </Box>

        {/* LINEA DECORATIVA */}
        <Box
          sx={{
            width: 60,
            height: 3,
            mx: "auto",
            mt: 1.2,
            borderRadius: 2,
            background: primaryColor,
          }}
        />
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
