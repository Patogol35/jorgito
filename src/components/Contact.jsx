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
  const { palette } = useTheme();
  const isDark = palette.mode === "dark";

  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  const socialLinks = [
    {
      icon: <GitHub />,
      color: palette.text.primary,
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
            <GroupsIcon sx={{ fontSize: 22, color: primaryColor }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: primaryColor, lineHeight: 1 }}
            >
              Redes Sociales
            </Typography>
          </Box>
        </motion.div>

        {/* =========================
            TEXTO INTRODUCTORIO
        ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Typography
            sx={{
              textAlign: "center",
              mb: 2,
              lineHeight: 1.8,
              fontSize: "16px",
              color: palette.text.primary,
            }}
          >
            Puedes contactarme a través de mis redes profesionales o por correo
            electrónico.
          </Typography>
        </motion.div>

        {/* Disponibilidad */}
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
            <Typography sx={{ fontSize: "14px" }}>
              Respuesta habitual en menos de 24 horas
            </Typography>
          </Box>
        </motion.div>

        <Divider sx={{ mb: 3 }} />

        {/* Redes */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <SocialLinks
            socialLinks={socialLinks}
            size="38px"
            animated={false}
            spacing={2}
          />
        </motion.div>

        <Divider sx={{ my: 3 }} />

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                display: "block",
                mb: 0.7,
                fontSize: "14px",
                color: palette.text.secondary,
              }}
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
                color: palette.text.primary,
                fontWeight: 600,
                fontSize: "16px",
                textDecoration: "none",
                transition: "color 0.2s ease",
                "&:hover": {
                  textDecoration: "underline",
                  color: primaryColor,
                },
              }}
            >
              <MailOutline sx={{ fontSize: 20 }} />
              patogol3535@gmail.com
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
