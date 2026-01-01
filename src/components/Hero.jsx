import { Toolbar, Box, Typography, Button, Avatar } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

/* ===== VARIANTS PROFESIONALES ===== */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1], // easing PRO
    },
  },
};

export default function Hero({ mode, setMode }) {
  const theme = useTheme();

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
          gap: { xs: 5, md: 10 },
          pt: { xs: 7, sm: 9, md: 11 },
          pb: { xs: 4, md: 5 },
          px: { xs: 2, sm: 4, md: 8 },
          background:
            theme.palette.mode === "dark"
              ? `
                radial-gradient(900px circle at 10% -10%, rgba(59,130,246,.25), transparent 40%),
                radial-gradient(700px circle at 90% 10%, rgba(99,102,241,.25), transparent 45%),
                linear-gradient(#0b0f19, #0b0f19)
              `
              : `
                radial-gradient(900px circle at 10% -10%, rgba(59,130,246,.22), transparent 40%),
                radial-gradient(700px circle at 90% 10%, rgba(99,102,241,.22), transparent 45%),
                linear-gradient(#f8fafc, #f8fafc)
              `,
        }}
      >
        {/* GRID */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: theme.palette.mode === "dark" ? 0.25 : 0.18,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        {/* CONTENEDOR ANIMADO */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ display: "flex", gap: "4rem", alignItems: "center", flexWrap: "wrap" }}
        >
          {/* AVATAR */}
          <motion.div variants={item} style={{ position: "relative" }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: -18,
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg, transparent, #3b82f6, transparent)",
                filter: "blur(2px)",
              }}
            />

            <Avatar
              alt="Jorge Patricio"
              src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
              sx={{
                width: { xs: 140, sm: 180, md: 210 },
                height: { xs: 140, sm: 180, md: 210 },
                border: `4px solid ${theme.palette.primary.main}`,
                boxShadow: "0 30px 70px rgba(0,0,0,.45)",
                position: "relative",
                zIndex: 1,
              }}
            />
          </motion.div>

          {/* TEXTO */}
          <Box maxWidth="620px" textAlign={{ xs: "center", sm: "left" }}>
            <motion.div variants={item}>
              <Typography
                variant="h3"
                fontWeight={800}
                gutterBottom
                sx={{
                  fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
                  background: "linear-gradient(90deg, #3b82f6, #6366f1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.7px",
                }}
              >
                Hola, soy Jorge Patricio Santamaría Cherrez
              </Typography>
            </motion.div>

            <motion.div variants={item}>
              <Typography
                variant="h6"
                sx={{ fontStyle: "italic", color: theme.palette.text.secondary }}
                gutterBottom
              >
                🎓 Máster en Ingeniería de Software y Sistemas Informáticos
              </Typography>
            </motion.div>

            <motion.div variants={item}>
              <Typography
                sx={{
                  fontSize: { xs: "1.05rem", sm: "1.1rem" },
                  lineHeight: 1.9,
                  mt: 3,
                  mb: 5,
                  maxWidth: "520px",
                  opacity: 0.92,
                }}
              >
                Desarrollo soluciones digitales seguras, escalables y modernas,
                enfocadas en generar impacto real y valor constante.
              </Typography>
            </motion.div>

            {/* BOTONES */}
            <motion.div variants={item}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                {/* (botones SIN CAMBIOS de color) */}
                {/* CV */}
                <Button
                  variant="contained"
                  startIcon={<DescriptionIcon />}
                  href="/Jorge.CV.pdf"
                  target="_blank"
                  sx={{
                    borderRadius: "26px",
                    fontWeight: 700,
                    px: { xs: 4, md: 5 },
                    py: 1.4,
                    background: "linear-gradient(90deg, #3b82f6, #6366f1)",
                  }}
                >
                  Ver CV
                </Button>

                <Button
                  variant="contained"
                  startIcon={<WorkspacePremiumIcon />}
                  href="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1759022233/image_b835ddca-c010-4f78-a300-676248ea3fd120250927_201635_cizk17.jpg"
                  target="_blank"
                  sx={{
                    borderRadius: "26px",
                    fontWeight: 700,
                    px: { xs: 4, md: 5 },
                    py: 1.4,
                    background: "linear-gradient(90deg, #3b82f6, #6366f1)",
                  }}
                >
                  Ver Título
                </Button>

                <Button
                  variant="contained"
                  startIcon={<SmartToyIcon />}
                  onClick={() => window.openSashaChat?.()}
                  sx={{
                    borderRadius: "26px",
                    fontWeight: 700,
                    px: { xs: 4, md: 5 },
                    py: 1.4,
                    background: "linear-gradient(90deg, #3b82f6, #6366f1)",
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
                    borderRadius: "50%",
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                  }}
                >
                  {mode === "light" ? <Brightness4 /> : <Brightness7 />}
                </Button>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </>
  );
                  }
