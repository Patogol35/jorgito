import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Facebook,
  Instagram,
  MailOutline,
  AccessTime,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import GroupsIcon from "@mui/icons-material/Groups";
import SocialLinks from "./SocialLinks";
import { useTheme } from "@mui/material/styles";

export default function Contact({ t }) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  // 🔥 aquí sí mantenemos mode (caso válido)
  const isDark = theme.palette.mode === "dark";

  const socialLinks = [
    {
      icon: <GitHub />,
      color: isDark ? "#ffffff" : "#181717",
      href: "https://github.com/Patogol35",
    },
    {
      icon: <LinkedIn />,
      color: isDark ? "#90caf9" : "#0A66C2",
      href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2",
    },
    {
      icon: <Facebook />,
      color: isDark ? "#90caf9" : "#1877F2",
      href: "https://www.facebook.com/share/1C9RgHAPvL/",
    },
    {
      icon: <Instagram />,
      color: isDark ? "#f48fb1" : "#E4405F",
      href: "https://www.instagram.com/jorge_patricio_26",
    },
    {
      icon: <MailOutline />,
      color: isDark ? "#fff" : "#1976d2",
      href: "mailto:patogol3535@gmail.com",
    },
  ];

  return (
    <Box
      id="contact"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: theme.palette.text.primary,
      }}
    >
      <Container maxWidth="sm">

        {/* =========================  
            HEADER  
        ========================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 3,
              py: 1,
              borderRadius: "999px",
              background: theme.palette.action.hover,
              border: `1px solid ${theme.palette.divider}`,
              backdropFilter: "blur(6px)",
            }}
          >
            <GroupsIcon sx={{ fontSize: 22, color: primary }} />

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: primary,
                lineHeight: 1,
              }}
            >
              {t.contact.title}
            </Typography>
          </Box>
        </motion.div>

        {/* =========================
            TEXTO INTRO
        ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Typography
  variant="subtitle1"
  sx={{
    textAlign: "center",
    fontWeight: "bold",
    mb: 4,
    color: theme.palette.text.primary, 
  }}
>
  {formText.subtitle}
</Typography>
        </motion.div>

        {/* =========================
            DISPONIBILIDAD
        ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mb: 3,
              color: theme.palette.text.secondary,
            }}
          >
            <AccessTime sx={{ fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {t.contact.availability}
            </Typography>
          </Box>
        </motion.div>

        <Divider sx={{ mb: 3 }} />

        {/* =========================
            REDES SOCIALES
        ========================= */}
        <SocialLinks
          socialLinks={socialLinks}
          size="48px"
          animated={true}
          spacing={2}
        />

      </Container>
    </Box>
  );
}
