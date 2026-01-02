import { Toolbar, Box, Typography, Button, Avatar } from "@mui/material";
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
        }}
      >
        {/* ================= AVATAR ================= */}
        <motion.div
          initial={{
            opacity: 0,
            rotateY: -180,
            scale: 0.7,
          }}
          animate={{
            opacity: 1,
            rotateY: 0,
            scale: 1,
            y: [0, -16, 0],
          }}
          transition={{
            opacity: { duration: 1.2 },
            rotateY: { duration: 1.4, ease: "easeOut" },
            scale: { duration: 1.1 },
            y: {
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            borderRadius: "50%",
            perspective: 1000,
          }}
        >
          <Box
            sx={{
              borderRadius: "50%",
              boxShadow: `0 0 35px ${glowColor}`,
              animation: "pulseGlow 3s ease-in-out infinite",
              "@keyframes pulseGlow": {
                "0%": { boxShadow: `0 0 18px ${glowColor}` },
                "50%": { boxShadow: `0 0 38px ${glowColor}` },
                "100%": { boxShadow: `0 0 18px ${glowColor}` },
              },
            }}
          >
            <Avatar
              alt="Jorge Patricio"
              src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
              sx={{
                width: { xs: 130, sm: 170, md: 200 },
                height: { xs: 130, sm: 170, md: 200 },
                border: `4px solid ${theme.palette.primary.main}`,
              }}
            />
          </Box>
        </motion.div>

        {/* ================= TEXTO ================= */}
        <Box
          textAlign={{ xs: "center", sm: "left" }}
          maxWidth="600px"
          mx="auto"
        >
          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.3 }}
          >
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

          {/* Subtítulo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
              gutterBottom
              sx={{ fontStyle: "italic" }}
            >
              🎓 Máster en Ingeniería de Software y Sistemas Informáticos
            </Typography>
          </motion.div>

          {/* Descripción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
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

          {/* ================= BOTONES ================= */}
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
              Ver CV
            </Button>

            <Button
              variant="contained"
              startIcon={<WorkspacePremiumIcon />}
              href="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1759022233/image_b835ddca-c010-4f78-a300-676248ea3fd120250927_201635_cizk17.jpg"
              target="_blank"
              sx={{
                borderRadius: "25px",
                textTransform: "none",
                fontWeight: "bold",
                px: 4,
                py: 1.4,
                background: `linear-gradient(90deg, #3b82f6, ${theme.palette.primary.main})`,
                boxShadow: "none",
              }}
            >
              Ver Título
            </Button>

            <Button
              variant="contained"
              startIcon={<SmartToyIcon />}
              onClick={() => window.openSashaChat?.()}
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
      </Box>
    </>
  );
}
