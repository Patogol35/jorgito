import { Toolbar, Box, Typography, Button, Avatar, useTheme } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { motion, useReducedMotion } from "framer-motion";

// Configuración de animaciones avanzadas
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      mass: 0.5,
    },
  },
};

export default function Hero({ mode, setMode }) {
  const theme = useTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <Toolbar />

      <Box
        id="hero"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, md: 8 },
          pt: { xs: 6, sm: 8, md: 10 },
          pb: { xs: 1.5, sm: 2.5, md: 3 },
          px: { xs: 2, sm: 4, md: 8 },
          color: theme.palette.text.primary,
          position: "relative",
        }}
      >
        {/* Avatar con efecto flotante + destello */}
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
          }}
        >
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -16, 0],
                    rotate: [0, 1, -1, 0],
                  }
            }
            transition={
              shouldReduceMotion
                ? {}
                : {
                    y: {
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
            }
            style={{ display: "inline-block" }}
          >
            <Avatar
              alt="Jorge Patricio"
              src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
              sx={{
                width: { xs: 130, sm: 170, md: 200 },
                height: { xs: 130, sm: 170, md: 200 },
                border: `4px solid ${theme.palette.primary.main}`,
                position: "relative",
                zIndex: 2,
              }}
            />
          </motion.div>

          {/* Destello animado (shine effect) */}
          {!shouldReduceMotion && (
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "50%",
                height: "100%",
                background: `linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)`,
                zIndex: 1,
                borderRadius: "50%",
                opacity: 0.6,
              }}
            />
          )}
        </Box>

        {/* Contenido con animación stagger avanzada */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={shouldReduceMotion ? "visible" : "visible"}
          style={{
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: "1.9rem", sm: "2.3rem", md: "2.6rem" },
                lineHeight: 1.2,
              }}
            >
              Hola, soy Jorge Patricio Santamaría Cherrez
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h6"
              color="text.secondary"
              gutterBottom
              sx={{ fontStyle: "italic" }}
            >
              🎓 Máster en Ingeniería de Software y Sistemas Informáticos
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.08rem" },
                lineHeight: 1.9,
                letterSpacing: "0.3px",
                fontWeight: 400,
                color: theme.palette.text.primary,
                opacity: theme.palette.mode === "dark" ? 0.85 : 0.9,
                mt: { xs: 3, sm: 3.5 },
                mb: { xs: 4, sm: 5 },
              }}
            >
              Me apasiona crear tecnología que transforma ideas en realidades
              digitales. Mi enfoque está en aportar valor constante,
              desarrollando soluciones digitales seguras, innovadoras y
              orientadas a generar impacto positivo.
            </Typography>
          </motion.div>

          {/* Botones */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: { xs: "center", sm: "flex-start" },
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                startIcon={<DescriptionIcon />}
                href="/Jorge.CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderRadius: "25px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: { xs: 3.5, md: 5 },
                  py: 1.4,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                  boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.4)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  },
                }}
              >
                Ver CV
              </Button>

              <Button
                variant="contained"
                startIcon={<WorkspacePremiumIcon />}
                href="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1759022233/image_b835ddca-c010-4f78-a300-676248ea3fd120250927_201635_cizk17.jpg"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderRadius: "25px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: { xs: 3.5, md: 5 },
                  py: 1.4,
                  background: `linear-gradient(90deg, #3b82f6, ${theme.palette.primary.main})`,
                  boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.4)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  },
                }}
              >
                Ver Título
              </Button>

              <Button
                variant="contained"
                startIcon={<SmartToyIcon />}
                onClick={() => {
                  if (window.openSashaChat) window.openSashaChat();
                }}
                sx={{
                  borderRadius: "25px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: { xs: 3.5, md: 5 },
                  py: 1.4,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                  boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.4)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  },
                }}
              >
                Sasha
              </Button>

              <Button
                variant="outlined"
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
                sx={{
                  minWidth: 48,
                  width: 48,
                  height: 48,
                  padding: 0,
                  borderRadius: "50%",
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  "&:hover": {
                    background: theme.palette.primary.main,
                    color: "#fff",
                    transform: "scale(1.1)",
                    transition: "all 0.25s ease",
                  },
                }}
              >
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </Box>
    </>
  );
        }
