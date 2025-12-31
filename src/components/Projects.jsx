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
import AutoStoriesIcon from "@mui/icons-material/AutoStories"; // 📚 Libros

// =====================
// Datos de proyectos
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
function ProjectCard({ p, i, palette }) {
  const Icon = p.icon;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: i * 0.3 }}
        viewport={{ once: false }}
      >
        <Box sx={{ textAlign: "center", px: 1 }}>
          <Icon sx={{ fontSize: 30, color: p.color }} />

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", mt: 1 }}
          >
            <Link
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                color: palette.text.primary,
                fontWeight: "bold",
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
  const { palette } = useTheme();
  const isDark = palette.mode === "dark";

  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  return (
    <Box
      id="projects"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: palette.text.primary,
      }}
    >
      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            px: 4,
            py: 1.2,
            borderRadius: "999px",
            background: isDark
              ? "linear-gradient(135deg, rgba(144,202,249,0.12), rgba(144,202,249,0.04))"
              : "linear-gradient(135deg, rgba(25,118,210,0.12), rgba(25,118,210,0.04))",
            border: `1px solid ${
              isDark
                ? "rgba(144,202,249,0.25)"
                : "rgba(25,118,210,0.25)"
            }`,
          }}
        >
          {/* Icono con círculo */}
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: isDark ? "#1e3a5f" : "#1976d2",
              mr: 1.2,
            }}
          >
            <WorkOutlineIcon sx={{ fontSize: 20, color: "#fff" }} />
          </Box>

          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: primaryColor }}
          >
            Algunos Proyectos
          </Typography>
        </Box>
      </motion.div>

      {/* Grid de proyectos */}
      <Grid container spacing={3} justifyContent="center">
        {proyectos.map((p, i) => (
          <ProjectCard key={p.titulo} p={p} i={i} palette={palette} />
        ))}
      </Grid>
    </Box>
  );
      }
