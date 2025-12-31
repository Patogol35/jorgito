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
        pb: 4,
        color: theme.palette.text.primary,
        scrollMarginTop: "80px",
      }}
    >
      <Container maxWidth="sm">
        {/* Encabezado original con icono mejorado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "1.5rem" }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              px: 4,
              py: 1.2,
              borderRadius: "999px",
              background: isDark
                ? "rgba(144,202,249,0.1)"
                : "rgba(25,118,210,0.1)",
            }}
          >
            {/* ICONO MEJORADO (único cambio) */}
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isDark ? "#1e3a5f" : "#1976d2",
                mr: 1.2,
              }}
            >
              <GroupsIcon sx={{ fontSize: 20, color: "#fff" }} />
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: isDark ? "#bbdefb" : "#1976d2",
              }}
            >
              Redes Sociales
            </Typography>
          </Box>
        </motion.div>

        {/* Redes sociales */}
        <SocialLinks
          socialLinks={socialLinks}
          size="40px"
          animated={true}
          spacing={2}
        />
      </Container>
    </Box>
  );
}
