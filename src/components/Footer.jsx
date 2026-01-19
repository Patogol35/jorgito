import {
  Box,
  Typography,
  useTheme,
  Divider,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { useMemo } from "react";
import SocialLinks from "./SocialLinks";
import {
  GitHub,
  LinkedIn,
  Instagram,
  MailOutline,
} from "@mui/icons-material";

const MotionBox = motion(Box);

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const socialLinks = useMemo(
    () => [
      {
        icon: <GitHub />,
        color: isDark ? "#c7d2fe" : "#ffffff",
        href: "https://github.com/Patogol35",
      },
      {
        icon: <LinkedIn />,
        color: isDark ? "#93c5fd" : "#ffffff",
        href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2",
      },
      {
        icon: <Instagram />,
        color: isDark ? "#f9a8d4" : "#ffffff",
        href: "https://www.instagram.com/jorge_patricio_26",
      },
      {
        icon: <MailOutline />,
        color: isDark ? "#c7d2fe" : "#ffffff",
        href: "mailto:patogol3535@gmail.com",
      },
    ],
    [isDark]
  );

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        pt: { xs: 6, md: 7 },
        pb: { xs: 3.5, md: 4 },
        textAlign: "center",
        color: "#fff",
        background: isDark
          ? "linear-gradient(180deg, #020617 0%, #000000 100%)"
          : "linear-gradient(135deg, #0d47a1, #42a5f5)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.04)"
          : "inset 0 1px 0 rgba(255,255,255,0.3)",
        overflow: "hidden",
      }}
    >
      {/* Glass overlay refinado */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(10px)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.25))",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 900,
          mx: "auto",
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Nombre */}
        <MotionBox
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: "2px",
              mb: 1,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.98)",
            }}
          >
            Jorge Patricio Santamaría Cherrez
          </Typography>
        </MotionBox>

        {/* Línea decorativa más fina */}
        <Box
          sx={{
            width: 64,
            height: 2,
            mx: "auto",
            mb: 2.5,
            borderRadius: 4,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.85), rgba(255,255,255,0.15))",
          }}
        />

        {/* Eslogan */}
        <MotionBox
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              mb: 3,
              fontWeight: 500,
              letterSpacing: "0.6px",
              color: "rgba(255,255,255,0.92)",
            }}
          >
            Transformando ideas en aplicaciones efectivas
          </Typography>
        </MotionBox>

        {/* Redes */}
        <Box sx={{ mb: 3 }}>
          <SocialLinks
            socialLinks={socialLinks}
            size="30px"
            animated
            spacing={2.2}
          />
        </Box>

        {/* Divider más elegante */}
        <Divider
          sx={{
            my: 3,
            mx: "auto",
            width: 120,
            borderBottomWidth: 1.5,
            borderColor: "rgba(255,255,255,0.35)",
          }}
        />

        {/* Créditos */}
        <Stack spacing={0.5}>
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "0.5px",
              fontWeight: 500,
            }}
          >
            Portafolio desarrollado por Jorge Patricio Santamaría Cherrez
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.65)",
              letterSpacing: "0.4px",
            }}
          >
            © {new Date().getFullYear()} — Todos los derechos reservados
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
