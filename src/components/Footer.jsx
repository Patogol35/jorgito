import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ py: 3, textAlign: "center", bgcolor: "#1976d2", color: "#fff" }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} Jorge Dev. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}
