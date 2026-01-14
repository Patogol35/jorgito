import { Container, Typography, Box } from "@mui/material";
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
    { icon: <GitHub />, color: isDark ? "#fff" : "#181717", href: "https://github.com/Patogol35" },
    { icon: <LinkedIn />, color: isDark ? "#90caf9" : "#0A66C2", href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2" },
    { icon: <Facebook />, color: isDark ? "#90caf9" : "#1877F2", href: "https://www.facebook.com/share/1C9RgHAPvL/" },
    { icon: <Instagram />, color: isDark ? "#f48fb1" : "#E4405F", href: "https://www.instagram.com/jorge_patricio_26" },
  ];

  return (
    <Box id="contact" sx={{ py: 10, scrollMarginTop: "80px" }}>
      <Container maxWidth="md">

        {/* =========================
            TÍTULO (NO TOCAR)
        ========================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
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
            <Typography variant="h6" sx={{ fontWeight: 600, color: primaryColor }}>
              Redes Sociales
            </Typography>
          </Box>
        </motion.div>

        {/* =========================
            CONTENIDO REAL (NO BÁSICO)
        ========================= */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
            gap: 6,
            alignItems: "center",
          }}
        >
          {/* Texto / Identidad */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 1.5 }}
            >
              ¿Hablamos?
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                mb: 3,
              }}
            >
              Estoy abierto a oportunidades profesionales, proyectos freelance
              y colaboraciones técnicas. Puedes contactarme directamente o a
              través de mis redes.
            </Typography>

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                color: "text.secondary",
                fontSize: "0.85rem",
              }}
            >
              <AccessTime sx={{ fontSize: 16 }} />
              Respuesta en menos de 24 horas
            </Box>
          </motion.div>

          {/* Redes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center" }}
          >
            <SocialLinks
              socialLinks={socialLinks}
              size="48px"
              animated
              spacing={3}
            />

            {/* Email identidad */}
            <Typography
              component="a"
              href="mailto:patogol3535@gmail.com"
              sx={{
                display: "inline-block",
                mt: 3,
                fontWeight: 600,
                fontSize: "0.9rem",
                color: primaryColor,
                textDecoration: "none",
                borderBottom: `1px solid transparent`,
                transition: "all .25s ease",
                "&:hover": {
                  borderColor: primaryColor,
                },
              }}
            >
              patogol3535@gmail.com
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
              }
