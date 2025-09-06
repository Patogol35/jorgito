import { IconButton, Link, Stack } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

export default function SocialLinks({ socialLinks, size = "30px", animated = true, spacing = 2 }) {
  return (
    <Stack direction="row" spacing={spacing} justifyContent="center">
      {socialLinks.map((s, i) => {
        const iconButton = (
          <IconButton
            component={Link}
            href={s.href}
            target="_blank"
            rel="noopener"
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
                transform: animated ? "scale(1.2)" : "none",
              },
            }}
          >
            {React.cloneElement(s.icon, { sx: { color: s.color, fontSize: size } })}
          </IconButton>
        );

        if (animated) {
          return (
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
          );
        } else {
          return <div key={i}>{iconButton}</div>;
        }
      })}
    </Stack>
  );
}
