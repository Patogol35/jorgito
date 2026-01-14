import { Container, Typography, Box } from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Facebook,
  Instagram,
  MailOutline,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import AccessTime from "@mui/icons-material/AccessTime";
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
        color: theme.palette.text.primary,
        scrollMarginTop: "80px",
      }}
    >
      <Container maxWidth="sm">

        {/* =========================
            TÍTULO CONTACTO (IGUAL A ABOUT)
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
              sx={{ fontWeight: "bold", color: primaryColor, lineHeight: 1 }}
            >
              Redes Sociales
            </Typography>
          </Box>
        </motion.div>


        {/* Disponibilidad con icono MUI */}
<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 0.8,
    mb: 2,
    color: "text.secondary",
  }}
>
  <AccessTime sx={{ fontSize: 18 }} />
  <Typography variant="body2" sx={{ fontSize: "0.95rem" }}>
    Respondo en menos de 24h
  </Typography>
</Box>

        {/* Redes sociales */}
        <SocialLinks
          socialLinks={socialLinks}
          size="40px"
          animated={true}
          spacing={2}
        />
        {/* Micro copy + Email con jerarquía */}
<Typography
  variant="body2"
  sx={{
    textAlign: "center",
    mt: 2,
    mb: 0.6,
    color: "text.secondary",
  }}
>
  ¿Prefieres escribir directamente?
</Typography>

<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  <Box sx={{ textAlign: "center" }}>
    <Typography
      variant="caption"
      sx={{
        display: "block",
        mb: 0.4,
        color: "text.secondary",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      Email de contacto
    </Typography>

    <Typography
      variant="body2"
      component="a"
      href="mailto:patogol3535@gmail.com"
      sx={{
        fontWeight: 600,
        color: primaryColor,
        textDecoration: "none",
        cursor: "pointer",
        transition: "opacity 0.25s ease",
        "&:hover": {
          opacity: 0.85,
        },
      }}
    >
      patogol3535@gmail.com
    </Typography>
  </Box>
</motion.div>
      </Container>
    </Box>
  );
}
