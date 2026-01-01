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
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, md: 8 },
          pt: { xs: 6, sm: 8, md: 10 },
          pb: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 4, md: 8 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow de fondo sutil */}
        <Box
          sx={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.palette.primary.main}33 0%, transparent 70%)`,
            filter: "blur(60px)",
            top: "10%",
            left: { xs: "50%", sm: "15%" },
            transform: "translateX(-50%)",
            zIndex: 0,
          }}
        />

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ zIndex: 1 }}
        >
          <Box
            sx={{
              borderRadius: "50%",
              padding: "6px",
              background: `linear-gradient(
                135deg,
                ${theme.palette.primary.main},
                #3b82f6
              )`,
              boxShadow: `0 0 35px ${
                isDark ? theme.palette.primary.main : "#3b82f688"
              }`,
            }}
          >
            <Avatar
              alt="Jorge Patricio"
              src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
              sx={{
                width: { xs: 130, sm: 170, md: 200 },
                height: { xs: 130, sm: 170, md: 200 },
                border: `4px solid ${theme.palette.background.paper}`,
              }}
            />
          </Box>
        </motion.div>

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ zIndex: 1 }}
        >
          <Box
            textAlign={{ xs: "center", sm: "left" }}
            maxWidth="600px"
            mx="auto"
          >
            <Typography
              variant="h3"
              fontWeight={800}
              gutterBottom
              sx={{
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.9rem", sm: "2.3rem", md: "2.6rem" },
              }}
            >
              Hola, soy Jorge Patricio Santamaría Cherrez
            </Typography>

            <Typography
              variant="h6"
              sx={{
                opacity: 0.85,
                fontStyle: "italic",
              }}
              gutterBottom
            >
              🎓 Máster en Ingeniería de Software y Sistemas Informáticos
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.08rem" },
                lineHeight: 1.9,
                letterSpacing: "0.3px",
                opacity: isDark ? 0.85 : 0.9,
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

            {/* Botones */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: { xs: "center", sm: "flex-start" },
                flexWrap: "wrap",
              }}
            >
              {[{
                label: "Ver CV",
                icon: <DescriptionIcon />,
                href: "/Jorge.CV.pdf",
              },
              {
                label: "Ver Título",
                icon: <WorkspacePremiumIcon />,
                href: "https://res.cloudinary.com/dqkwc0kf7/image/upload/v1759022233/image_b835ddca-c010-4f78-a300-676248ea3fd120250927_201635_cizk17.jpg",
              }].map((btn) => (
                <Button
                  key={btn.label}
                  variant="contained"
                  startIcon={btn.icon}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderRadius: "25px",
                    textTransform: "none",
                    fontWeight: "bold",
                    px: { xs: 3.5, md: 5 },
                    py: 1.4,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                    transition: "transform .2s ease, box-shadow .2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 10px 25px ${theme.palette.primary.main}55`,
                    },
                  }}
                >
                  {btn.label}
                </Button>
              ))}

              {/* Sasha */}
              <Button
                variant="contained"
                startIcon={<SmartToyIcon />}
                onClick={() => window.openSashaChat?.()}
                sx={{
                  borderRadius: "25px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: { xs: 3.5, md: 5 },
                  py: 1.4,
                  background: `linear-gradient(90deg, #3b82f6, ${theme.palette.primary.main})`,
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Sasha
              </Button>

              {/* Modo */}
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
                  },
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
