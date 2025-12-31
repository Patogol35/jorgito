import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
} from "@mui/material";
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
    { icon: <LinkedIn />, color: "#0A66C2", href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2" },
    { icon: <Facebook />, color: "#1877F2", href: "https://www.facebook.com/share/1C9RgHAPvL/" },
    { icon: <Instagram />, color: "#E4405F", href: "https://www.instagram.com/jorge_patricio_26" },
    { icon: <MailOutline />, color: "#1976d2", href: "mailto:patogol3535@gmail.com" },
  ];

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 6, md: 8 },
        scrollMarginTop: "80px",
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: "center",
              background: isDark
                ? "rgba(30,30,30,0.7)"
                : "rgba(255,255,255,0.75)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
              }`,
            }}
          >
            {/* Badge */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                px: 3,
                py: 1,
                mb: 2,
                borderRadius: "999px",
                background: isDark
                  ? "rgba(144,202,249,0.12)"
                  : "rgba(25,118,210,0.12)",
              }}
            >
              <GroupsIcon
                sx={{
                  fontSize: 24,
                  mr: 1,
                  color: isDark ? "#90caf9" : "#1976d2",
                }}
              />
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color={isDark ? "#90caf9" : "#1976d2"}
              >
                Contacto
              </Typography>
            </Box>

            {/* Texto */}
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
            >
              Conéctate conmigo
            </Typography>

            <Typography
              variant="body2"
              sx={{ opacity: 0.8, mb: 3 }}
            >
              Puedes encontrarme en mis redes sociales o escribirme directamente.
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* Redes */}
            <SocialLinks
              socialLinks={socialLinks}
              size="42px"
              animated
              spacing={2.5}
            />
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
