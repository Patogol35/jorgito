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
        pt: { xs: 7, md: 9 },
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
      {/* Fondo refinado (glass + profundidad, sin cambiar colores) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(8px)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.18))",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 820,
          mx: "auto",
          px: 2,
        }}
      >
        {/* Nombre completo */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: "1.4px",
              mb: 0.6,
              color: "rgba(255,255,255,0.98)",
            }}
          >
            Jorge Patricio Santamaría Cherrez
          </Typography>
        </motion.div>

        {/* Línea visual sutil */}
        <Box
          sx={{
            width: 42,
            height: 2,
            mx: "auto",
            mb: 2.5,
            borderRadius: 2,
            backgroundColor: "rgba(255,255,255,0.35)",
          }}
        />

        {/* Eslogan */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.05,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              mb: 3,
              fontWeight: 600,
              letterSpacing: "0.45px",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            Transformando ideas en aplicaciones efectivas
          </Typography>
        </motion.div>

        {/* Redes */}
        <Box sx={{ mb: 2.5 }}>
          <SocialLinks
            socialLinks={socialLinks}
            size="30px"
            animated
            spacing={2}
          />
        </Box>

        {/* Divider afinado */}
        <Divider
          sx={{
            my: 3,
            mx: "auto",
            width: 64,
            opacity: 0.55,
            borderColor: "rgba(255,255,255,0.25)",
          }}
        />

        {/* Créditos */}
        <Stack spacing={0.6}>
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
