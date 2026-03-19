import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

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
   DATA (NO SE TOCA)
========================= */

const categories = ["All", "Frontend", "Backend", "Database", "Cloud", "Tools"];

const skills = [
  { name: "React", category: "Frontend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "JavaScript", category: "Frontend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Spring", category: "Backend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Python", category: "Backend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "MySQL", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Postgres", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
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
  { name: "Ubuntu", category: "Tools", img: "https://res.cloudinary.com/dqkwc0kf7/image/upload/v1768394423/UbuntuCoF.svg_xjbvw9.png" },
  { name: "GitHub", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"},
  { name: "Elasticsearch", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg" },
  { name: "NextDNS", category: "Tools", img: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdns.svg" },
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

  const { t } = useTranslation();

  const [filter, setFilter] = useState("All");

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

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

        {/* 🔥 SOLO ESTO CAMBIA */}
        <Typography variant="h4" align="center" mb={4}>
          {t("skills.title")}
        </Typography>

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
                >
                  {categoryIcons[cat]}
                  {t(`skills.categories.${cat}`)}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <Grid item xs={6} sm={4} md={3} key={skill.name}>
                <Paper sx={{ p: 3, textAlign: "center" }}>
                  <Box component="img" src={skill.img} alt={skill.name} />
                  <Typography>{skill.name}</Typography>
                </Paper>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

      </Container>
    </Box>
  );
}
