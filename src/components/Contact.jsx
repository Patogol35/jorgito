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
    {
      icon: <Facebook fontSize="large" />,
      color: "#1877F2",
      href: "https://www.facebook.com/share/1C9RgHAPvL/",
    },
    {
      icon: <Instagram fontSize="large" />,
      color: "#E4405F",
      href: "https://www.instagram.com/jorge_patricio_26",
    },
    {
      icon: <GitHub fontSize="large" />,
      color: "#000",
      href: "https://github.com/Patogol35",
    },
    {
      icon: <LinkedIn fontSize="large" />,
      color: "#0A66C2",
      href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2",
    },
  ];

  return (
    <Box
      id="contact"
      sx={{
        background: "#f5f5f5", // Fondo claro
        py: 10,
        color: "#333",
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 5,
              borderRadius: "16px",
              background: "#fff",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            }}
          >
            {/* Título */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#1976d2",
                mb: 3,
              }}
            >
              📩 Contáctame
            </Typography>

            {/* Redes sociales */}
            <Stack
              direction="row"
              spacing={3}
              justifyContent="center"
              alignItems="center"
              mb={3}
            >
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
            <Typography variant="h6">
              📧{" "}
              <Link
                href="mailto:patogol3535@gmail.com"
                underline="hover"
                color="#1976d2"
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
