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
              px: 4,
              py: 1.2,
              borderRadius: "999px",
              background: isDark
                ? "rgba(144,202,249,0.1)"
                : "rgba(25,118,210,0.1)",
            }}
          >
            <BuildIcon
              sx={{ fontSize: 26, mr: 1.2, color: isDark ? "#bbdefb" : "#1976d2" }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: isDark ? "#bbdefb" : "#1976d2",
              }}
            >
              Stack Tecnológico
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
                          
