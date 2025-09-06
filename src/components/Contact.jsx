import { Container, Typography, Box } from "@mui/material";
import { GitHub, LinkedIn, Facebook, Instagram, MailOutline } from "@mui/icons-material";
import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";
import React from "react";

export default function Contact() {
  const socialLinks = [
    { icon: <GitHub />, color: "#181717", href: "https://github.com/Patogol35" },
    { icon: <LinkedIn />, color: "#0A66C2", href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2" },
    { icon: <Facebook />, color: "#1877F2", href: "https://www.facebook.com/share/1C9RgHAPvL/" },
    { icon: <Instagram />, color: "#E4405F", href: "https://www.instagram.com/jorge_patricio_26" },
    { icon: <MailOutline />, color: "#1976d2", href: "mailto:patogol3535@gmail.com" },
  ];

  return (
    <Box id="contact" sx={{ pt: 6, pb: 4, color: "#fff", scrollMarginTop: "80px" }}>
      <Container maxWidth="sm">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "1.5rem" }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 700,
              color: "#1976d2",
              position: "relative",
              display: "inline-block",
            }}
          >
            Mis Redes Sociales
            <Box
              component="span"
              sx={{
                position: "absolute",
                left: "50%",
                bottom: -6,
                transform: "translateX(-50%)",
                width: "60%",
                height: "3px",
                background: "#1976d2",
                borderRadius: "6px",
              }}
            />
          </Typography>
        </motion.div>

        {/* Redes sociales */}
        <SocialLinks socialLinks={socialLinks} size="40px" animated={true} spacing={3} />
      </Container>
    </Box>
  );
}
