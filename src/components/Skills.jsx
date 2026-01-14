import { useState, useRef, useEffect } from "react";
import BuildIcon from "@mui/icons-material/Build";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
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
  { name: "Spring", category: "Backend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
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
  { name: "Linux", category: "Tools", img: "https://res.cloudinary.com/dqkwc0kf7/image/upload/v1768393747/file_000000006cec720ea61024e7b054235c-removebg-preview_z2abgd.png" },
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

  // 🔥 MISMO COLOR QUE CERTIFICATIONS
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

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
    <Box id="skills" sx={{ py: 4, scrollMarginTop: "80px" }}>
      <Container>

        {/* =========================
            HEADER (IGUAL A CERTIFICATIONS)
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
            <BuildIcon
              sx={{ fontSize: 22, color: primaryColor }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: primaryColor, lineHeight: 1 }}
            >
              Stack Tecnológico
            </Typography>
          </Box>
        </motion.div>
        {/* =========================
            FILTERS
        ========================= */}
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
              sx={{
                display: "inline-flex",
                gap: 1.2,
                py: 0.5,
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
                    color: isDark
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(0,0,0,0.75)",
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

        {/* =========================
            GRID
        ========================= */}
        <Grid container spacing={4} justifyContent="center">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <Grid item xs={6} sm={4} md={3} key={skill.name}>
                <motion.div
  initial={{ opacity: 0, y: 30, scale: 0.95 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
  transition={{
    duration: 0.45,
    delay: index * 0.06,
    ease: "easeOut",
  }}
  viewport={{ once: true }}
>
  <Paper
    sx={{
      p: 3,
      textAlign: "center",
      borderRadius: "22px",
      background: cardBg,
      border: `1px solid ${
        isDark
          ? "rgba(255,255,255,0.15)"
          : "rgba(0,0,0,0.12)"
      }`,
      boxShadow: isDark
        ? "0 0 0 1px rgba(255,255,255,0.05)"
        : "0 4px 12px rgba(0,0,0,0.06)",
      transition: "all 0.25s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        borderColor: theme.palette.primary.main,
        boxShadow: isDark
          ? "0 8px 20px rgba(0,0,0,0.5)"
          : "0 8px 20px rgba(0,0,0,0.12)",
      },
    }}
  >
  <Box
  component={motion.img}
  src={skill.img}
  alt={skill.name}
  whileHover={{
    scale: 1.14,
    rotate: [0, 4, -4, 2.5, 0],
    y: -5,
  }}
  whileTap={{
    scale: 0.94,
    rotate: 240,
  }}
  transition={{
    type: "spring",
    stiffness: 200,
    damping: 16,
    mass: 0.65,
  }}
  sx={{
    width: 65,
    height: 65,
    mb: 2,
    objectFit: "contain",
    filter: isDark
      ? "invert(1) brightness(1.22) drop-shadow(0 0 5px rgba(255,255,255,0.3))"
      : "drop-shadow(0 0 5px rgba(0,0,0,0.22))",
    willChange: "transform",
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
