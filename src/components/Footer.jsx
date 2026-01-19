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
const MotionDivider = motion(Divider);

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const socialLinks = useMemo(
    () => [
      { icon: <GitHub />, href: "https://github.com/Patogol35" },
      {
        icon: <LinkedIn />,
        href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2",
      },
      { icon: <Instagram />, href: "https://www.instagram.com/jorge_patricio_26" },
      { icon: <MailOutline />, href: "mailto:patogol3535@gmail.com" },
    ],
    []
  );

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        pt: { xs: 4.5, md: 6 },
        pb: { xs: 3, md: 3.5 },
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
      {/* Glass */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(9px)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 820,
          mx: "auto",
          px: { xs: 1.5, sm: 2 },
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
              letterSpacing: "1.4px",
              mb: 1,
              fontSize: { xs: "1rem", sm: "1.15rem" },
            }}
          >
            Jorge Patricio Santamaría Cherrez
          </Typography>
        </MotionBox>

        {/* Línea decorativa */}
        <Box
          sx={{
            width: 56,
            height: 3,
            mx: "auto",
            mb: 2,
            borderRadius: 4,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.25), rgba(255,255,255,0.85), rgba(255,255,255,0.25))",
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
              mb: 2.2,
              fontWeight: 600,
              letterSpacing: "0.45px",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              opacity: 0.95,
            }}
          >
            Transformando ideas en aplicaciones efectivas
          </Typography>
        </MotionBox>

        {/* Redes con hover PRO */}
        <Box
          sx={{
            mb: 2,
            "& a": {
              transition: "all 0.25s ease",
              "&:hover": {
                transform: "translateY(-4px) scale(1.12)",
                filter: "drop-shadow(0 6px 14px rgba(255,255,255,0.35))",
              },
            },
          }}
        >
          <SocialLinks
            socialLinks={socialLinks}
            size="30px"
            animated
            spacing={2}
            color="rgba(255,255,255,0.95)"
          />
        </Box>

        {/* Divider animado */}
        <MotionDivider
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          sx={{
            my: 2.5,
            mx: "auto",
            width: 100,
            borderBottomWidth: 2,
            borderColor: "rgba(255,255,255,0.45)",
            transformOrigin: "center",
          }}
        />

        {/* Créditos */}
        <Stack spacing={0.4}>
          <Typography
            variant="caption"
            sx={{ fontWeight: 500, opacity: 0.9 }}
          >
            Portafolio desarrollado por Jorge Patricio Santamaría Cherrez
          </Typography>
          <Typography
            variant="caption"
            sx={{ opacity: 0.7 }}
          >
            © {new Date().getFullYear()} — Todos los derechos reservados
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
            }
