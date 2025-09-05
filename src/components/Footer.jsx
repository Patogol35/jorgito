import { Box, Typography, IconButton, Stack, Link } from "@mui/material";
import { GitHub, LinkedIn, Instagram } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      sx={{
        py: 5,
        textAlign: "center",
        background: "linear-gradient(135deg, #1976d2, #42a5f5)",
        color: "#fff",
      }}
    >
      <Typography variant="body1" sx={{ mb: 2 }}>
        © {new Date().getFullYear()} Jorge Dev. Todos los derechos reservados.
      </Typography>

      {/* Redes sociales */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        <IconButton
          component={Link}
          href="https://github.com/Patogol35"
          target="_blank"
          rel="noopener"
          sx={{ color: "#fff" }}
        >
          <GitHub />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2"
          target="_blank"
          rel="noopener"
          sx={{ color: "#fff" }}
        >
          <LinkedIn />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.instagram.com/jorge_patricio_26"
          target="_blank"
          rel="noopener"
          sx={{ color: "#fff" }}
        >
          <Instagram />
        </IconButton>
      </Stack>

      <Typography variant="body2" sx={{ opacity: 0.8 }}>
        Hecho con ❤️ y código limpio
      </Typography>
    </Box>
  );
        }
