import React from "react";
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
import { useTheme } from "@mui/material/styles";

/* =========================
   🎬 Animaciones tipo Hero
========================= */

const easeOutExpo = [0.16, 1, 0.3, 1];

const fadeCinematic = {
  hidden: {
    opacity: 0,
    y: 20,
    clipPath: "inset(0 0 100% 0)",
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Contact({ t }) {
  const theme = useTheme();
  const { palette } = theme;
  const isDark = palette.mode === "dark";

  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  const socialLinks = [
    {
      icon: <GitHub />,
      color: isDark ? "#ffffff" : "#181717",
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
        py: 0,
        scrollMarginTop: "80px",
        color: palette.text.primary,
      }}
    >
      <Container maxWidth="sm">

        {/* 🎬 CONTENEDOR PRINCIPAL */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >

          {/* =========================  
              TÍTULO  
          ========================= */}
          <motion.div variants={fadeCinematic}>
            <Box
              sx={{
                textAlign: "center",
                marginBottom: "2rem",
              }}
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
                  sx={{
                    fontWeight: "bold",
                    color: primaryColor,
                    lineHeight: 1,
                  }}
                >
                  {t.contact.title}
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* =========================
              TEXTO INTRO
          ========================= */}
          <motion.div variants={fadeCinematic}>
            <Typography
              variant="subtitle1"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                mb: 2,
              }}
            >
              {t.contact.subtitle}
            </Typography>
          </motion.div>

          {/* =========================
              DISPONIBILIDAD
          ========================= */}
          <motion.div variants={fadeCinematic}>
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
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {t.contact.availability}
              </Typography>
            </Box>
          </motion.div>

          <motion.div variants={fadeCinematic}>
            <Divider sx={{ mb: 3 }} />
          </motion.div>

          {/* Redes sociales */}
          <motion.div variants={fadeCinematic}>
            <SocialLinks
              socialLinks={socialLinks}
              size="48px"
              animated={true}
              spacing={2}
            />
          </motion.div>

        </motion.div>
      </Container>
    </Box>
  );
                  }
