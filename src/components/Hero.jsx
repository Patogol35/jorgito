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

{/* ================= AVATAR 3D REAL PROFESIONAL ================= */}
<motion.div
  style={{
    perspective: 1800,
    zIndex: 2,
  }}
  initial={{
    opacity: 0,
    scale: 0.75,
    rotateX: 25,
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
    ease: [0.16, 1, 0.3, 1],
  }}
>
  <motion.div
    onMouseMove={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      e.currentTarget.style.transform = `
        rotateX(${(-y / 12)}deg)
        rotateY(${(x / 12)}deg)
        translateZ(30px)
      `;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform =
        "rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }}
    animate={{ y: [0, -18, 0] }}
    transition={{
      y: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
    style={{
      transformStyle: "preserve-3d",
      transition: "transform 0.15s ease-out",
    }}
  >
    <Box
      sx={{
        position: "relative",
        borderRadius: "50%",
        transform: "translateZ(40px)",

        /* SOMBRA 3D */
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 30,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.45)",
          filter: "blur(38px)",
          transform: "translateZ(-80px)",
          zIndex: -3,
        },

        /* HALO LUMINOSO PROFUNDO */
        "&::after": {
          content: '""',
          position: "absolute",
          inset: -28,
          borderRadius: "50%",
          background: `
            radial-gradient(
              circle at 30% 20%,
              ${glowColor},
              transparent 70%
            )
          `,
          filter: "blur(42px)",
          opacity: 0.85,
          transform: "translateZ(-40px)",
          zIndex: -2,
        },
      }}
    >
      <Avatar
        alt="Jorge Patricio"
        src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
        sx={{
          width: { xs: 150, sm: 190, md: 230 },
          height: { xs: 150, sm: 190, md: 230 },
          border: `5px solid ${theme.palette.primary.main}`,
          position: "relative",
          transform: "translateZ(60px)",

          /* LUZ ESPECULAR DINÁMICA */
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `
              radial-gradient(
                circle at 30% 20%,
                rgba(255,255,255,0.45),
                transparent 55%
              )
            `,
            mixBlendMode: "screen",
            pointerEvents: "none",
          },
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
