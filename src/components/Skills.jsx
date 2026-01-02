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
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

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

        {/* =========================
            TÍTULO SKILLS
            (MISMO DISEÑO QUE ABOUT)
        ========================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              px: 3,
              py: 0.9,
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
            {/* Icono SIN fondo */}
            <BuildIcon sx={{ fontSize: 22, color: primaryColor }} />

            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: primaryColor, lineHeight: 1 }}
            >
              Stack Tecnológico
            </Typography>
          </Box>
        </motion.div>

        {/* =========================
    FILTROS (MEJORADOS)
========================= */}
<Box display="flex" justifyContent="center" mb={5}>
  <ToggleButtonGroup
    value={filter}
    exclusive
    onChange={(e, val) => val && setFilter(val)}
    aria-label="Filtros de Skills"
    sx={{
      p: 0.5,
      gap: 0.5,
      borderRadius: "999px",
      background: isDark
        ? "rgba(255,255,255,0.04)"
        : "rgba(255,255,255,0.55)",
      backdropFilter: "blur(10px)",
      border: isDark
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(0,0,0,0.06)",
      boxShadow: isDark
        ? "0 2px 8px rgba(0,0,0,0.4)"
        : "0 2px 8px rgba(0,0,0,0.1)",
    }}
  >
    {categories.map((cat) => (
      <ToggleButton
        key={cat}
        value={cat}
        sx={{
          textTransform: "none",
          fontWeight: 500,
          px: 1.6,
          py: 0.4,
          fontSize: "0.75rem",
          borderRadius: "999px",
          border: "none",
          color: theme.palette.text.secondary,
          transition: "all 0.25s ease",

          "&.Mui-selected": {
            background: `linear-gradient(90deg, ${primary}, #6366f1)`,
            color: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          },

          "&:hover": {
            background: isDark
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.05)",
            color: theme.palette.text.primary,
          },
        }}
      >
        {cat}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
</Box>

        {/* =========================
            GRID DE SKILLS (SIN CAMBIOS)
        ========================= */}
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
                        filter: isDark
                          ? "invert(1) brightness(1.2)"
                          : "none",
                      }}
                    />
                    <Typography variant="subtitle1" fontWeight="bold">
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
