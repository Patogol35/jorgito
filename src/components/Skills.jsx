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

import {
  fadeCinematic,
  containerAnim,
  skillCardMotion,
  skillsStyles,
} from "../Styles/skillsStyles";

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
  {
    name: "React",
    category: "Frontend",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "JavaScript",
    category: "Frontend",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Spring",
    category: "Backend",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  },
  {
    name: "Python",
    category: "Backend",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "MySQL",
    category: "Database",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "Postgres",
    category: "Database",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Neon",
    category: "Database",
    img: "https://i.imgur.com/yhv3MpU.png",
  },
  {
    name: "AWS",
    category: "Cloud",
    img: "https://cdn.worldvectorlogo.com/logos/aws-2.svg",
  },
  {
    name: "Vercel",
    category: "Cloud",
    img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg",
  },
  {
    name: "Render",
    category: "Cloud",
    img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/render.svg",
  },
  {
    name: "Postman",
    category: "Tools",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  },
  {
    name: "VirtualBox",
    category: "Tools",
    img: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/virtualbox.svg",
  },
  {
    name: "AnyDesk",
    category: "Tools",
    img: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anydesk.svg",
  },
  {
    name: "MS Office",
    category: "Tools",
    img: "https://i.imgur.com/8EBPyBH.png",
  },
  {
    name: "Ubuntu",
    category: "Tools",
    img: "https://i.imgur.com/VgVlsE6.png",
  },
  {
    name: "Elasticsearch",
    category: "Database",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg",
  },
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

  const primaryColor = isDark
    ? "#bbdefb"
    : "#1976d2";

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
    filter === "All"
      ? skills
      : skills.filter(
          (s) => s.category === filter
        );

  const cardBg = isDark
    ? "rgba(255,255,255,0.05)"
    : "rgba(255,255,255,0.85)";

  return (
    <Box
      id="skills"
      sx={skillsStyles.section}
    >
      <Container>

        {/* TÍTULO */}

        <motion.div
          variants={containerAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeCinematic}>
            <Box sx={skillsStyles.titleContainer}>

              <Box
                sx={skillsStyles.titleBadge(isDark)}
              >
                <BuildIcon
                  sx={{
                    fontSize: 22,
                    color: primaryColor,
                  }}
                />

                <Typography
                  variant="h6"
                  sx={skillsStyles.title(
                    primaryColor
                  )}
                >
                  {t.skills.title}
                </Typography>
              </Box>

            </Box>
          </motion.div>
        </motion.div>

        {/* FILTERS */}

        <Box sx={skillsStyles.filtersContainer}>
          <Box
            ref={containerRef}
            sx={skillsStyles.filtersScroll}
          >
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={(e, val) =>
                val && setFilter(val)
              }
              sx={skillsStyles.filterGroup}
            >
              {categories.map((cat) => (
                <ToggleButton
                  key={cat}
                  value={cat}
                  ref={(el) =>
                    (buttonRefs.current[cat] = el)
                  }
                  component={motion.button}
                  whileTap={{ scale: 0.92 }}
                  sx={skillsStyles.filterButton(
                    isDark,
                    primary,
                    theme.palette.primary.dark
                  )}
                >
                  {categoryIcons[cat]}
                  {cat}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* GRID */}

        <Grid
          container
          spacing={4}
          justifyContent="center"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                key={skill.name}
              >
                <motion.div
                  layout
                  {...skillCardMotion}
                >
                  <Paper
                    sx={skillsStyles.card(
                      cardBg,
                      theme.palette.primary.main
                    )}
                  >
                    <Box
                      component={motion.img}
                      src={skill.img}
                      alt={skill.name}
                      whileHover={{
                        scale: 1.12,
                        rotate: [0, 3, -3, 2, 0],
                        y: -4,
                      }}
                      whileTap={{
                        scale: 0.94,
                        rotate: 180,
                      }}
                      transition={{
                        rotate: {
                          duration: 0.45,
                          ease: "easeInOut",
                        },
                        scale: {
                          type: "spring",
                          stiffness: 220,
                          damping: 14,
                        },
                      }}
                      sx={skillsStyles.skillIcon(
                        isDark
                      )}
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
