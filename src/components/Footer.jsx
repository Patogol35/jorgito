import {
  Box,
  Typography,
  useTheme,
  Divider,
  Stack,
} from "@mui/material";
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

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        pt: { xs: 6, md: 8 },
        pb: 4,
        textAlign: "center",
        color: "#fff",
        background: isDark
          ? "linear-gradient(180deg, #020617 0%, #000000 100%)"
          : "linear-gradient(135deg, #1565c0, #42a5f5)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.04)"
          : "inset 0 1px 0 rgba(255,255,255,0.25)",
        overflow: "hidden",
      }}
    >
      {/* Sutil capa glass (muy ligera, no cambia colores) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(6px)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.15))",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        {/* Eslogan */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              mb: 3,
              fontWeight: 600,
              letterSpacing: "0.5px",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            Transformando ideas en aplicaciones efectivas
          </Typography>
        </motion.div>

        {/* Redes sociales */}
        <Box sx={{ mb: 2 }}>
          <SocialLinks
            socialLinks={socialLinks}
            size="30px"
            animated
            spacing={2}
          />
        </Box>

        {/* Separador más fino y elegante */}
        <Divider
          sx={{
            my: 3,
            mx: "auto",
            width: 72,
            opacity: 0.6,
            borderColor: "rgba(255,255,255,0.25)",
          }}
        />

        {/* Créditos */}
        <Stack spacing={0.7}>
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "0.35px",
              fontWeight: 500,
            }}
          >
            Portafolio desarrollado por Jorge Patricio Santamaría Cherrez
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.3px",
            }}
          >
            © {new Date().getFullYear()} — Todos los derechos reservados
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
