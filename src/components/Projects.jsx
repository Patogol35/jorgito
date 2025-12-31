import { Typography, Grid, Box, Link, useTheme } from "@mui/material";
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
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

// =====================
// Datos de proyectos (corregidos sin espacios al final de los enlaces)
// =====================
const proyectos = [
  {
    titulo: "App para ver el clima",
    link: "https://jorgepatriciosantamariacherrezweath.vercel.app/",
    color: "#1976d2",
    icon: WbSunnyIcon,
  },
  {
    titulo: "E-commerce Full Stack (React + Django)",
    link: "https://ecommerce-jorge-patricio.vercel.app/",
    color: "#9333ea",
    icon: ShoppingCartIcon,
  },
  {
    titulo: "Explorador de películas",
    link: "https://movie-explorer-jorge-patricio.vercel.app/",
    color: "#16a34a",
    icon: MovieIcon,
  },
  {
    titulo: "Quiz educativo de Ambato y Ecuador",
    link: "https://quiz-educativo-jorgepatricio.vercel.app/",
    color: "#e11d48",
    icon: QuizIcon,
  },
  {
    titulo: "Calculadora Científica",
    link: "https://calculadorajorgepatricio.vercel.app/",
    color: "#f59e0b",
    icon: FunctionsIcon,
  },
  {
    titulo: "Reloj Global",
    link: "https://reloj-jorgepatricio.vercel.app/",
    color: "#0ea5e9",
    icon: AccessTimeIcon,
  },
  {
    titulo: "App para Crear y Escanear Códigos QR",
    link: "https://jorgepatricio-codigo-qr.vercel.app/",
    color: "#10b981",
    icon: QrCode2Icon,
  },
  {
    titulo: "Mis Libros Favoritos",
    link: "https://mislibrosfavoritos.vercel.app/",
    color: "#8b5cf6",
    icon: AutoStoriesIcon,
  },
];

// =====================
// Tarjeta individual
// =====================
function ProjectCard({ p, i, textPrimary, textSecondary }) {
  const Icon = p.icon;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        viewport={{ once: true }}
      >
        <Box
          sx={{
            textAlign: "center",
            px: 1.5,
            py: 2.5,
            borderRadius: "16px",
            backgroundColor: "background.paper",
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 4px 12px rgba(0,0,0,0.4)"
                : "0 4px 12px rgba(0,0,0,0.06)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 6px 16px rgba(0,0,0,0.5)"
                  : "0 6px 16px rgba(0,0,0,0.1)",
            },
          }}
        >
          <Icon sx={{ fontSize: 32, color: p.color, mb: 1.5 }} />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              color: textPrimary,
              lineHeight: 1.4,
            }}
          >
            <Link
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                color: "inherit",
                fontWeight: 600,
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
export default function Projects() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const primaryColor = isDark ? "#bbdefb" : "#1976d2";
  const badgeBg = isDark
    ? "linear-gradient(135deg, rgba(30,30,40,0.85) 0%, rgba(20,20,30,0.9) 100%)"
    : "linear-gradient(135deg, rgba(240,245,255,0.9) 0%, rgba(230,240,255,0.9) 100%)";

  return (
    <Box
      id="projects"
      sx={{
        py: { xs: 6, md: 8 },
        scrollMarginTop: "80px",
        color: theme.palette.text.primary,
      }}
    >
      {/* Encabezado tipo badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ textAlign: "center", marginBottom: "2.5rem" }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            px: 3,
            py: 0.8,
            borderRadius: "50px",
            background: badgeBg,
            boxShadow: isDark
              ? "0 4px 12px rgba(0,0,0,0.3)"
              : "0 4px 12px rgba(0,0,0,0.08)",
            backdropFilter: "blur(4px)",
            border: isDark
              ? "1px solid rgba(144,202,249,0.2)"
              : "1px solid rgba(25,118,210,0.2)",
          }}
        >
          <WorkOutlineIcon
            sx={{ fontSize: 22, mr: 1, color: primaryColor }}
          />
          <Typography
            variant="subtitle2"
            fontWeight={600}
            sx={{
              color: primaryColor,
              letterSpacing: "0.5px",
            }}
          >
            PROYECTOS DESTACADOS
          </Typography>
        </Box>
      </motion.div>

      {/* Grid de proyectos */}
      <Grid container spacing={3} justifyContent="center">
        {proyectos.map((p, i) => (
          <ProjectCard
            key={p.titulo}
            p={p}
            i={i}
            textPrimary={theme.palette.text.primary}
            textSecondary={theme.palette.text.secondary}
          />
        ))}
      </Grid>
    </Box>
  );
}
