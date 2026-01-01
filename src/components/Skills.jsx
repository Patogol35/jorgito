import { useState } from "react";
import BuildIcon from "@mui/icons-material/Build";
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

export default function Skills() {
  const [filter, setFilter] = useState("All");
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;

  const filteredSkills =
    filter === "All" ? skills : skills.filter((s) => s.category === filter);

  const cardBg = isDark
    ? "rgba(255,255,255,0.05)"
    : "rgba(255,255,255,0.8)";

  return (
    <Box
      id="skills"
      sx={{ py: 4, scrollMarginTop: "80px", color: theme.palette.text.primary }}
    >
      <Container>
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
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
              <BuildIcon sx={{ fontSize: 20, color: "#fff" }} />
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: isDark ? "#bbdefb" : "#1976d2",
              }}
            >
              Tecnologías 
            </Typography>
          </Box>
        </motion.div>

{/* Filtros */}
<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    mb: 6,
    width: "100%",
  }}
>
  <ToggleButtonGroup
    value={filter}
    exclusive
    onChange={(e, val) => val && setFilter(val)}
    aria-label="Filtros de Skills"
    sx={{
      display: "flex",
      flexWrap: "nowrap",
      overflowX: "auto",
      px: { xs: 1, sm: 2 },
      py: 1,

      /* ❌ sin fondo */
      background: "transparent",
      boxShadow: "none",
      borderRadius: 0,

      /* 📏 más ancha */
      width: "100%",
      maxWidth: "900px", // ajusta si deseas más

      gap: { xs: 0.5, sm: 1 },

      '&::-webkit-scrollbar': { display: 'none' },
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',

      '& .MuiToggleButton-root': {
        whiteSpace: 'nowrap',
        minWidth: 'auto',
        px: { xs: 1.4, sm: 2.2 },   // ⬅ más ancho por botón
        py: { xs: 0.6, sm: 0.8 },
        fontSize: { xs: '0.8rem', sm: '0.9rem' },
        borderRadius: "999px",
        border: `1px solid ${theme.palette.divider}`,
        transition: "all 0.25s ease",
      },
    }}
  >
    {categories.map((cat) => (
      <ToggleButton
        key={cat}
        value={cat}
        sx={{
          textTransform: "none",
          fontWeight: 600,
          color: theme.palette.text.primary,

          "&.Mui-selected": {
            background: `linear-gradient(90deg, ${primary}, #6d28d9)`,
            color: "white",
            border: "none",
          },

          "&:hover": {
            background: isDark
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.06)",
          },
        }}
      >
        {cat}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
</Box>

        {/* Grid de Skills */}
        <Grid container spacing={4} justifyContent="center">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <Grid item xs={6} sm={4} md={3} key={skill.name}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08 }}
                >
                  <Paper
                    elevation={8}
                    sx={{
                      p: 3,
                      textAlign: "center",
                      borderRadius: "20px",
                      backdropFilter: "blur(12px)",
                      background: cardBg,
                      boxShadow: isDark
                        ? "0 8px 20px rgba(0,0,0,0.5)"
                        : "0 8px 20px rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        background: isDark
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(255,255,255,0.95)",
                        boxShadow: isDark
                          ? "0 12px 24px rgba(0,0,0,0.6)"
                          : "0 12px 24px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={skill.img}
                      alt={skill.name}
                      sx={{
                        width: 65,
                        height: 65,
                        objectFit: "contain",
                        mb: 2,
                        transition: "transform 0.3s ease, filter 0.3s ease",
                        filter: isDark ? "invert(1) brightness(1.2)" : "none",
                        "&:hover": { transform: "rotate(8deg) scale(1.1)" },
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{
                        transition: "color 0.3s",
                        color: theme.palette.text.primary,
                        "&:hover": { color: primary },
                      }}
                    >
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
