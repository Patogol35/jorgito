import { Container, Typography, Box, useTheme } from "@mui/material";
import { GitHub, LinkedIn, Facebook, Instagram, MailOutline } from "@mui/icons-material";
import { motion } from "framer-motion";
import GroupsIcon from "@mui/icons-material/Groups";
import SocialLinks from "./SocialLinks";
import React from "react";

export default function Contact() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const socialLinks = [
    { icon: <GitHub />, color: isDark ? "#fff" : "#181717", href: "https://github.com/Patogol35" },
    { icon: <LinkedIn />, color: isDark ? "#90caf9" : "#0A66C2", href: "https://www.linkedin.com/in/jorge-patricio-santamaria-cherrez-2a73792b2" },
    { icon: <Facebook />, color: isDark ? "#90caf9" : "#1877F2", href: "https://www.facebook.com/share/1C9RgHAPvL/" },
    { icon: <Instagram />, color: isDark ? "#f48fb1" : "#E4405F", href: "https://www.instagram.com/jorge_patricio_26" },
    { icon: <MailOutline />, color: isDark ? "#fff" : "#1976d2", href: "mailto:patogol3535@gmail.com" },
  ];

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 6, md: 8 },
        color: theme.palette.text.primary,
        scrollMarginTop: "80px",
      }}
    >
      <Container maxWidth="sm">
        {/* Badge profesional con sombra sutil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              px: 3,
              py: 0.8,
              borderRadius: "50px",
              background: isDark
                ? "linear-gradient(135deg, rgba(30,30,40,0.8) 0%, rgba(20,20,30,0.9) 100%)"
                : "linear-gradient(135deg, rgba(240,245,255,0.9) 0%, rgba(230,240,255,0.9) 100%)",
              boxShadow: isDark
                ? "0 4px 12px rgba(0,0,0,0.3)"
                : "0 4px 12px rgba(0,0,0,0.08)",
              backdropFilter: "blur(4px)",
              border: isDark ? "1px solid rgba(144,202,249,0.2)" : "1px solid rgba(25,118,210,0.2)",
            }}
          >
            <GroupsIcon
              sx={{
                fontSize: 22,
                mr: 1,
                color: isDark ? "#90caf9" : "#1976d2",
              }}
            />
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{
                color: isDark ? "#bbdefb" : "#1976d2",
                letterSpacing: "0.5px",
              }}
            >
              CONECTA CONMIGO
            </Typography>
          </Box>
        </motion.div>

        {/* Redes sociales con mejor espaciado */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SocialLinks
            socialLinks={socialLinks}
            size="48px"
            animated={true}
            spacing={2.5}
          />
        </motion.div>

        {/* Mensaje opcional de cierre (puedes omitir si no lo deseas) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: "1.5rem" }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ maxWidth: "360px", mx: "auto", lineHeight: 1.6 }}
          >
            ¿Listo para colaborar en un proyecto innovador? ¡No dudes en escribirme!
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}
