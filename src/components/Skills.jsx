import { useState, useRef, useEffect } from "react";
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
  const filtersRef = useRef(null);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  const filteredSkills =
    filter === "All" ? skills : skills.filter((s) => s.category === filter);

  const cardBg = isDark
    ? "rgba(255,255,255,0.05)"
    : "rgba(255,255,255,0.8)";

  /* =========================
     AUTO SCROLL AL SELECCIONAR
  ========================= */
  useEffect(() => {
    if (!filtersRef.current) return;

    const active = filtersRef.current.querySelector(
      ".MuiToggleButton-root.Mui-selected"
    );

    active?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [filter]);

  return (
    <Box
      id="skills"
      sx={{
  py: 4,
  color: theme.palette.text.primary,
}}
    >
      <Container>

        {/* =========================
            TÍTULO
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
            <BuildIcon sx={{ fontSize: 22, color: primaryColor }} />
            <Typography variant="h6" fontWeight="bold" color={primaryColor}>
              Stack Tecnológico
            </Typography>
          </Box>
        </motion.div>

        {/* =========================
            FILTROS PRO + SCROLL
        ========================= */}
        <Box
          display="flex"
          justifyContent="center"
          mb={6}
          sx={{
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <ToggleButtonGroup
            ref={filtersRef}
            value={filter}
            exclusive
            onChange={(e, val) => val && setFilter(val)}
            sx={{
              px: 1,
              py: 0.6,
              gap: 0.8,
              borderRadius: "999px",
              background: isDark
                ? "rgba(255,255,255,0.05)"
                : "rgba(255,255,255,0.75)",
              backdropFilter: "blur(14px)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid rgba(0,0,0,0.08)",
              boxShadow: isDark
                ? "0 6px 18px rgba(0,0,0,0.45)"
                : "0 6px 18px rgba(0,0,0,0.15)",
              flexWrap: "nowrap",
            }}
          >
            {categories.map((cat) => (
              <ToggleButton
                key={cat}
                value={cat}
                sx={{
                  whiteSpace: "nowrap",
                  fontWeight: 600,
                  px: 2.2,
                  py: 0.7,
                  fontSize: "0.8rem",
                  minHeight: "34px",
                  borderRadius: "999px",
                  border: "none",
                  flexShrink: 0,
                  color: theme.palette.text.secondary,

                  "&.Mui-selected": {
                    background: `linear-gradient(90deg, ${primary}, #6366f1)`,
                    color: "#fff",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  },
                }}
              >
                {cat}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* =========================
            GRID DE SKILLS
        ========================= */}
        <Grid container spacing={4} justifyContent="center">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <Grid item xs={6} sm={4} md={3} key={skill.name}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
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
                        filter: isDark ? "invert(1) brightness(1.2)" : "none",
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
