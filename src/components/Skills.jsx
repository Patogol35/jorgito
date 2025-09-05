import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";

const skills = [
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Spring Boot", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Elasticsearch", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg" },
  { name: "Postman", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "AWS", img: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
  { name: "Vercel", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg" },
  { name: "Render", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/render.svg" },
  { name: "npm", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
];

export default function Skills() {
  return (
    <Box
      id="skills"
      sx={{
        background: "linear-gradient(135deg, #eef2ff, #f0f9ff)",
        py: 12,
      }}
    >
      <Container>
        {/* Título animado con gradiente */}
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
              position: "relative",
              display: "inline-block",
            }}
          >
            Tecnologías que domino
            <Box
              component="span"
              sx={{
                position: "absolute",
                left: 0,
                bottom: -6,
                width: "100%",
                height: "4px",
                background: "linear-gradient(90deg, #1976d2, #6d28d9)",
                borderRadius: "8px",
              }}
            />
          </Typography>
        </motion.div>

        {/* Grid de Skills */}
        <Grid container spacing={4} justifyContent="center">
          {skills.map((skill, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.08 }}
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
        </Grid>
      </Container>
    </Box>
  );
}
