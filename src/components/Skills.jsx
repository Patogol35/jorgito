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
        background: "linear-gradient(135deg, #f5f5f5, #e8f0ff)", // Fondo suave
        py: 10,
        color: "#333",
      }}
    >
      <Container>
        {/* Título animado */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2", mb: 5 }}
          >
            🧰 Tecnologías & Herramientas
          </Typography>

          {/* Grid de tecnologías */}
          <Grid container spacing={4} justifyContent="center">
            {skills.map((skill, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Paper
                    elevation={6}
                    sx={{
                      p: 3,
                      textAlign: "center",
                      borderRadius: "16px",
                      background: "#fff",
                      cursor: "pointer",
                      "&:hover": { background: "#e3f2fd" },
                    }}
                  >
                    <Box
                      component="img"
                      src={skill.img}
                      alt={skill.name}
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: "contain",
                        mb: 2,
                      }}
                    />
                    <Typography variant="subtitle1" fontWeight="bold">
                      {skill.name}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
                  }
