import { Box, Typography, useTheme } from "@mui/material";
import SocialLinks from "./SocialLinks";
import { GitHub, LinkedIn, Instagram, MailOutline } from "@mui/icons-material";

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const socialLinks = [
    { icon: <GitHub />, color: isDark ? "#fff" : "#181717", href: "https://github.com/Patogol35" },
    { icon: <LinkedIn />, color: isDark ? "#90caf9" : "#0A66C2", href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2" },
    { icon: <Instagram />, color: isDark ? "#f48fb1" : "#E4405F", href: "https://www.instagram.com/jorge_patricio_26" },
    { icon: <MailOutline />, color: isDark ? "#fff" : "#1976d2", href: "mailto:patogol3535@gmail.com" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        textAlign: "center",
        background: isDark
          ? "#000" // negro sólido en modo oscuro
          : "linear-gradient(135deg, #1976d2, #42a5f5)", // gradiente original en modo claro
        color: "#fff", // mantenemos texto blanco como antes
        transition: "all 0.3s ease",
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        © {new Date().getFullYear()} Jorge Patricio. Todos los derechos reservados.
      </Typography>

      <Typography variant="body2" sx={{ mb: 2, opacity: 0.85 }}>
        Transformando ideas en aplicaciones efectivas 
      </Typography>

      <SocialLinks socialLinks={socialLinks} size="28px" animated={false} spacing={2} />
    </Box>
  );
}
