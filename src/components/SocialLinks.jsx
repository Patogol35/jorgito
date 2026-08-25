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
            sx={{
              backgroundColor: "transparent",
              transition: "color 0.3s ease",

              "&:hover": {
                backgroundColor: "transparent",
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
              damping: 14,
              delay: i * 0.12,
            }}
            whileHover={{
              y: -4,
              scale: 1.12,
              rotate: 6,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 10,
              },
            }}
            whileTap={{
              scale: 0.92,
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
