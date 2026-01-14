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
import React from "react";
import { useTheme } from "@mui/material/styles";

export default function Contact() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  const socialLinks = [
    {
      icon: <GitHub />,
      color: isDark ? "#fff" : "#181717",
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
  ];

  return (
    <Box
      id="contact"
      sx={{
        py: 4, // 🔹 MISMO padding que el código anterior
        scrollMarginTop: "80px",
      }}
    >
      <Container maxWidth="sm">

        {/* =========================
            TÍTULO (SIN CAMBIOS VISUALES)
        ========================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: 0 }} // ❗ no suma espacio
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
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
            }}
          >
            <GroupsIcon sx={{ fontSize: 22, color: primaryColor }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: primaryColor }}
            >
              Redes Sociales
            </Typography>
          </Box>
        </motion.div>

        {/* 🔹 MISMA DISTANCIA QUE ANTES */}
        <Box sx={{ mt: 4 }} />

        {/* =========================
            TEXTO INTRODUCTORIO
        ========================= */}
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 2,
            lineHeight: 1.7,
          }}
        >
          Puedes contactarme a través de mis redes profesionales o por correo
          electrónico.
        </Typography>

        {/* Disponibilidad */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            mb: 3,
            color: "text.secondary",
          }}
        >
          <AccessTime sx={{ fontSize: 16 }} />
          <Typography variant="caption">
            Respuesta habitual en menos de 24 horas
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Redes */}
        <SocialLinks
          socialLinks={socialLinks}
          size="38px"
          animated={false}
          spacing={2}
        />

        <Divider sx={{ my: 3 }} />

        {/* Email */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", display: "block", mb: 0.5 }}
          >
            Correo electrónico
          </Typography>

          <Box
            component="a"
            href="mailto:patogol3535@gmail.com"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              color: primaryColor,
              fontWeight: 500,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <MailOutline sx={{ fontSize: 18 }} />
            patogol3535@gmail.com
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
