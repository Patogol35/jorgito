import React from "react";
import {
  Container,
  Typography,
  Box,
} from "@mui/material";

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
import { useTheme } from "@mui/material/styles";

import SocialLinks from "./SocialLinks";

import {
  fadeCinematic,
  container,
  contactStyles,
} from "../Styles/contactStyles";

export default function Contact({ t }) {
  const { palette } = useTheme();

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
      sx={contactStyles.section(palette)}
    >
      <Container maxWidth="sm">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Título */}
          <motion.div variants={fadeCinematic}>
            <Box sx={contactStyles.titleContainer}>
              <Box
                sx={contactStyles.titleBadge(isDark)}
              >
                <GroupsIcon
                  sx={{
                    fontSize: 22,
                    color: primaryColor,
                  }}
                />

                <Typography
                  variant="h6"
                  sx={contactStyles.title(primaryColor)}
                >
                  {t.contact.title}
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Texto introductorio */}
          <motion.div variants={fadeCinematic}>
            <Typography
              variant="subtitle1"
              sx={contactStyles.subtitle}
            >
              {t.contact.subtitle}
            </Typography>
          </motion.div>

          {/* Disponibilidad */}
          <motion.div variants={fadeCinematic}>
            <Box sx={contactStyles.availability}>
              <AccessTime sx={{ fontSize: 18 }} />

              <Typography
                variant="body2"
                sx={contactStyles.availabilityText}
              >
                {t.contact.availability}
              </Typography>
            </Box>
          </motion.div>

          {/* Divisor */}
          <motion.div variants={fadeCinematic}>
            <Box
              sx={contactStyles.divider(isDark)}
            />
          </motion.div>

          {/* Redes sociales */}
          <motion.div variants={fadeCinematic}>
            <SocialLinks
              socialLinks={socialLinks}
              size="40px"
              spacing={2}
            />
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}
