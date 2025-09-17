import { Typography, Grid, Box, Link } from "@mui/material";
import { motion } from "framer-motion";
import { FolderCode } from "lucide-react"; // Ícono para proyectos
import { useTheme } from "@mui/material/styles";

const proyectos = [
  {
    titulo: "🌤 App para ver el clima",
    link: "https://jorgepatriciosantamariacherrezweath.vercel.app/",
    color: "#1976d2",
  },
  {
    titulo: "🛒 Tienda Full Stack (React + Django)",
    link: "https://patriciosantamariaapp.vercel.app/",
    color: "#9333ea",
  },
  {
    titulo: "🎬 Buscador de películas",
    link: "https://movie-explorer-jorge-patricio.vercel.app/",
    color: "#16a34a",
  },
  {
    titulo: "📚 Quiz educativo de Ambato y Ecuador",
    link: "https://quiz-educativo-jorgepatricio.vercel.app/",
    color: "#e11d48", // rojo educativo llamativo
  },
  {
    titulo: "🧮 Calculadora Científica",
    link: "https://calculadorajorgepatricio.vercel.app/",
    color: "#f59e0b", // amarillo llamativo
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
              // 🔵 igual al original
              color: theme.palette.mode === "dark" ? "#bbdefb" : "#1976d2",
            }}
          >
            Proyectos
          </Typography>
        </Box>
      </motion.div>

      {/* Grid de proyectos */}
      <Grid container spacing={3} justifyContent="center">
        {proyectos.map((p, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.3 }}
              viewport={{ once: false }}
            >
              <Box sx={{ textAlign: "center", px: 1 }}>
                <FolderCode size={28} color={p.color} />
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mt: 1 }}
                >
                  <Link
                    href={p.link}
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      // ✅ ahora los links usan el color del tema
                      color: theme.palette.text.primary,
                      fontWeight: "bold",
                      "&:hover": {
                        textDecoration: "underline",
                        color: p.color, // se resalta con el color del proyecto
                      },
                    }}
                  >
                    {p.titulo}
                  </Link>
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
