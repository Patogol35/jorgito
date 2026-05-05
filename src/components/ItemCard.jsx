import { Typography, Box, Link } from "@mui/material";
import { motion } from "framer-motion";

export default function ItemCard({
  title,
  subtitle,
  link,
  Icon,
  color,
  palette,
}) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.05 }}
      style={{ willChange: "transform, opacity" }}
    >
      <Box
        sx={{
          textAlign: "center",
          px: 1,
          transition: "all 0.3s ease",
          "&:hover svg": {
            transform: "scale(1.2)",
          },
        }}
      >
        <Icon size={28} color={color} />

        {/* TITLE */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
          {link ? (
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                color: palette.text.primary,
                fontWeight: "bold",
                "&:hover": { color },
              }}
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </Typography>

        {/* SUBTITLE */}
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
    </motion.div>
  );
}
