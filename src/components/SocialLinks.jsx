import { IconButton, Link, Box } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

export default function SocialLinks({ socialLinks, size = "30px", animated = true, spacing = 2 }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",          // 🔹 permite que los iconos bajen a otra fila
        justifyContent: "center",  // 🔹 centrado horizontal
        gap: spacing,              // 🔹 espacio moderado entre iconos
        mt: 2,
      }}
    >
      {socialLinks.map((s, i) => {
        const iconButton = (
          <IconButton
  component={Link}
  href={s.href}
  target="_blank"
  rel="noopener"
  sx={{
    position: "relative",
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    transition: "all 0.3s ease",

    "&:hover": {
      background: "rgba(255,255,255,0.12)",
      transform: animated ? "translateY(-5px) scale(1.08)" : "translateY(-5px)",
      boxShadow: `0 8px 20px ${s.color}55`,
      border: `1px solid ${s.color}88`,
    },

    "&:active": {
      transform: "scale(0.94)",
    },

    "&::after": {
      content: '""',
      position: "absolute",
      inset: -3,
      borderRadius: "50%",
      border: `1px solid ${s.color}35`,
      opacity: 0,
      transform: "scale(0.8)",
      transition: "all 0.3s ease",
    },

    "&:hover::after": {
      opacity: 1,
      transform: "scale(1)",
    },
  }}
>
  {React.cloneElement(s.icon, {
    sx: {
      color: s.color,
      fontSize: size,
      transition: "all 0.3s ease",
    },
  })}
</IconButton>
        );

        return animated ? (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            whileHover={{ scale: 1.2, rotate: 8 }}
            whileTap={{ scale: 0.9 }}
          >
            {iconButton}
          </motion.div>
        ) : (
          <div key={i}>{iconButton}</div>
        );
      })}
    </Box>
  );
}
