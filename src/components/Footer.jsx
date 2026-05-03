import {
  Box,
  Typography,
  useTheme,
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

const MotionDiv = motion.div;

export default function Footer({ t }) {
  const theme = useTheme();
  const { palette } = theme;
  const isDark = palette.mode === "dark";

  const easeOutExpo = [0.16, 1, 0.3, 1];

  /* MISMO EFECTO DEL HERO */
  const fadeCinematic = {
    hidden: {
      opacity: 0,
      y: 16,
      clipPath: "inset(0 0 100% 0)",
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0 0 0% 0)",
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: easeOutExpo,
      },
    },
  };

  const footerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  };

  const socialLinks = useMemo(
    () => [
      {
        icon: <GitHub />,
        color: "#ffffff",
        href: "https://github.com/Patogol35",
      },
      {
        icon: <LinkedIn />,
        color: isDark ? "#90caf9" : "#ffffff",
        href:
          "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2",
      },
      {
        icon: <Instagram />,
        color: isDark ? "#f48fb1" : "#ffffff",
        href: "https://www.instagram.com/jorge_patricio_26",
      },
      {
        icon: <MailOutline />,
        color: "#ffffff",
        href: "mailto:patogol3535@gmail.com",
      },
    ],
    [isDark]
  );

  const Separator = () => (
    <MotionDiv variants={fadeCinematic}>
      <Box
        sx={{
          width: 120,
          height: 2,
          mx: "auto",
          my: 3,
          borderRadius: 4,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.85), rgba(255,255,255,0.12))",
        }}
      />
    </MotionDiv>
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
      {/* Glass overlay */}
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
        <MotionDiv
          variants={footerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* NOMBRE */}
          <MotionDiv variants={fadeCinematic}>
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
          </MotionDiv>

          <Separator />

          {/* ESLOGAN */}
          <MotionDiv variants={fadeCinematic}>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 2,
                fontWeight: 500,
                letterSpacing: "0.6px",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              {t.footer.slogan}
            </Typography>
          </MotionDiv>

          <Separator />

          {/* REDES */}
          <MotionDiv variants={fadeCinematic}>
            <Box sx={{ mb: 3 }}>
              <SocialLinks
  socialLinks={socialLinks}
  size="30px"
  animated={false}
  spacing={2.2}
/>
            </Box>
          </MotionDiv>

          <Separator />

          {/* CRÉDITOS */}
          <MotionDiv variants={fadeCinematic}>
            <Stack spacing={0.5}>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  letterSpacing: "0.5px",
                  fontWeight: 500,
                }}
              >
                {t.footer.credit}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "0.4px",
                }}
              >
                © {new Date().getFullYear()} — {t.footer.rights}
              </Typography>
            </Stack>
          </MotionDiv>
        </MotionDiv>
      </Box>
    </Box>
  );
}
