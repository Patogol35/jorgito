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
      gap: 1,
      px: 2,
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
          px: 2.6,
          py: 0.9,
          fontWeight: 600,
          textTransform: "none",
          backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "#fff",
          "&.Mui-selected": {
            background: `linear-gradient(90deg, ${primary}, ${theme.palette.primary.dark})`,
            color: "#fff",
          },
        }}
      >
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
