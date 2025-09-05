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
        background: "linear-gradient(135deg, #42a5f5, #1976d2)",
        py: 10,
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: "16px",
              background: "rgba(255,255,255,0.9)",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" gutterBottom>
              📩 Contáctame
            </Typography>

            <Stack spacing={3} alignItems="center">
              {/* Redes sociales con íconos */}
              <Stack direction="row" spacing={2}>
                <IconButton
                  component={Link}
                  href="https://www.facebook.com/share/1C9RgHAPvL/"
                  target="_blank"
                  rel="noopener"
                  color="primary"
                >
                  <Facebook fontSize="large" />
                </IconButton>

                <IconButton
                  component={Link}
                  href="https://www.instagram.com/jorge_patricio_26"
                  target="_blank"
                  rel="noopener"
                  color="primary"
                >
                  <Instagram fontSize="large" />
                </IconButton>

                <IconButton
                  component={Link}
                  href="https://github.com/Patogol35"
                  target="_blank"
                  rel="noopener"
                  color="primary"
                >
                  <GitHub fontSize="large" />
                </IconButton>

                <IconButton
                  component={Link}
                  href="https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2"
                  target="_blank"
                  rel="noopener"
                  color="primary"
                >
                  <LinkedIn fontSize="large" />
                </IconButton>
              </Stack>

              {/* Correo */}
              <Typography variant="h6">
                📧{" "}
                <Link
                  href="mailto:patogol3535@gmail.com"
                  underline="hover"
                  color="inherit"
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
