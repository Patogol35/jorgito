import { Typography, Grid, Box, Link } from "@mui/material";
import { motion } from "framer-motion";
import { FolderCode } from "lucide-react";
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
    link: "https://jorgepatriciosantamariacherrezmovie.vercel.app/",
    color: "#16a34a",
  },
];

export default function Projects() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      id="projects"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: theme.palette.text.primary, // mantiene el color del texto general
        background: "transparent", // mantiene exactamente el fondo que tenías
      }}
    >
      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "1rem" }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            color: isDark ? "#ffffff" : "#1976d2", // más claro en modo oscuro
            position: "relative",
            mb: 4,
            display: "inline-block",
          }}
        >
          Proyectos
          <Box
            component="span"
            sx={{
              position: "absolute",
              left: "50%",
              bottom: -6,
              transform: "translateX(-50%)",
              width: "60%",
              height: "3px",
              background: isDark ? "#ffffff" : "#1976d2",
              borderRadius: "6px",
            }}
          />
        </Typography>
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
                  sx={{
                    fontWeight: "bold",
                    mt: 1,
                    color: isDark ? "#ffffff" : theme.palette.text.primary,
                  }}
                >
                  <Link
                    href={p.link}
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: p.color, // mantiene color exacto de los enlaces
                      fontWeight: "bold",
                      "&:hover": { textDecoration: "underline" },
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
