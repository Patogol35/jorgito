import { Box, Typography, Divider, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";
import {
  GitHub,
  LinkedIn,
  Instagram,
  MailOutline,
} from "@mui/icons-material";

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const socialLinks = [
    {
      icon: <GitHub />,
      color: isDark ? "#bbdefb" : "#ffffff",
      href: "https://github.com/Patogol35",
    },
    {
      icon: <LinkedIn />,
      color: isDark ? "#90caf9" : "#ffffff",
      href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2",
    },
    {
      icon: <Instagram />,
      color: isDark ? "#f48fb1" : "#ffffff",
      href: "https://www.instagram.com/jorge_patricio_26",
    },
    {
      icon: <MailOutline />,
      color: isDark ? "#bbdefb" : "#ffffff",
      href: "mailto:patogol3535@gmail.com",
    },
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  return (
    <Box
      component="footer"
      sx={{
        pt: { xs: 6, md: 8 },
        pb: 4,
        px: 2,
        textAlign: "center",
        color: "#fff",
        background: isDark
          ? "linear-gradient(180deg, #020617 0%, #000000 100%)"
          : "linear-gradient(135deg, #1565c0, #42a5f5)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.04)"
          : "inset 0 1px 0 rgba(255,255,255,0.2)",
      }}
    >
      {/* Nombre + eslogan */}
      <motion.div {...fadeUp}>
        <Typography
          variant="h6"
          sx={{
            mb: 0.5,
            fontWeight: 700,
            letterSpacing: "0.5px",
          }}
        >
          Jorge Patricio Santamaría Cherrez
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            mb: 3,
            color: "rgba(255,255,255,0.85)",
            maxWidth: 520,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Transformando ideas en aplicaciones efectivas
        </Typography>
      </motion.div>

      {/* Redes sociales */}
      <motion.div {...fadeUp}>
        <SocialLinks
          socialLinks={socialLinks}
          size="30px"
          animated
          spacing={2}
        />
      </motion.div>

      {/* Separador */}
      <motion.div {...fadeUp}>
        <Divider
          sx={{
            my: 3,
            mx: "auto",
            width: "120px",
            backgroundColor: "rgba(255,255,255,0.25)",
          }}
        />
      </motion.div>

      {/* Créditos */}
      <motion.div {...fadeUp}>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: "rgba(255,255,255,0.88)",
            letterSpacing: "0.3px",
            fontWeight: 500,
          }}
        >
          Página / portafolio desarrollada por Jorge Patricio Santamaría Cherrez
        </Typography>
      </motion.div>

      {/* Copyright */}
      <motion.div {...fadeUp}>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 1.5,
            color: "rgba(255,255,255,0.75)",
            letterSpacing: "0.3px",
          }}
        >
          © {new Date().getFullYear()} Jorge Patricio. Todos los derechos reservados.
        </Typography>
      </motion.div>
    </Box>
  );
}
