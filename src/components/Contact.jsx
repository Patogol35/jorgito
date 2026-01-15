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

export default function Contact() {
  const theme = useTheme();
  const { palette } = theme;
  const isDark = palette.mode === "dark";

  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

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
    { icon: <MailOutline />, color: isDark ? "#fff" : "#1976d2", href: "mailto:patogol3535@gmail.com" },
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
        TÍTULO CONTACTO  
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
      justifyContent: "center",
      gap: 1,
      px: 3,
      py: 0.9,
      borderRadius: "999px",
      background: isDark
        ? "rgba(144,202,249,0.06)"
        : "rgba(25,118,210,0.06)",
      border: `1px solid ${
        isDark
          ? "rgba(144,202,249,0.25)"
          : "rgba(25,118,210,0.25)"
      }`,
      backdropFilter: "blur(6px)",
    }}
  >
    {/* Icono SIN fondo */}
    <GroupsIcon sx={{ fontSize: 22, color: primaryColor }} />

    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        color: primaryColor,
        lineHeight: 1,
      }}
    >
      Redes Sociales
    </Typography>
  </Box>
</motion.div>

        {/* =========================
            TEXTO INTRO (subtitle1)
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
              mb: 2,
            }}
          >
            Puedes contactarme a través de mis redes profesionales o por correo
            electrónico.
          </Typography>
        </motion.div>

        {/* =========================
            DISPONIBILIDAD (body2)
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

        {/* Redes sociales */}
        <SocialLinks socialLinks={socialLinks} size="48px" animated={true} spacing={2} />

        <Divider sx={{ my: 3 }} />

        {/* =========================
            EMAIL (subtitle1)
        ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="body2"
              sx={{
                color: palette.text.secondary,
                fontWeight: "bold",
                mb: 0.5,
              }}
            >
              Correo electrónico
            </Typography>

            <Typography
              component="a"
              href="mailto:patogol3535@gmail.com"
              variant="subtitle1"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                color: isDark ? "#ffffff" : "#1976d2",
                fontWeight: "bold",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <MailOutline />
              patogol3535@gmail.com
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
