import { Container, Typography, Box, Link, IconButton, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { GitHub, LinkedIn, Facebook, Instagram, MailOutline } from "@mui/icons-material";
import React from "react";

export default function Contact() {
  const socialLinks = [
    { icon: <Facebook fontSize="large" />, color: "#1877F2", href: "https://www.facebook.com/share/1C9RgHAPvL/" },
    { icon: <Instagram fontSize="large" />, color: "#E4405F", href: "https://www.instagram.com/jorge_patricio_26" },
    { icon: <GitHub fontSize="large" />, color: "#000", href: "https://github.com/Patogol35" },
    { icon: <LinkedIn fontSize="large" />, color: "#0A66C2", href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2" },
    { icon: <MailOutline fontSize="large" />, color: "#1976d2", href: "mailto:patogol3535@gmail.com" },
  ];

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 700, color: "#1976d2", mb: 3 }}
      >
        Contáctame
        <Box
          component="span"
          sx={{
            display: "block",
            width: "60px",
            height: "3px",
            background: "#1976d2",
            borderRadius: "6px",
            mx: "auto",
            mt: 1,
          }}
        />
      </Typography>

      <Stack direction="row" spacing={3} justifyContent="center">
        {socialLinks.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            whileHover={{ scale: 1.2, rotate: 8 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconButton component={Link} href={s.href} target="_blank" rel="noopener">
              {React.cloneElement(s.icon, { sx: { color: s.color } })}
            </IconButton>
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
}
