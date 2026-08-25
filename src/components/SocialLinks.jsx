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
            rel="noopener"
            sx={{
              position: "relative",
              transition: "all 0.3s ease",

              // Glow
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 3,
                borderRadius: "50%",
                background: s.color,
                opacity: 0,
                filter: "blur(12px)",
                transition: "opacity 0.3s ease",
                zIndex: 0,
              },

              "&:hover::before": {
                opacity: 0.4,
              },

              "&:hover": {
                backgroundColor: "transparent",
              },

              "& svg": {
                position: "relative",
                zIndex: 1,
                transition: "filter 0.3s ease",
              },
            }}
          >
            {React.cloneElement(s.icon, {
              sx: {
                color: s.color,
                fontSize: size,
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
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 12,
              delay: i * 0.12,
            }}
            whileHover={{
              y: -6,
              scale: 1.15,
              rotate: [0, -5, 5, 0],
              transition: {
                duration: 0.35,
              },
            }}
            whileTap={{
              scale: 0.9,
            }}
            style={{
              borderRadius: "50%",
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
