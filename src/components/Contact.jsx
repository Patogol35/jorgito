import { Container, Typography, Box } from "@mui/material";
import { GitHub, LinkedIn, Facebook, Instagram, MailOutline } from "@mui/icons-material";
import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";
import React from "react";
import { useTheme } from "@mui/material/styles";

export default function Contact() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const socialLinks = [
    { icon: <GitHub />, color: isDark ? "#fff" : "#181717", href: "https://github.com/Patogol35" },
    { icon: <LinkedIn />, color: isDark ? "#90caf9" : "#0A66C2", href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2" },
    { icon: <Facebook />, color: isDark ? "#90caf9" : "#1877F2", href: "https://www.facebook.com/share/1C9RgHAPvL/" },
    { icon: <Instagram />, color: isDark ? "#f48fb1" : "#E4405F", href: "https://www.instagram.com/jorge_patricio_26" },
    { icon: <MailOutline />, color: isDark ? "#fff" : "#1976d2", href: "mailto:patogol3535@gmail.com" },
  ];

  return (
    <Box
      id="contact"
      sx={{
        pt: 6,
        pb: 4,
        color: theme.palette.text.primary,
        scrollMarginTop: "80px",
      }}
    >
      <Container maxWidth="sm">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "1.5rem" }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 700,
              color: isDark ? "#90caf9" : "#1976d2",
              position: "relative",
              mb: 4,
              display: "inline-block",
            }}
          >
            Mis Redes Sociales
            <Box
              component="span"
              sx={{
                position: "absolute",
                left: "50%",
                bottom: -6,
                transform: "translateX(-50%)",
                width: "60%",
                height: "3px",
                background: isDark ? "#90caf9" : "#1976d2",
                borderRadius: "6px",
              }}
            />
          </Typography>
        </motion.div>

        {/* Redes sociales */}
        <SocialLinks socialLinks={socialLinks} size="40px" animated={true} spacing={2} />
      </Container>
    </Box>
  );
}
