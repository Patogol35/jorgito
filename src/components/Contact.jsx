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
  const textPrimary = isDark ? "#ffffff" : "#111111";
  const textSecondary = isDark
    ? "rgba(255,255,255,0.75)"
    : "rgba(0,0,0,0.75)";

  const socialLinks = [
    {
      icon: <GitHub />,
      color: textPrimary,
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
        color: textPrimary,
      }}
    >
      <Container maxWidth="sm">
        {/* TÍTULO */}
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
              sx={{ fontWeight: "bold", color: primaryColor }}
            >
              Redes Sociales
            </Typography>
          </Box>
        </motion.div>

        {/* TEXTO */}
        <Typography
          sx={{
            textAlign: "center",
            mb: 2,
            fontSize: "16px",
            lineHeight: 1.8,
            color: textPrimary,
          }}
        >
          Puedes contactarme a través de mis redes profesionales o por correo
          electrónico.
        </Typography>

        {/* DISPONIBILIDAD */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            mb: 3,
            color: textSecondary,
          }}
        >
          <AccessTime sx={{ fontSize: 18 }} />
          <Typography sx={{ fontSize: "14px" }}>
            Respuesta habitual en menos de 24 horas
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* REDES */}
        <SocialLinks
          socialLinks={socialLinks}
          size="38px"
          animated={false}
          spacing={2}
        />

        <Divider sx={{ my: 3 }} />

        {/* EMAIL */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: "14px",
              mb: 0.7,
              color: textSecondary,
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
              color: textPrimary,
              fontWeight: 600,
              fontSize: "16px",
              textDecoration: "none",
              "&:hover": {
                color: primaryColor,
                textDecoration: "underline",
              },
            }}
          >
            <MailOutline sx={{ fontSize: 20 }} />
            patogol3535@gmail.com
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
