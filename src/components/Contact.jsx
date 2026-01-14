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
    { icon: <GitHub />, color: isDark ? "#fff" : "#181717", href: "https://github.com/Patogol35" },
    { icon: <LinkedIn />, color: isDark ? "#90caf9" : "#0A66C2", href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2" },
    { icon: <Facebook />, color: isDark ? "#90caf9" : "#1877F2", href: "https://www.facebook.com/share/1C9RgHAPvL/" },
    { icon: <Instagram />, color: isDark ? "#f48fb1" : "#E4405F", href: "https://www.instagram.com/jorge_patricio_26" },
    { icon: <MailOutline />, color: primaryColor, href: "mailto:patogol3535@gmail.com" },
  ];

  return (
    <Box id="contact" sx={{ py: 7, scrollMarginTop: "80px" }}>
      <Container maxWidth="sm">

        {/* =========================
            TÍTULO (NO TOCAR)
        ========================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "2.5rem" }}
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
            CONTENIDO PREMIUM
        ========================= */}
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            py: 3.5,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          {/* Estado */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
              px: 2,
              py: 0.6,
              borderRadius: "999px",
              fontSize: "0.8rem",
              color: "text.secondary",
              background: isDark
                ? "rgba(255,255,255,0.04)"
                : "rgba(0,0,0,0.04)",
            }}
          >
            <AccessTime sx={{ fontSize: 16 }} />
            <Typography variant="body2">
              Disponible para proyectos · Respuesta &lt; 24h
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Redes */}
          <SocialLinks
            socialLinks={socialLinks}
            size="44px"
            animated
            spacing={3}
          />

          {/* CTA Email */}
          <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
            <Box
              component="a"
              href="mailto:patogol3535@gmail.com"
              sx={{
                mt: 4,
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 3,
                py: 1,
                borderRadius: "999px",
                border: `1px solid ${primaryColor}`,
                color: primaryColor,
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "all 0.25s ease",
                "&:hover": {
                  background: primaryColor,
                  color: "#fff",
                },
              }}
            >
              <MailOutline sx={{ fontSize: 18 }} />
              Contactar por email
            </Box>
          </motion.div>
        </Box>

        {/* Footer */}
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            mt: 3,
            color: "text.secondary",
            fontSize: "0.8rem",
          }}
        >
          Abierto a oportunidades, colaboraciones y proyectos freelance
        </Typography>
      </Container>
    </Box>
  );
}
