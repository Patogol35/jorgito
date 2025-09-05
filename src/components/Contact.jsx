import {
  Container,
  Typography,
  Paper,
  Stack,
  Box,
  Link,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { GitHub, LinkedIn, Facebook, Instagram } from "@mui/icons-material";

export default function Contact() {
  const socialLinks = [
    { icon: <Facebook fontSize="large" />, color: "#1877F2", href: "https://www.facebook.com/share/1C9RgHAPvL/" },
    { icon: <Instagram fontSize="large" />, color: "#E4405F", href: "https://www.instagram.com/jorge_patricio_26" },
    { icon: <GitHub fontSize="large" />, color: "#fff", href: "https://github.com/Patogol35" },
    { icon: <LinkedIn fontSize="large" />, color: "#0A66C2", href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2" },
  ];

  return (
    <Box
      id="contact"
      sx={{
        background: "linear-gradient(135deg, #0d1117, #1c1f2a)",
        py: 10,
        color: "#fff",
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={10}
            sx={{
              p: 5,
              borderRadius: "20px",
              background: "rgba(25, 25, 35, 0.95)",
              textAlign: "center",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            {/* Título */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: "#ffeb3b",
                fontWeight: "bold",
                mb: 4,
              }}
            >
              📩 Contáctame
            </Typography>

            {/* Redes sociales */}
            <Stack direction="row" spacing={3} justifyContent="center" mb={4}>
              {socialLinks.map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    component={Link}
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    sx={{ color: s.color }}
                  >
                    {s.icon}
                  </IconButton>
                </motion.div>
              ))}
            </Stack>

            {/* Correo */}
            <Typography variant="h6" sx={{ mt: 2 }}>
              📧{" "}
              <Link
                href="mailto:patogol3535@gmail.com"
                underline="hover"
                color="#ffeb3b"
                sx={{ fontWeight: "bold" }}
              >
                patogol3535@gmail.com
              </Link>
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
