import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";
import {
  GitHub,
  LinkedIn,
  Instagram,
  MailOutline,
} from "@mui/icons-material";

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
        pt: 6,
        pb: 4,
        textAlign: "center",
        color: "#fff",
        background: isDark
          ? "linear-gradient(180deg, #020617 0%, #000000 100%)"
          : "linear-gradient(135deg, #1976d2, #42a5f5)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.04)"
          : "inset 0 1px 0 rgba(255,255,255,0.2)",
      }}
    >
      {/* Eslogan */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            mb: 2.5,
            fontWeight: 600,
            letterSpacing: "0.4px",
            color: "rgba(255,255,255,0.92)",
          }}
        >
          Transformando ideas en aplicaciones efectivas
        </Typography>
      </motion.div>

      {/* Redes sociales */}
      <SocialLinks
        socialLinks={socialLinks}
        size="30px"
        animated={true}
        spacing={2}
      />

      {/* Legal (un poco más claro) */}
      <Typography
        variant="caption"
        sx={{
          display: "block",
          mt: 3,
          color: "rgba(255,255,255,0.75)", // 👈 más claro y elegante
          letterSpacing: "0.3px",
        }}
      >
        © {new Date().getFullYear()} Jorge Patricio. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}
