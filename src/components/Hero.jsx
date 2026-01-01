import { Toolbar, Box, Typography, Button, Avatar } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

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
          gap: { xs: 4, md: 8 },
          pt: { xs: 7, sm: 9, md: 11 },
          pb: { xs: 3, md: 4 },
          px: { xs: 2, sm: 4, md: 8 },
        }}
      >
        {/* FONDO ANIMADO TECH (VISIBLE) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(120deg, #0b0f19, #111827, #0b0f19)"
                : "linear-gradient(120deg, #f8fafc, #eef2ff, #f8fafc)",
            backgroundSize: "300% 300%",
          }}
        >
          <motion.div
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>

        {/* GLOW */}
        <Box
          sx={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,.35), transparent 65%)",
            filter: "blur(120px)",
            top: -200,
            right: -200,
            zIndex: 0,
          }}
        />

        {/* AVATAR */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: -18,
              borderRadius: "50%",
              background:
                "conic-gradient(from 0deg, transparent, #3b82f6, transparent)",
              filter: "blur(4px)",
              animation: "spin 14s linear infinite",
            }}
          />
          <Avatar
            alt="Jorge Patricio"
            src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
            sx={{
              width: { xs: 130, sm: 170, md: 200 },
              height: { xs: 130, sm: 170, md: 200 },
              border: `4px solid ${theme.palette.primary.main}`,
              boxShadow: "0 30px 70px rgba(0,0,0,.45)",
              position: "relative",
              zIndex: 2,
            }}
          />
        </motion.div>

        {/* TEXTO */}
        <Box
          maxWidth="620px"
          textAlign={{ xs: "center", sm: "left" }}
          zIndex={1}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              fontWeight={800}
              gutterBottom
              sx={{
                fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
                background: "linear-gradient(90deg, #3b82f6, #6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Hola, soy Jorge Patricio Santamaría Cherrez
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Typography
              variant="h6"
              sx={{ fontStyle: "italic", color: theme.palette.text.secondary }}
            >
              🎓 Máster en Ingeniería de Software y Sistemas Informáticos
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Typography
              sx={{
                mt: 3,
                mb: 5,
                maxWidth: "520px",
                lineHeight: 1.9,
                opacity: 0.9,
              }}
            >
              Desarrollo soluciones digitales seguras, escalables y modernas,
              enfocadas en generar impacto real y valor constante.
            </Typography>
          </motion.div>

          {/* BOTONES (NO TOCADOS) */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              startIcon={<DescriptionIcon />}
              href="/Jorge.CV.pdf"
              target="_blank"
              sx={{ borderRadius: "25px" }}
            >
              Ver CV
            </Button>

            <Button
              variant="contained"
              startIcon={<WorkspacePremiumIcon />}
              href="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1759022233/image_b835ddca-c010-4f78-a300-676248ea3fd120250927_201635_cizk17.jpg"
              target="_blank"
              sx={{ borderRadius: "25px" }}
            >
              Ver Título
            </Button>

            <Button
              variant="contained"
              startIcon={<SmartToyIcon />}
              onClick={() => window.openSashaChat?.()}
              sx={{ borderRadius: "25px" }}
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
              }}
            >
              {mode === "light" ? <Brightness4 /> : <Brightness7 />}
            </Button>
          </Box>
        </Box>
      </Box>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
}
