import { Container, Typography, Box } from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Facebook,
  Instagram,
  MailOutline,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import GroupsIcon from "@mui/icons-material/Groups";
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
        py: { xs: 6, md: 8 },
        textAlign: "center",
        scrollMarginTop: "80px",
      }}
    >
      <Container maxWidth="sm">

        {/* ===== TÍTULO PREMIUM ===== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: 1.4,
              px: 4.5,
              py: 1.4,
              mb: 1.5,
              borderRadius: "999px",
              backdropFilter: "blur(8px)",
              background: isDark
                ? "linear-gradient(135deg, rgba(144,202,249,0.18), rgba(144,202,249,0.06))"
                : "linear-gradient(135deg, rgba(25,118,210,0.18), rgba(25,118,210,0.06))",
              boxShadow: isDark
                ? "0 0 0 1px rgba(144,202,249,0.3)"
                : "0 0 0 1px rgba(25,118,210,0.3)",
            }}
          >
            {/* Punto de acento */}
            <Box
              sx={{
                position: "absolute",
                left: 10,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: isDark ? "#90caf9" : "#1976d2",
                boxShadow: isDark
                  ? "0 0 10px rgba(144,202,249,0.9)"
                  : "0 0 10px rgba(25,118,210,0.7)",
              }}
            />

            <GroupsIcon
              sx={{
                fontSize: 26,
                color: isDark ? "#bbdefb" : "#1976d2",
              }}
            />

            <Typography
              component="h2"
              sx={{
                fontWeight: 800,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                fontSize: { xs: "0.95rem", sm: "1.05rem" },
                color: isDark ? "#e3f2fd" : "#0d47a1",
              }}
            >
              Redes Sociales
            </Typography>
          </Box>
        </motion.div>

        {/* ===== SUBTÍTULO ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              opacity: 0.8,
              maxWidth: 420,
              mx: "auto",
            }}
          >
            Puedes encontrarme y contactarme a través de mis redes o por correo.
          </Typography>
        </motion.div>

        {/* ===== SEPARADOR ===== */}
        <Box
          sx={{
            width: 90,
            height: 3,
            mx: "auto",
            mb: 4,
            borderRadius: 2,
            background: isDark
              ? "linear-gradient(90deg, #90caf9, #bbdefb)"
              : "linear-gradient(90deg, #1976d2, #42a5f5)",
          }}
        />

        {/* ===== ICONOS ===== */}
        <SocialLinks
          socialLinks={socialLinks}
          size="42px"
          animated={true}
          spacing={2.5}
        />

      </Container>
    </Box>
  );
          }
