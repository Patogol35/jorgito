import {
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

export default function Hero({ mode, setMode }) {
  const theme = useTheme();

  const glowColor =
    theme.palette.mode === "dark"
      ? theme.palette.primary.main
      : "#60a5fa";

  /* ================= ANIMACIONES CINEMATOGRÁFICAS ================= */
  const easeOutExpo = [0.16, 1, 0.3, 1];

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
      transition: { duration: 1, ease: easeOutExpo },
    },
  };

  const textContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.6,
      },
    },
  };

  const buttonsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 1.3,
      },
    },
  };

  return (
    <>
      <Toolbar />

      <Box
        id="hero"
        sx={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, md: 8 },
          pt: { xs: 6, sm: 8, md: 10 },
          pb: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 4, md: 8 },
        }}
      >
        {/* ================= AVATAR ================= */}
<motion.div
  initial={{
    opacity: 0,
    scale: 0.45,
    rotateX: 55,
    rotateY: -25,
    filter: "blur(14px)",
  }}
  animate={{
    opacity: 1,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    filter: "blur(0px)",
  }}
  transition={{
    duration: 1.8,
    ease: easeOutExpo,
  }}
  style={{
    perspective: 1600,
    transformStyle: "preserve-3d",
    zIndex: 1,
  }}
>
  {/* Flotación sutil */}
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{
      duration: 5.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2.2,
    }}
    style={{ position: "relative" }}
  >
    {/* ================= ARO DE ESCANEO PROFESIONAL ================= */}
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1, rotate: 360 }}
      transition={{
        opacity: { duration: 1, delay: 0.9 },
        scale: { duration: 1, delay: 0.9 },
        rotate: {
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        },
      }}
      style={{
        position: "absolute",
        inset: -12,
        borderRadius: "50%",
        zIndex: 0,

        background:
          theme.palette.mode === "light"
            ? `
              conic-gradient(
                from 0deg,
                transparent 0deg,
                rgba(37,99,235,0.55) 70deg,
                transparent 140deg,
                rgba(37,99,235,0.35) 210deg,
                transparent 360deg
              )
            `
            : `
              conic-gradient(
                from 0deg,
                transparent 0deg,
                ${glowColor} 60deg,
                transparent 140deg,
                ${glowColor} 220deg,
                transparent 360deg
              )
            `,

        WebkitMask:
          "radial-gradient(farthest-side, transparent calc(100% - 1px), #000 0)",
        mask:
          "radial-gradient(farthest-side, transparent calc(100% - 1px), #000 0)",

        boxShadow:
          theme.palette.mode === "light"
            ? "0 0 6px rgba(0,0,0,0.12)"
            : "none",

        filter: "blur(0.15px)",
      }}
    />

    {/* ================= AVATAR ================= */}
    <Box
      sx={{
        width: { xs: 130, sm: 170, md: 200 },
        height: { xs: 130, sm: 170, md: 200 },
        borderRadius: "50%",
        overflow: "hidden",
        clipPath: "circle(50%)",
        border: `4px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        zIndex: 1,
      }}
    >
      <Avatar
        alt="Jorge Patricio"
        src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
        sx={{
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  </motion.div>
</motion.div>

        {/* ================= TEXTO ================= */}
        <Box
          textAlign={{ xs: "center", sm: "left" }}
          maxWidth="600px"
          mx="auto"
          zIndex={1}
        >
          <motion.div
            variants={textContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeCinematic}>
              <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: { xs: "1.9rem", sm: "2.3rem", md: "2.6rem" },
                }}
              >
                Hola, soy Jorge Patricio Santamaría Cherrez
              </Typography>
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ fontStyle: "italic" }}
              >
                🎓 Máster en Ingeniería de Software y Sistemas Informáticos
              </Typography>
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.08rem" },
                  lineHeight: 1.9,
                  letterSpacing: "0.3px",
                  color: theme.palette.text.primary,
                  opacity: theme.palette.mode === "dark" ? 0.85 : 0.9,
                  maxWidth: "520px",
                  mt: 3,
                  mb: 5,
                }}
              >
                Me apasiona crear tecnología que transforma ideas en realidades
                digitales. Mi enfoque está en aportar valor constante,
                desarrollando soluciones digitales seguras, innovadoras y
                orientadas a generar impacto positivo.
              </Typography>
            </motion.div>
          </motion.div>

          {/* ================= BOTONES ================= */}
          <motion.div
            variants={buttonsContainer}
            initial="hidden"
            animate="visible"
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: { xs: "center", sm: "flex-start" },
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {[
                {
                  label: "Ver CV",
                  icon: <DescriptionIcon />,
                  href: "/Jorge.CV.pdf",
                },
                {
                  label: "Ver Título",
                  icon: <WorkspacePremiumIcon />,
                  href:
                    "https://res.cloudinary.com/dqkwc0kf7/image/upload/v1759022233/image_b835ddca-c010-4f78-a300-676248ea3fd120250927_201635_cizk17.jpg",
                },
                {
                  label: "Sasha",
                  icon: <SmartToyIcon />,
                  onClick: () => window.openSashaChat?.(),
                },
              ].map((btn, i) => (
                <motion.div key={i} variants={fadeCinematic}>
                  <Button
                    variant="contained"
                    startIcon={btn.icon}
                    href={btn.href}
                    onClick={btn.onClick}
                    target={btn.href ? "_blank" : undefined}
                    sx={{
                      borderRadius: "25px",
                      textTransform: "none",
                      fontWeight: "bold",
                      px: 4,
                      py: 1.4,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                      boxShadow: "none",
                    }}
                  >
                    {btn.label}
                  </Button>
                </motion.div>
              ))}

              {/* TOGGLE DARK / LIGHT SOLO ICONO (MÁS GRANDE) */}
              <motion.div variants={fadeCinematic}>
                <IconButton
                  onClick={() => setMode(mode === "light" ? "dark" : "light")}
                  sx={{
                    color: theme.palette.primary.main,
                    "&:hover": {
                      background: "transparent",
                      transform: "scale(1.15)",
                    },
                    transition: "transform 0.2s ease",
                  }}
                >
                  {mode === "light" ? (
                    <Brightness4 sx={{ fontSize: 28 }} />
                  ) : (
                    <Brightness7 sx={{ fontSize: 28 }} />
                  )}
                </IconButton>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </>
  );
                    }
