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

  /* 🎯 Auto-centrar filtro activo */
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
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
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
                ? "linear-gradient(135deg, rgba(144,202,249,0.15), rgba(144,202,249,0.05))"
                : "linear-gradient(135deg, rgba(25,118,210,0.15), rgba(25,118,210,0.05))",
              border: `1px solid ${
                isDark ? "rgba(144,202,249,0.25)" : "rgba(25,118,210,0.25)"
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
                background: primary,
                mr: 1.2,
              }}
            >
              <BuildIcon sx={{ fontSize: 20, color: "#fff" }} />
            </Box>

            <Typography variant="h6" fontWeight="bold" color={primary}>
              Tecnologías
            </Typography>
          </Box>
        </motion.div>

              
{/* =========================
    FILTROS (FIX DEFINITIVO)
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
      px: 2,
      py: 1,
      gap: 1,
      width: "100%",
      maxWidth: "960px",
      background: "transparent",
      '&::-webkit-scrollbar': { display: "none" },
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
          px: 2.6,
          py: 0.9,
          fontWeight: 600,
          fontSize: "0.9rem",
          textTransform: "none",
          transition: "all 0.25s ease",

          /* 🌞 MODO CLARO */
          backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "#ffffff",
          color: isDark ? "#e5e7eb" : "#111827",
          border: isDark
            ? "1px solid rgba(255,255,255,0.2)"
            : "1px solid rgba(0,0,0,0.12)",
          boxShadow: isDark
            ? "none"
            : "0 4px 10px rgba(0,0,0,0.08)",

          "&:hover": {
            backgroundColor: isDark
              ? "rgba(255,255,255,0.12)"
              : "#f9fafb",
          },

          /* 🔥 ACTIVO */
          "&.Mui-selected": {
            background: `linear-gradient(90deg, ${primary}, #6d28d9)`,
            color: "#ffffff",
            border: "none",
            boxShadow: "0 8px 22px rgba(0,0,0,0.25)",
          },
        }}
      >
        {cat}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
</Box>

        {/* =========================
            GRID SKILLS
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
                  whileHover={{ scale: 1.08 }}
                >
                  <Paper
                    elevation={10}
                    sx={{
                      p: 3,
                      textAlign: "center",
                      borderRadius: "22px",
                      backdropFilter: "blur(12px)",
                      background: cardBg,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: isDark
                          ? "0 14px 28px rgba(0,0,0,0.6)"
                          : "0 14px 28px rgba(0,0,0,0.2)",
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
                        mb: 2,
                        objectFit: "contain",
                        filter: isDark ? "invert(1) brightness(1.2)" : "none",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "rotate(8deg) scale(1.1)",
                        },
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
