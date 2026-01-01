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
  const isDark = theme.palette.mode === "dark";

  return (
    <>
      <Toolbar />

      {/* FONDO ANIMADO SUAVE */}
      <Box
        id="hero"
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          px: { xs: 2, sm: 4, md: 8 },
          background: isDark
            ? "linear-gradient(180deg, #050b18, #020617)"
            : "linear-gradient(180deg, #f8fafc, #ffffff)",
        }}
      >
        {/* Glow animado */}
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,.25), transparent 65%)",
            top: "-120px",
            left: "-120px",
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: { xs: 5, md: 10 },
            maxWidth: "1200px",
            width: "100%",
            zIndex: 2,
          }}
        >
          {/* AVATAR */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.05 }}
              style={{
                borderRadius: "50%",
                boxShadow: `0 0 70px ${
                  isDark
                    ? "rgba(59,130,246,.35)"
                    : "rgba(59,130,246,.25)"
                }`,
              }}
            >
              <Avatar
                src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
                alt="Jorge Patricio"
                sx={{
                  width: { xs: 140, sm: 180, md: 220 },
                  height: { xs: 140, sm: 180, md: 220 },
                  border: `4px solid ${theme.palette.primary.main}`,
                }}
              />
            </motion.div>
          </motion.div>

          {/* TEXTO */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <Box maxWidth="620px" textAlign={{ xs: "center", sm: "left" }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.15,
                  fontSize: { xs: "2.1rem", sm: "2.6rem", md: "3rem" },
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                Hola, soy Jorge Patricio Santamaría Cherrez
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.05rem",
                  fontWeight: 500,
                  color: "text.secondary",
                  mb: 3,
                }}
              >
                🎓 Máster en Ingeniería de Software y Sistemas Informáticos
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.05rem",
                  lineHeight: 1.9,
                  opacity: 0.9,
                  mb: 5,
                }}
              >
                Desarrollo soluciones digitales modernas, seguras y escalables.
                Transformo ideas en productos reales combinando arquitectura
                limpia, experiencia de usuario y tecnología de alto nivel.
              </Typography>

              {/* BOTONES */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <HeroButton
                  icon={<DescriptionIcon />}
                  label="Ver CV"
                  href="/Jorge.CV.pdf"
                />
                <HeroButton
                  icon={<WorkspacePremiumIcon />}
                  label="Ver Título"
                  href="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1759022233/image_b835ddca-c010-4f78-a300-676248ea3fd120250927_201635_cizk17.jpg"
                />

                {/* SASHA BUBBLE */}
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    startIcon={<SmartToyIcon />}
                    onClick={() =>
                      window.openSashaChat && window.openSashaChat()
                    }
                    sx={{
                      px: 4,
                      py: 1.4,
                      borderRadius: "30px",
                      fontWeight: 700,
                      textTransform: "none",
                      background:
                        "linear-gradient(90deg,#6366f1,#3b82f6)",
                      boxShadow:
                        "0 0 20px rgba(99,102,241,.45)",
                    }}
                    variant="contained"
                  >
                    Sasha
                  </Button>
                </motion.div>

                {/* MODO OSCURO / CLARO */}
                <IconButton
                  onClick={() =>
                    setMode(mode === "light" ? "dark" : "light")
                  }
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: `1.5px solid ${theme.palette.primary.main}`,
                    color: theme.palette.primary.main,
                    transition: "all .25s ease",
                    "&:hover": {
                      background: theme.palette.primary.main,
                      color: "#fff",
                    },
                  }}
                >
                  {mode === "light" ? <Brightness4 /> : <Brightness7 />}
                </IconButton>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </>
  );
}

/* BOTÓN BASE */
function HeroButton({ icon, label, href }) {
  return (
    <Button
      startIcon={icon}
      href={href}
      target="_blank"
      variant="contained"
      sx={{
        px: 4,
        py: 1.4,
        borderRadius: "30px",
        fontWeight: 700,
        textTransform: "none",
        background: "linear-gradient(90deg,#3b82f6,#2563eb)",
        transition: "all .3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 12px 30px rgba(59,130,246,.35)",
        },
      }}
    >
      {label}
    </Button>
  );
}
