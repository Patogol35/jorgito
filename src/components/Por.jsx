import { Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useTheme } from "@mui/material/styles";

const estudios = [
  {
    titulo: "Máster en Ingeniería de Software y Sistemas Informáticos",
    institucion: "Universidad Internacional de La Rioja, España",
    detalle: "Nota TFM: 9 | Promedio final: 8.68",
    iconColor: "#1976d2",
  },
  {
    titulo: "Ingeniero en Sistemas",
    institucion: "Universidad Indoamérica, Ecuador",
    detalle: "Nota Tesis: 9.50 | Promedio final: 9",
    iconColor: "#9333ea",
  },
];

export default function About() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  const secondary = theme.palette.text.secondary;
  const subtitleStyle = { fontWeight: "bold", mt: 1 };

  return (
    <Box
      id="about"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: theme.palette.text.primary,
      }}
    >
      {/* Encabezado — MISMO ESTILO QUE CERTIFICACIONES */}
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
            <GraduationCap size={20} color="#fff" />
          </Box>

          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: primaryColor }}
          >
            Formación
          </Typography>
        </Box>
      </motion.div>

      {/* Grid de estudios */}
      <Grid container spacing={3} justifyContent="center">
        {estudios.map((est, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.3 }}
              viewport={{ once: false }}
            >
              <Box sx={{ textAlign: "center", px: 1 }}>
                <GraduationCap size={28} color={est.iconColor} />
                <Typography variant="subtitle1" sx={subtitleStyle}>
                  {est.titulo}
                </Typography>
                <Typography variant="body2" color={secondary}>
                  {est.institucion}
                </Typography>
                <Typography variant="body2" color={secondary}>
                  {est.detalle}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
    }




import { useState, useRef, useEffect } from "react";
import BuildIcon from "@mui/icons-material/Build";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

/* =========================
   DATA
========================= */
const categories = ["All", "Frontend", "Backend", "Database", "Cloud", "Tools"];

const skills = [
  { name: "React", category: "Frontend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "JavaScript", category: "Frontend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Spring Boot", category: "Backend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Python", category: "Backend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "MySQL", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Elasticsearch", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg" },
  { name: "Supabase", category: "Database", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/supabase.svg" },
  { name: "AWS", category: "Cloud", img: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
  { name: "Vercel", category: "Cloud", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg" },
  { name: "Render", category: "Cloud", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/render.svg" },
  { name: "Postman", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "npm", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
];
const categoryIcons = {
  All: <AllInclusiveIcon fontSize="small" />,
  Frontend: <CodeIcon fontSize="small" />,
  Backend: <BuildCircleIcon fontSize="small" />,
  Database: <StorageIcon fontSize="small" />,
  Cloud: <CloudQueueIcon fontSize="small" />,
  Tools: <BuildIcon fontSize="small" />,
};
/* =========================
   COMPONENT
========================= */
export default function Skills() {
  const [filter, setFilter] = useState("All");
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;

  const containerRef = useRef(null);
  const buttonRefs = useRef({});

  useEffect(() => {
    const activeBtn = buttonRefs.current[filter];
    const container = containerRef.current;

    if (activeBtn && container) {
      container.scrollTo({
        left:
          activeBtn.offsetLeft -
          container.offsetWidth / 2 +
          activeBtn.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  }, [filter]);

  const filteredSkills =
    filter === "All" ? skills : skills.filter((s) => s.category === filter);

  const cardBg = isDark
    ? "rgba(255,255,255,0.05)"
    : "rgba(255,255,255,0.85)";

  return (
    <Box id="skills" sx={{ py: 6, scrollMarginTop: "80px" }}>
      <Container>

        {/* =========================
            HEADER
        ========================= */}
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
              <BuildIcon sx={{ color: "#fff", fontSize: 20 }} />
            </Box>

            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: primary }}
            >
              Tecnologías
            </Typography>
          </Box>
        </motion.div>

        {/* =========================
    FILTROS
========================= */}
<Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
  <ToggleButtonGroup
    ref={containerRef}
    value={filter}
    exclusive
    onChange={(e, val) => val && setFilter(val)}
    sx={{
      display: "flex",
      overflowX: "auto",
      gap: 1.2,
      px: 2,
      py: 0.5,
      "&::-webkit-scrollbar": { display: "none" },
    }}
  >
    {categories.map((cat) => (
      <ToggleButton
        key={cat}
        value={cat}
        ref={(el) => (buttonRefs.current[cat] = el)}
        component={motion.button}
        whileTap={{ scale: 0.92 }}
        sx={{
          borderRadius: "999px",
          px: 2.4,
          py: 1,
          fontWeight: 600,
          fontSize: "0.9rem",
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          gap: 1,

          backgroundColor: isDark
            ? "rgba(255,255,255,0.04)"
            : "rgba(255,255,255,0.9)",
          color: isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)",
          border: `1px solid ${
            isDark
              ? "rgba(255,255,255,0.12)"
              : "rgba(0,0,0,0.12)"
          }`,

          "&:hover": {
            backgroundColor: isDark
              ? "rgba(255,255,255,0.08)"
              : "rgba(25,118,210,0.06)",
          },

          "&.Mui-selected": {
            background: `linear-gradient(135deg, ${primary}, ${theme.palette.primary.dark})`,
            color: "#fff",
            borderColor: "transparent",
            boxShadow: isDark
              ? "0 6px 16px rgba(0,0,0,0.4)"
              : "0 6px 14px rgba(25,118,210,0.35)",
          },

          "&.Mui-selected:hover": {
            background: `linear-gradient(135deg, ${primary}, ${theme.palette.primary.dark})`,
          },
        }}
      >
        {categoryIcons[cat]}
        {cat}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
</Box>
        {/* =========================
            GRID
        ========================= */}
        <Grid container spacing={4} justifyContent="center">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <Grid item xs={6} sm={4} md={3} key={skill.name}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      textAlign: "center",
                      borderRadius: "22px",
                      background: cardBg,
                    }}
                  >
                    <Box
                      component="img"
                      src={skill.img}
                      alt={skill.name}
                      sx={{
                        width: 65,
                        height: 65,
                        mb: 2,
                        objectFit: "contain",
                        filter: isDark ? "invert(1)" : "none",
                      }}
                    />
                    <Typography fontWeight="bold">
                      {skill.name}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

      </Container>
    </Box>
  );
}
