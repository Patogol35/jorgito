import { Typography, Grid, Box, Link } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

// ✅ Importar íconos de Material Icons
import WbSunnyIcon from "@mui/icons-material/WbSunny"; // clima
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // e-commerce
import MovieIcon from "@mui/icons-material/Movie"; // películas
import QuizIcon from "@mui/icons-material/Quiz"; // quiz educativo
import FunctionsIcon from "@mui/icons-material/Functions"; // calculadora

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
    titulo: "Buscador de películas",
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
];

export default function Projects() {
  const theme = useTheme();

  return (
    <Box
      id="projects"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: theme.palette.text.primary,
      }}
    >
      {/* Encabezado tipo badge con texto */}
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
            justifyContent: "center",
            px: 4,
            py: 1.2,
            borderRadius: "999px",
            background:
              theme.palette.mode === "dark"
                ? "rgba(144,202,249,0.1)"
                : "rgba(25,118,210,0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: theme.palette.mode === "dark" ? "#bbdefb" : "#1976d2",
            }}
          >
            Algunos Proyectos
          </Typography>
        </Box>
      </motion.div>

      {/* Grid de proyectos */}
      <Grid container spacing={3} justifyContent="center">
        {proyectos.map((p, i) => {
          const Icon = p.icon;
          return (
            <Grid item xs={12} sm={6} md={4} key={i}>
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
                        color: theme.palette.text.primary,
                        fontWeight: "bold",
                      }}
                    >
                      {p.titulo}
                    </Link>
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
