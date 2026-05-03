import { useState, useRef, useEffect, useMemo } from "react";
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

import { motion } from "framer-motion";

/* =========================
   🎬 ANIMACIONES
========================= */

const fadeCinematic = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

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
  { name: "MS Office", category: "Tools", img: "https://i.imgur.com/8EBPyBH.png" },
  { name: "Ubuntu", category: "Tools", img: "https://i.imgur.com/VgVlsE6.png" },
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

export default function Skills({ t }) {
  const [filter, setFilter] = useState("All");

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

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
    () => (filter === "All" ? skills : skills.filter((s) => s.category === filter)),
    [filter]
  );

  return (
    <Box
      id="skills"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        backgroundColor: theme.palette.background.default,
        transition: "background-color 0.4s ease", // 🔥 anti flash global
      }}
    >
      <Container>

        <motion.div initial="hidden" animate="visible">

          {/* 🔥 TÍTULO */}
          <motion.div variants={fadeCinematic}>
            <Box textAlign="center" mb={4}>
              <Typography variant="h6" fontWeight="bold">
                {t.skills.title}
              </Typography>
            </Box>
          </motion.div>

          {/* 🔥 FILTROS */}
          <motion.div variants={fadeCinematic}>
            <Box display="flex" justifyContent="center" mb={6}>
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
          </motion.div>

          {/* 🔥 GRID */}
          <motion.div variants={fadeCinematic}>
            <Grid container spacing={4} justifyContent="center">
              {filteredSkills.map((skill) => (
                <Grid item xs={6} sm={4} md={3} key={skill.name}>
                  <motion.div layout>
                    <Paper
                      sx={{
                        p: 3,
                        textAlign: "center",
                        borderRadius: "20px",
                        backgroundColor: theme.palette.background.paper,
                        transition: "all 0.4s ease",
                        willChange: "transform, background-color",
                        "&:hover": {
                          transform: "translateY(-6px)",
                        },
                      }}
                    >
                      <Box
                        component={motion.img}
                        src={skill.img}
                        alt={skill.name}
                        whileHover={{ scale: 1.1 }}
                        sx={{
                          width: 65,
                          height: 65,
                          mb: 2,
                          objectFit: "contain",
                          transition: "transform 0.3s ease",
                        }}
                      />

                      <Typography fontWeight="bold">
                        {skill.name}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

        </motion.div>

      </Container>
    </Box>
  );
                  }
