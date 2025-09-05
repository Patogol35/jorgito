
import { Typography } from "@mui/material";

export default function Footer() {
  return (
    <footer style={{ textAlign: "center", padding: "20px", background: "#f5f5f5" }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} Andres | Todos los derechos reservados
      </Typography>
    </footer>
  );
}
