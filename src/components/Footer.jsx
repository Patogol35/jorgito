import { Box, Typography, useTheme } from "@mui/material";
import SocialLinks from "./SocialLinks";
import { GitHub, LinkedIn, Instagram, MailOutline } from "@mui/icons-material";

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const socialLinks = [
    {
      icon: <GitHub />,
      color: isDark ? "#bbdefb" : "#ffffff",
      href: "https://github.com/Patogol35",
    },
    {
      icon: <LinkedIn />,
      color: isDark ? "#90caf9" : "#ffffff",
      href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2",
    },
    {
      icon: <Instagram />,
      color: isDark ? "#f48fb1" : "#ffffff",
      href: "https://www.instagram.com/jorge_patricio_26",
    },
    {
      icon: <MailOutline />,
      color: isDark ? "#bbdefb" : "#ffffff",
      href: "mailto:patogol3535@gmail.com",
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: "center",
        background: isDark
          ? "linear-gradient(180deg, #020617, #000000)"
          : "linear-gradient(135deg, #1976d2, #42a5f5)",
        color: "#fff",
        width: "100%",
      }}
    >
      {/* Eslogan */}
      <Typography
        variant="subtitle2"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: "rgba(255,255,255,0.9)",
          letterSpacing: "0.3px",
        }}
      >
        Transformando ideas en aplicaciones efectivas
      </Typography>

      {/* Íconos sociales */}
      <SocialLinks
        socialLinks={socialLinks}
        size="30px"
        animated={true}
        spacing={2}
      />

      {/* Legal */}
      <Typography
        variant="caption"
        sx={{
          display: "block",
          mt: 3,
          color: "rgba(255,255,255,0.65)",
        }}
      >
        © {new Date().getFullYear()} Jorge Patricio. Todos los derechos reservados.
      </Typography>
    </Box>
  );
          }
