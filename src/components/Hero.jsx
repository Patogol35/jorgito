import { Container, Typography, Button, Box, Avatar, Stack } from "@mui/material";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1976d2, #42a5f5)",
        color: "#fff",
        py: 10,
        textAlign: "center",
      }}
    >
      <Container>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }}>
          <Avatar
            src="/assets/profile.png"
            alt="Jorge"
            sx={{
              width: 150,
              height: 150,
              mx: "auto",
              mb: 3,
              border: "4px solid white",
              boxShadow: 3,
            }}
          />
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            ¡Hola! Soy <span style={{ color: "#ffeb3b" }}>Jorge</span> 👋
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Desarrollador Web | Django | React | APIs
          </Typography>
        </motion.div>

        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Mail size={20} />}
            href="mailto:andres@email.com"
            sx={{ borderRadius: "50px", bgcolor: "#ffeb3b", color: "#000" }}
          >
            Contáctame
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Github size={20} />}
            href="https://github.com/tuusuario"
            target="_blank"
            sx={{ borderRadius: "50px", color: "#fff", borderColor: "#fff" }}
          >
            GitHub
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Linkedin size={20} />}
            href="https://linkedin.com/in/tuusuario"
            target="_blank"
            sx={{ borderRadius: "50px", color: "#fff", borderColor: "#fff" }}
          >
            LinkedIn
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
