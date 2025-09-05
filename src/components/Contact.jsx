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
import { Email, GitHub, LinkedIn, Facebook, Instagram } from "@mui/icons-material";

export default function Contact() {
  return (
    <Box
      id="contact"
      sx={{
        background: "linear-gradient(135deg, #0d1117, #1c1f2a)", // fondo oscuro premium
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
            <Typography variant="h4" gutterBottom sx={{ color: "#ffeb3b" }}>
              📩 Contáctame
            </Typography>

            <Stack spacing={4} alignItems="center">
              {/* Redes sociales con íconos */}
              <Stack direction="row" spacing={3}>
                <IconButton
                  component={Link}
                  href="https://www.facebook.com/share/1C9RgHAPvL/"
                  target="_blank"
                  rel="noopener"
                  sx={{ color: "#42a5f5" }}
                >
                  <Facebook fontSize="large" />
                </IconButton>

                <IconButton
                  component={Link}
                  href="https://www.instagram.com/jorge_patricio_26"
                  target="_blank"
                  rel="noopener"
                  sx={{ color: "#42a5f5" }}
                >
                  <Instagram fontSize="large" />
                </IconButton>

                <IconButton
                  component={Link}
                  href="https://github.com/Patogol35"
                  target="_blank"
                  rel="noopener"
                  sx={{ color: "#42a5f5" }}
                >
                  <GitHub fontSize="large" />
                </IconButton>

                <IconButton
                  component={Link}
                  href="https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2"
                  target="_blank"
                  rel="noopener"
                  sx={{ color: "#42a5f5" }}
                >
                  <LinkedIn fontSize="large" />
                </IconButton>
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
            </Stack>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
