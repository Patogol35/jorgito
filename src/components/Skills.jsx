import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const skills = [
  { name: "React", category: "Frontend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "JavaScript", category: "Frontend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Spring Boot", category: "Backend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Python", category: "Backend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "MySQL", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Elasticsearch", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg" },
  { name: "AWS", category: "Cloud", img: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
  { name: "Vercel", category: "Cloud", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg" },
  { name: "Render", category: "Cloud", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/render.svg" },
  { name: "Postman", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "npm", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
];

export default function Skills() {
  const [filter, setFilter] = useState("All");

  const filteredSkills =
    filter === "All" ? skills : skills.filter((s) => s.category === filter);

  return (
    <Box
      id="skills"
      sx={{
        background: "linear-gradient(135deg, #eef2ff, #f0f9ff)",
        py: 12,
        minHeight: "100vh", // Fuerza a que ocupe toda la pantalla vertical
      }}
    >
      <Container>
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              mb: 6,
              background: "linear-gradient(90deg, #1976d2, #6d28d9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Tecnologías que domino
          </Typography>
        </motion.div>

        {/* Filtros */}
        <Box display="flex" justifyContent="center" mb={6}>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(e, newFilter) => newFilter && setFilter(newFilter)}
            aria-label="Filtros de Skills"
            sx={{
              background: "rgba(255,255,255,0.6)",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            {["All", "Frontend", "Backend", "Database", "Cloud", "Tools"].map(
              (cat) => (
                <ToggleButton
                  key={cat}
                  value={cat}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    px: 2,
                    "&.Mui-selected": {
                      background: "linear-gradient(90deg,#1976d2,#6d28d9)",
                      color: "white",
                    },
                  }}
                >
                  {cat}
                </ToggleButton>
              )
            )}
          </ToggleButtonGroup>
        </Box>

        {/* Grid con animaciones */}
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch" // Hace que todos los items tengan la misma altura
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                key={skill.name}
                sx={{ display: "flex" }} // Esto permite que Paper se estire verticalmente
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.08 }}
                  style={{ width: "100%" }}
                >
                  <Paper
                    elevation={8}
                    sx={{
                      p: 3,
                      textAlign: "center",
                      borderRadius: "20px",
                      backdropFilter: "blur(12px)",
                      background: "rgba(255, 255, 255, 0.8)",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease-in-out",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.95)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
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
                        objectFit: "contain",
                        mb: 2,
                        transition: "transform 0.3s ease",
                        "&:hover": { transform: "rotate(8deg) scale(1.1)" },
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{
                        transition: "color 0.3s",
                        "&:hover": { color: "#1976d2" },
                      }}
                    >
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
