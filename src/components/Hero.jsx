import { Toolbar, Box, Typography, Button, Avatar, useTheme } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { motion, useReducedMotion } from "framer-motion";

// Variantes refinadas
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.33, 1, 0.68, 1], // easeOut personalizado (suave al final)
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
        }}
      >
        {/* Avatar: flotación natural + micro-rotación + escala sutil */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -12, 0],
                  rotate: [0, 0.8, -0.8, 0],
                  scale: [1, 1.01, 1],
                }
          }
          transition={
            shouldReduceMotion
              ? {}
              : {
                  y: {
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotate: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 5,
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
              background: theme.palette.background.paper,
            }}
          />
        </motion.div>

        {/* Contenido con entrada escalonada refinada */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={shouldReduceMotion ? "show" : "show"}
          style={{
            textAlign: { xs: "center", sm: "left" },
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <motion.div variants={item}>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: "1.9rem", sm: "2.3rem", md: "2.6rem" },
                lineHeight: 1.25,
              }}
            >
              Hola, soy Jorge Patricio Santamaría Cherrez
            </Typography>
          </motion.div>

          <motion.div variants={item}>
            <Typography
              variant="h6"
              color="text.secondary"
              gutterBottom
              sx={{ fontStyle: "italic" }}
            >
              🎓 Máster en Ingeniería de Software y Sistemas Informáticos
            </Typography>
          </motion.div>

          <motion.div variants={item}>
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
          <motion.div variants={item}>
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
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
                    transition: "transform 0.25s, box-shadow 0.25s",
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
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
                    transition: "transform 0.25s, box-shadow 0.25s",
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
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
                    transition: "transform 0.25s, box-shadow 0.25s",
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
                    transform: "scale(1.08)",
                    transition: "all 0.2s ease",
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
