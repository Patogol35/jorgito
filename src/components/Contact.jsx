import { Container, Typography, Box, Divider, Paper } from "@mui/material";
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
    <Box id="contact" sx={{ py: 6, scrollMarginTop: "80px" }}>
      <Container maxWidth="sm">

        {/* =========================
            TÍTULO (NO TOCADO)
        ========================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
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
              sx={{ fontWeight: 600, color: primaryColor }}
            >
              Redes Sociales
            </Typography>
          </Box>
        </motion.div>

        {/* =========================
            CONTENIDO PROFESIONAL
        ========================= */}
        <Paper
          elevation={isDark ? 0 : 2}
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: isDark
              ? "rgba(255,255,255,0.03)"
              : "background.paper",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "none",
          }}
        >
          {/* Disponibilidad */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mb: 2,
              color: "text.secondary",
            }}
          >
            <AccessTime sx={{ fontSize: 18 }} />
            <Typography variant="body2">
              Disponible · Respuesta en menos de 24h
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Redes */}
          <SocialLinks
            socialLinks={socialLinks}
            size="42px"
            animated
            spacing={2.2}
          />

          {/* Email destacado */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          >
            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component="a"
                href="mailto:patogol3535@gmail.com"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2.5,
                  py: 1.2,
                  borderRadius: 2,
                  textDecoration: "none",
                  fontWeight: 600,
                  color: primaryColor,
                  border: `1px solid ${primaryColor}`,
                  transition: "all .25s ease",
                  "&:hover": {
                    backgroundColor: primaryColor,
                    color: "#fff",
                  },
                }}
              >
                <MailOutline sx={{ fontSize: 20 }} />
                patogol3535@gmail.com
              </Box>
            </Box>
          </motion.div>

          {/* Texto final */}
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              mt: 2,
              color: "text.secondary",
            }}
          >
            Puedes contactarme por cualquiera de estos medios
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
            }
