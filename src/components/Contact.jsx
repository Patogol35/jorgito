import {
  Container,
  Typography,
  Paper,
  Stack,
  Box,
  Link,
  IconButton,
  Button,
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
        background: "linear-gradient(135deg, #eef2ff, #f0f9ff)",
        py: 12,
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
            elevation={6}
            sx={{
              p: 6,
              borderRadius: "20px",
              backdropFilter: "blur(12px)",
              background: "rgba(255,255,255,0.9)",
              textAlign: "center",
              boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
            }}
          >
            {/* Título */}
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: "bold",
                mb: 5,
                background: "linear-gradient(90deg, #1976d2, #6d28d9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                position: "relative",
                display: "inline-block",
              }}
            >
              Contáctame
              <Box
                component="span"
                sx={{
                  position: "absolute",
                  left: 0,
                  bottom: -8,
                  width: "100%",
                  height: "4px",
                  background: "linear-gradient(90deg, #1976d2, #6d28d9)",
                  borderRadius: "8px",
                }}
              />
            </Typography>

            {/* Redes sociales */}
            <Stack
              direction="row"
              spacing={3}
              justifyContent="center"
              alignItems="center"
              mb={4}
            >
              {socialLinks.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  whileHover={{ scale: 1.2, rotate: 8 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    component={Link}
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    sx={{
                      color: "white",
                      backgroundColor: s.color,
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      boxShadow: `0 6px 16px ${s.color}55`,
                      "&:hover": {
                        boxShadow: `0 8px 24px ${s.color}aa`,
                      },
                    }}
                  >
                    {s.icon}
                  </IconButton>
                </motion.div>
              ))}
            </Stack>

            {/* Correo */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="contained"
                href="mailto:patogol3535@gmail.com"
                sx={{
                  fontWeight: "bold",
                  px: 4,
                  py: 1.5,
                  borderRadius: "12px",
                  background: "linear-gradient(90deg, #1976d2, #6d28d9)",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #1565c0, #5b21b6)",
                  },
                }}
              >
                📧 patogol3535@gmail.com
              </Button>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
