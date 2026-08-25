import { IconButton, Link, Box } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

export default function SocialLinks({
  socialLinks,
  size = "30px",
  animated = true,
  spacing = 2,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: spacing,
        mt: 2,
      }}
    >
      {socialLinks.map((s, i) => {
        const iconButton = (
          <IconButton
            component={Link}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir ${s.href}`}
            sx={{
              color: s.color,
              transition: "all 0.25s ease",

              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            {React.cloneElement(s.icon, {
              sx: {
                color: s.color,
                fontSize: size,
                transition: "filter 0.25s ease",
              },
            })}
          </IconButton>
        );

        return animated ? (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: 15,
              scale: 0.7,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.45,
              delay: i * 0.1,
              ease: "easeOut",
            }}
            
            whileHover={{
  y: -3,
  scale: 1.08,
  rotate: 3,
  filter: `drop-shadow(0 0 3px ${s.color}55)`,
}}
            whileTap={{
              scale: 0.85,
              rotate: -5,
            }}
            style={{
              display: "flex",
            }}
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
