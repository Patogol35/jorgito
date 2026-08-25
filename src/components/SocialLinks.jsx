import { IconButton, Link, Box } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const MotionIconButton = motion(IconButton);

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
        return animated ? (
          <MotionIconButton
            key={i}
            component={Link}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{
              opacity: 0,
              y: 15,
              scale: 0.8,
              rotate: -8,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
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
              scale: 1.15,
              rotate: [0, -12, 12, -8, 0],
              transition: {
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
            whileTap={{
              scale: 0.9,
            }}
            sx={{
              backgroundColor: "transparent",

              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            {React.cloneElement(s.icon, {
              sx: {
                color: s.color,
                fontSize: size,
              },
            })}
          </MotionIconButton>
        ) : (
          <IconButton
            key={i}
            component={Link}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              backgroundColor: "transparent",

              "&:hover": {
                backgroundColor: "transparent",
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
      })}
    </Box>
  );
}
