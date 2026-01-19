import {
  Box,
  Typography,
  useTheme,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: <GitHub />,
      color: "#d4af37",
      href: "https://github.com/Patogol35",
    },
    {
      icon: <LinkedIn />,
      color: "#d4af37",
      href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2",
    },
    {
      icon: <Instagram />,
      color: "#d4af37",
      href: "https://www.instagram.com/jorge_patricio_26",
    },
    {
      icon: <MailOutline />,
      color: "#d4af37",
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
        background: "linear-gradient(180deg, #050505 0%, #000000 100%)",
        overflow: "hidden",
      }}
    >
      {/* Glassmorphism overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(12px)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.6))",
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        {/* Logo JP animado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: "6px",
              color: "#d4af37",
              mb: 2,
            }}
          >
            JP
          </Typography>
        </motion.div>

        {/* Eslogan */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              mb: 3,
              fontWeight: 500,
              letterSpacing: "0.4px",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            Transformando ideas en aplicaciones efectivas
          </Typography>
        </motion.div>

        {/* Redes sociales */}
        <SocialLinks
          socialLinks={socialLinks}
          size="30px"
          animated
          spacing={2}
        />

        {/* Divider elegante */}
        <Divider
          sx={{
            my: 3,
            mx: "auto",
            width: 90,
            backgroundColor: "rgba(212,175,55,0.4)",
          }}
        />

        {/* Créditos */}
        <Stack spacing={0.8}>
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.3px",
            }}
          >
            Portafolio desarrollado por Jorge Patricio Santamaría Cherrez
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.65)",
              letterSpacing: "0.3px",
            }}
          >
            © {new Date().getFullYear()} — Todos los derechos reservados
          </Typography>
        </Stack>
      </Box>

      {/* Back to top button */}
      <IconButton
        onClick={scrollToTop}
        sx={{
          position: "absolute",
          right: 20,
          bottom: 20,
          color: "#d4af37",
          border: "1px solid rgba(212,175,55,0.5)",
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.4)",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(212,175,55,0.15)",
            transform: "translateY(-3px)",
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </IconButton>
    </Box>
  );
          }
