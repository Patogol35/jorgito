import { useState, useRef, useEffect, useMemo } from "react";
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

import BuildIcon from "@mui/icons-material/Build";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

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
  { name: "VirtualBox", category: "Tools", img: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/virtualbox.svg" },
  { name: "Git", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "AnyDesk", category: "Tools", img: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anydesk.svg" },
  { name: "MS Office", category: "Tools", img: "https://res.cloudinary.com/dqkwc0kf7/image/upload/v1768227236/office_732222_wevshn.png" },
  { name: "Linux", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
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

  const containerRef = useRef(null);
  const buttonRefs = useRef({});

  /* Scroll automático al botón activo */
  useEffect(() => {
    const btn = buttonRefs.current[filter];
    const container = containerRef.current;

    if (btn && container) {
      container.scrollTo({
        left: btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  }, [filter]);

  /* Skills filtrados */
  const filteredSkills = useMemo(() => {
    return filter === "All"
      ? skills
      : skills.filter((s) => s.category === filter);
  }, [filter]);

  const cardBg = isDark
    ? "rgba(255,255,255,0.06)"
    : "rgba(255,255,255,0.92)";

  const primary = theme.palette.primary.main;
  const primaryLight = theme.palette.primary.light;

  return (
    <Box id="skills" sx={{ py: 6, scrollMarginTop: "80px" }}>
      <Container>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 3,
              py: 1,
              borderRadius: "999px",
              background: isDark
                ? "rgba(144,202,249,0.08)"
                : "rgba(25,118,210,0.08)",
              border: `1px solid ${
                isDark
                  ? "rgba(144,202,249,0.3)"
                  : "rgba(25,118,210,0.3)"
              }`,
            }}
          >
            <BuildIcon sx={{ color: primaryLight }} />
            <Typography fontWeight="bold" color={primaryLight}>
              Stack Tecnológico
            </Typography>
          </Box>
        </motion.div>

        {/* FILTERS */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
          <Box
            ref={containerRef}
            sx={{
              overflowX: "auto",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <ToggleButtonGroup
              aria-label="Filtro de tecnologías"
              value={filter}
              exclusive
              onChange={(_, val) => val && setFilter(val)}
              sx={{ gap: 1.2 }}
            >
              {categories.map((cat) => (
                <ToggleButton
                  key={cat}
                  value={cat}
                  ref={(el) => (buttonRefs.current[cat] = el)}
                  sx={{
                    borderRadius: "999px",
                    px: 2.5,
                    py: 1,
                    fontWeight: 600,
                    textTransform: "none",
                    display: "flex",
                    gap: 1,
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "#fff",
                    border: "1px solid rgba(0,0,0,0.12)",
                    "&.Mui-selected": {
                      background: `linear-gradient(135deg, ${primary}, ${theme.palette.primary.dark})`,
                      color: "#fff",
                      borderColor: "transparent",
                    },
                  }}
                >
                  {categoryIcons[cat]}
                  {cat}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* GRID */}
        <Grid container spacing={4} justifyContent="center">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <Grid item xs={6} sm={4} md={3} key={skill.name}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      textAlign: "center",
                      borderRadius: "22px",
                      background: cardBg,
                      border: "1px solid rgba(0,0,0,0.12)",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        borderColor: primary,
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
                        filter: isDark
                          ? "brightness(1.15) drop-shadow(0 0 5px rgba(144,202,249,0.5))"
                          : "none",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "rotate(6deg) scale(1.1)",
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
