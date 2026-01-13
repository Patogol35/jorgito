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
import { motion, AnimatePresence } from "framer-motion";

import BuildIcon from "@mui/icons-material/Build";
import GroupsIcon from "@mui/icons-material/Groups";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

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

const invertOnDark = ["MySQL"];

const categoryIcons = {
  All: <AllInclusiveIcon fontSize="small" />,
  Frontend: <CodeIcon fontSize="small" />,
  Backend: <BuildCircleIcon fontSize="small" />,
  Database: <StorageIcon fontSize="small" />,
  Cloud: <CloudQueueIcon fontSize="small" />,
  Tools: <BuildIcon fontSize="small" />,
};

/* =========================
ANIMATIONS
========================= */
const fadeScale = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.8 },
  viewport: { once: true },
};

/* =========================
COMPONENT
========================= */
export default function Skills() {
  const [filter, setFilter] = useState("All");
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

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

  const filteredSkills = useMemo(
    () => (filter === "All" ? skills : skills.filter(s => s.category === filter)),
    [filter]
  );

  const cardBg = isDark
    ? "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))"
    : "rgba(255,255,255,0.9)";

  return (
    <Box id="skills" sx={{ py: 4, scrollMarginTop: "80px" }}>
      <Container>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "2rem" }}
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
            <GroupsIcon sx={{ fontSize: 22, color: primaryColor }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: primaryColor, lineHeight: 1 }}
            >
              Stack Tecnológico
            </Typography>
          </Box>
        </motion.div>

        {/* FILTERS */}
        <motion.div {...fadeScale} transition={{ duration: 0.8, delay: 0.15 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
            <Box
              ref={containerRef}
              sx={{
                maxWidth: "100%",
                overflowX: "auto",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={(e, val) => val && setFilter(val)}
                sx={{ display: "inline-flex", gap: 1.2, py: 0.5 }}
              >
                {categories.map(cat => (
                  <ToggleButton
                    key={cat}
                    value={cat}
                    ref={el => (buttonRefs.current[cat] = el)}
                    sx={{
                      borderRadius: "999px",
                      px: 2.4,
                      py: 1,
                      fontWeight: 600,
                      textTransform: "none",
                      display: "flex",
                      gap: 1,
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(255,255,255,0.9)",
                      border: `1px solid ${
                        isDark
                          ? "rgba(255,255,255,0.12)"
                          : "rgba(0,0,0,0.12)"
                      }`,
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
        </motion.div>

        {/* GRID */}
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <Grid item xs={6} sm={4} md={4} lg={3} key={skill.name}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  style={{ height: "100%" }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      height: 210,
                   width: "100%",
                  maxWidth: "100%",
                      
                      textAlign: "center",
                      borderRadius: "22px",
                      background: cardBg,

                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",

                      border: isDark
                        ? "1.5px solid rgba(255,255,255,0.35)"
                        : "1.5px solid rgba(0,0,0,0.18)",

                      boxShadow: isDark
                        ? "0 6px 20px rgba(0,0,0,0.45)"
                        : "0 6px 20px rgba(0,0,0,0.12)",

                      transition: "all 0.3s ease",

                      "&:hover": {
                        transform: "translateY(-6px)",
                        borderColor: isDark ? "#ffffff" : "#000000",
                        boxShadow: isDark
                          ? "0 12px 30px rgba(0,0,0,0.6)"
                          : "0 12px 30px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={skill.img}
                      alt={skill.name}
                      sx={{
                        width: 60,
                        height: 60,
                        mb: 2,
                        objectFit: "contain",
                        filter: isDark
                          ? `${invertOnDark.includes(skill.name)
                              ? "invert(1) brightness(1.15)"
                              : ""}
                             drop-shadow(0 0 6px rgba(255,255,255,0.35))`
                          : "none",
                        transition: "transform 0.35s ease",
                        "&:hover": {
                          transform: "scale(1.08) rotate(5deg)",
                        },
                      }}
                    />
                    <Typography fontWeight="bold" fontSize={14}>
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
