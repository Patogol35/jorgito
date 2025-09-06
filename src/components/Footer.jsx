import { Box, Typography } from "@mui/material";
import SocialLinks from "./SocialLinks";
import { GitHub, LinkedIn, Instagram, MailOutline } from "@mui/icons-material";

export default function Footer() {
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
        background: "linear-gradient(135deg, #1976d2, #42a5f5)",
        color: "#fff",
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        © {new Date().getFullYear()} Jorge Patricio. Todos los derechos reservados.
      </Typography>

      <Typography variant="body2" sx={{ mb: 2, opacity: 0.85 }}>
        Transformando ideas en aplicaciones efectivas 🚀
      </Typography>

      <SocialLinks socialLinks={socialLinks} size="28px" animated={false} spacing={2} />
    </Box>
  );
}
