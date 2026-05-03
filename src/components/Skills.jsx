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
  useTheme,
} from "@mui/material";

import { motion, AnimatePresence } from "framer-motion";

/* =========================
   🎬 Animaciones
========================= */

const easeOutExpo = [0.16, 1, 0.3, 1];

// 🔥 SOLO para títulos (NO tocar)
const fadeCinematic = {
  hidden: {
    opacity: 0,
    y: 20,
    clipPath: "inset(0 0 100% 0)",
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

// ✅ NUEVA animación para CARDS (SIN clipPath)
const fadeCard = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: easeOutExpo },
  },
};

const containerAnim = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

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

        <motion.div
          variants={containerAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >

          {/* TÍTULO */}
          <motion.div variants={fadeCinematic}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 3,
                  py: 1,
                  borderRadius: "999px",
                  background: isDark
                    ? "rgba(144,202,249,0.06)"
                    : "rgba(25,118,210,0.06)",
                  border: `1px solid ${
                    isDark
                      ? "rgba(144,202,249,0.25)"
                      : "rgba(25,118,210,0.25)"
                  }`,
                }}
              >
                <BuildIcon sx={{ fontSize: 22, color: primaryColor }} />
                <Typography fontWeight="bold" color={primaryColor}>
                  {t.skills.title}
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* FILTROS */}
          <motion.div variants={fadeCinematic}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
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

          {/* GRID */}
          <Grid container spacing={4}>
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <Grid item xs={6} sm={4} md={3} key={skill.name}>
                  <motion.div
                    layout
                    variants={fadeCard}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -6, scale: 1.04 }}
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
                      }}
                    >
                      <Box
                        component={motion.img}
                        src={skill.img}
                        alt={skill.name}
                        whileHover={{
                          scale: 1.15,
                          rotate: [0, 5, -5, 0],
                        }}
                        sx={{
                          width: 65,
                          height: 65,
                          mb: 2,
                          objectFit: "contain",
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

        </motion.div>
      </Container>
    </Box>
  );
                      }
