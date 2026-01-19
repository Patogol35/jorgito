import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material";
import {
  GitHub,
  LinkedIn,
  FacebookRounded,
  Instagram,
  MailOutline,
  AccessTime,
  GroupsRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";
import { useTheme } from "@mui/material/styles";

export default function Contact() {
  const theme = useTheme();
  const { palette } = theme;
  const isDark = palette.mode === "dark";

  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  /** Estilo base profesional para iconos */
  const iconBaseStyle = {
    fontSize: 24,
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
    transition: "all 0.35s ease",
  };

  const socialLinks = [
    {
      icon: <GitHub sx={iconBaseStyle} />,
      color: isDark ? "#ffffff" : "#1f1f1f",
      href: "https://github.com/Patogol35",
    },
    {
      icon: <LinkedIn sx={iconBaseStyle} />,
      color: isDark ? "#90caf9" : "#0A66C2",
      href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2",
    },
    {
      icon: <FacebookRounded sx={iconBaseStyle} />,
      color: isDark ? "#90caf9" : "#1877F2",
      href: "https://www.facebook.com/share/1C9RgHAPvL/",
    },
    {
      icon: <Instagram sx={iconBaseStyle} />,
      color: isDark ? "#f48fb1" : "#E4405F",
      href: "https://www.instagram.com/jorge_patricio_26",
    },
    {
      icon: <MailOutline sx={iconBaseStyle} />,
      color: isDark ? "#ffffff" : "#1976d2",
      href: "mailto:patogol3535@gmail.com",
    },
  ];

  return (
    <Box
      id="contact"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: palette.text.primary,
      }}
    >
      <Container maxWidth="sm">
        {/* =========================  
            TÍTULO  
        ========================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.2,
              px: 3,
              py: 1,
              borderRadius: "999px",
              background: isDark
                ? "rgba(144,202,249,0.08)"
                : "rgba(25,118,210,0.08)",
              border: `1px solid ${
                isDark
                  ? "rgba(144,202,249,0.3)"
                  : "rgba(25,118,210,0.3)"
              }`,
              backdropFilter: "blur(8px)",
            }}
          >
            <GroupsRounded sx={{ fontSize: 22, color: primaryColor }} />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: primaryColor,
                letterSpacing: 0.3,
              }}
            >
              Redes Sociales
            </Typography>
          </Box>
        </motion.div>

        {/* =========================
            TEXTO
        ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: "center",
              fontWeight: 600,
              mb: 2,
            }}
          >
            Puedes contactarme a través de mis redes profesionales o por correo
            electrónico.
          </Typography>
        </motion.div>

        {/* =========================
            DISPONIBILIDAD
        ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
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
              color: palette.text.secondary,
            }}
          >
            <AccessTime sx={{ fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Respuesta habitual en menos de 24 horas
            </Typography>
          </Box>
        </motion.div>

        <Divider sx={{ mb: 3 }} />

        {/* =========================
            ICONOS SOCIALES
        ========================= */}
        <SocialLinks
          socialLinks={socialLinks}
          size="52px"
          animated={true}
          spacing={2.5}
        />
      </Container>
    </Box>
  );
}
