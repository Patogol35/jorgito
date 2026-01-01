import {
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
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

      <Box
        id="hero"
        sx={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 5, md: 10 },
          px: { xs: 2, sm: 4, md: 8 },
        }}
      >
        {/* AVATAR */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            style={{
              borderRadius: "50%",
              boxShadow: `0 0 60px ${
                isDark ? "rgba(59,130,246,.35)" : "rgba(59,130,246,.25)"
              }`,
            }}
          >
            <Avatar
              src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
              alt="Jorge Patricio"
              sx={{
                width: { xs: 140, sm: 180, md: 210 },
                height: { xs: 140, sm: 180, md: 210 },
                border: `4px solid ${theme.palette.primary.main}`,
              }}
            />
          </motion.div>
        </motion.div>

        {/* TEXTO */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <Box
            maxWidth="600px"
            textAlign={{ xs: "center", sm: "left" }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                lineHeight: 1.2,
                fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1.5,
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
                color: theme.palette.text.primary,
                opacity: 0.9,
                mb: 5,
              }}
            >
              Creo soluciones digitales modernas, seguras y escalables.
              Me enfoco en transformar ideas en productos con impacto real,
              combinando arquitectura limpia, experiencia de usuario y
              tecnología de vanguardia.
            </Typography>

            {/* BOTONES */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "flex-start" },
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
              ].map((btn) => (
                <Button
                  key={btn.label}
                  variant="contained"
                  startIcon={btn.icon}
                  href={btn.href}
                  target="_blank"
                  sx={{
                    px: 4,
                    py: 1.4,
                    borderRadius: "30px",
                    fontWeight: 700,
                    textTransform: "none",
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                    transition: "all .3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 30px rgba(59,130,246,.35)",
                    },
                  }}
                >
                  {btn.label}
                </Button>
              ))}

              <Button
                variant="contained"
                startIcon={<SmartToyIcon />}
                onClick={() =>
                  window.openSashaChat && window.openSashaChat()
                }
                sx={{
                  px: 4,
                  py: 1.4,
                  borderRadius: "30px",
                  fontWeight: 700,
                  background: "linear-gradient(90deg,#6366f1,#3b82f6)",
                }}
              >
                Sasha
              </Button>

              <Button
                variant="outlined"
                onClick={() =>
                  setMode(mode === "light" ? "dark" : "light")
                }
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  borderColor: theme.palette.primary.main,
                }}
              >
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </>
  );
}
