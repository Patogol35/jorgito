import { useState, useRef, useEffect } from "react";
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
  Button,
  useTheme,
} from "@mui/material";

import { motion, AnimatePresence } from "framer-motion";

/* =========================
   DATA
========================= */

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "Cloud",
  "Tools",
];

const skills = [
  { name: "React", category: "Frontend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", url: "https://react.dev" },
  { name: "JavaScript", category: "Frontend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", url: "https://developer.mozilla.org" },
  { name: "Spring", category: "Backend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", url: "#" },
  { name: "Python", category: "Backend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", url: "#" },
  { name: "MySQL", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", url: "#" },
  { name: "Postgres", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", url: "#" },
  { name: "Supabase", category: "Database", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/supabase.svg", url: "#" },
  { name: "AWS", category: "Cloud", img: "https://cdn.worldvectorlogo.com/logos/aws-2.svg", url: "#" },
  { name: "Vercel", category: "Cloud", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg", url: "#" },
  { name: "Render", category: "Cloud", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/render.svg", url: "#" },
  { name: "Postman", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", url: "#" },
  { name: "npm", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg", url: "#" },
  { name: "VirtualBox", category: "Tools", img: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/virtualbox.svg", url: "#" },
  { name: "Git", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", url: "#" },
  { name: "AnyDesk", category: "Tools", img: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anydesk.svg", url: "#" },
  { name: "MS Office", category: "Tools", img: "https://res.cloudinary.com/dqkwc0kf7/image/upload/v1768227236/office_732222_wevshn.png", url: "#" },
  { name: "Ubuntu", category: "Tools", img: "https://i.imgur.com/VgVlsE6.png", url: "#" },
  { name: "GitHub", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", url: "https://github.com" },
  { name: "Elasticsearch", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg", url: "#" },
  { name: "NextDNS", category: "Tools", img: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdns.svg", url: "#" },
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

export default function Skills({ t }) {
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

        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 4, fontWeight: "bold", color: primaryColor }}
        >
          {t.skills.title}
        </Typography>

        {/* FILTERS */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
          <Box ref={containerRef} sx={{ overflowX: "auto" }}>
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={(e, val) => val && setFilter(val)}
            >
              {categories.map((cat) => (
                <ToggleButton
                  key={cat}
                  value={cat}
                  ref={(el) => (buttonRefs.current[cat] = el)}
                >
                  {categoryIcons[cat]} {cat}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* GRID */}
        <Grid container spacing={4} justifyContent="center">
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <Grid item xs={6} sm={4} md={3} key={skill.name}>
                <motion.div layout>
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
                      sx={{ width: 65, height: 65, mb: 2 }}
                    />

                    <Typography fontWeight="bold" mb={2}>
                      {skill.name}
                    </Typography>

                    {/* BOTÓN NUEVO */}
                    {skill.url && (
                      <Button
                        component={motion.a}
                        href={skill.url}
                        target="_blank"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        variant="contained"
                        sx={{
                          borderRadius: "999px",
                          textTransform: "none",
                          fontWeight: 600,
                        }}
                      >
                        Ver proyecto
                      </Button>
                    )}
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
