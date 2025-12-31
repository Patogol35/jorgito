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
        scrollMarginTop: "80px",
        textAlign: "center",
      }}
    >
      <Container maxWidth="sm">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.2,
              px: 4,
              py: 1.2,
              mb: 2,
              borderRadius: "999px",
              backdropFilter: "blur(6px)",
              background: isDark
                ? "rgba(144,202,249,0.12)"
                : "rgba(25,118,210,0.12)",
            }}
          >
            <GroupsIcon
              sx={{
                fontSize: 26,
                color: isDark ? "#bbdefb" : "#1976d2",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: 0.5,
                color: isDark ? "#bbdefb" : "#1976d2",
              }}
            >
              Redes Sociales
            </Typography>
          </Box>
        </motion.div>

        {/* Subtítulo */}
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
            Conéctate conmigo a través de mis redes o escríbeme directamente.
          </Typography>
        </motion.div>

        {/* Línea decorativa */}
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

        {/* Iconos sociales */}
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
