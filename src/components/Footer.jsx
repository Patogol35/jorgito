import { Box, Typography, useTheme } from "@mui/material";
import SocialLinks from "./SocialLinks";
import { GitHub, LinkedIn, Instagram, MailOutline } from "@mui/icons-material";

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const socialLinks = [
    { icon: <GitHub />, color: "#fff", href: "https://github.com/Patogol35" },
    { icon: <LinkedIn />, color: "#fff", href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2" },
    { icon: <Instagram />, color: "#fff", href: "https://www.instagram.com/jorge_patricio_26" },
    { icon: <MailOutline />, color: "#fff", href: "mailto:patogol3535@gmail.com" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        textAlign: "center",
        background: isDark ? "#000" : "linear-gradient(135deg, #1976d2, #42a5f5)",
        color: "#fff",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Eslogan destacado */}
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          opacity: 1,
          color: "#fff",
          fontWeight: 500,
        }}
      >
        Transformando ideas en aplicaciones efectivas
      </Typography>

      {/* Íconos sociales */}
      <SocialLinks socialLinks={socialLinks} size="28px" animated={false} spacing={2} />

      {/* Texto legal más discreto (ahora al final) */}
      <Typography
        variant="body2"
        sx={{
          mt: 2, // margen arriba para separar de los iconos
          opacity: isDark ? 0.7 : 0.85,
          color: "#fff",
        }}
      >
        © {new Date().getFullYear()} Jorge Patricio. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}
