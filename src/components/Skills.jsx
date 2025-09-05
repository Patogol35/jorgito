// components/Skills.jsx
import { Container, Typography, Paper, Stack, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function Skills() {
  const techItems = [
    "💻 React | Spring Boot | Python",
    "🗄️ MySQL | PostgreSQL | Elasticsearch",
    "🛠️ Postman | AWS | Microsoft Office | Máquinas Virtuales",
    "🚀 Despliegue: Vercel | Render",
  ];

  return (
    <Box
      id="skills"
      sx={{
        background: "linear-gradient(135deg, #0d1117, #1c1f2a)",
        py: 10,
        color: "#fff",
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 5,
              borderRadius: "20px",
              background: "rgba(25, 25, 35, 0.95)",
              textAlign: "center",
            }}
          >
            {/* Título */}
            <Typography variant="h4" gutterBottom sx={{ color: "#ffeb3b" }}>
              🧰 Tecnologías & Herramientas
            </Typography>

            <Stack spacing={3} alignItems="center" sx={{ mt: 3 }}>
              {techItems.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, color: "#42a5f5" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: "#ffeb3b", fontWeight: "bold", cursor: "pointer" }}
                  >
                    {item}
                  </Typography>
                </motion.div>
              ))}
            </Stack>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
