import { Toolbar, Box, Typography, Button, Avatar, useTheme } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function Hero({ mode, setMode }) {
  const theme = useTheme();

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
        {/* Animated Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Avatar
              alt="Jorge Patricio"
              src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
              sx={{
                width: { xs: 130, sm: 170, md: 200 },
                height: { xs: 130, sm: 170, md: 200 },
                border: `4px solid ${theme.palette.primary.main}`,
                boxShadow:
                  theme.palette.mode === "light"
                    ? "0 8px 20px rgba(0,0,0,0.12)"
                    : "0 4px 12px rgba(0,0,0,0.3)",
                transition: "box-shadow 0.3s ease",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Text and buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
              },
            },
          }}
          style={{ width: "100%" }}
        >
          <Box
            textAlign={{ xs: "center", sm: "left" }}
            maxWidth="600px"
            mx="auto"
          >
            <motion.div variants={{ hidden: {}, visible: {} }}>
              <Typography
                variant="h3"
                fontWeight={700}
                gutterBottom
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
                  lineHeight: 1.25,
                }}
              >
                Hola, soy Jorge Patricio Santamaría Cherrez
              </Typography>
            </motion.div>

            <motion.div variants={{ hidden: {}, visible: {} }}>
              <Typography
                variant="h6"
                color="text.secondary"
                gutterBottom
                sx={{
                  fontStyle: "italic",
                  fontWeight: 500,
                  opacity: 0.9,
                }}
              >
                🎓 Máster en Ingeniería de Software y Sistemas Informáticos
              </Typography>
            </motion.div>

            <motion.div variants={{ hidden: {}, visible: {} }}>
              <Typography
                sx={{
                  fontSize: { xs: "1.05rem", sm: "1.12rem" },
                  lineHeight: 1.85,
                  letterSpacing: "0.4px",
                  fontWeight: 400,
                  color: theme.palette.text.primary,
                  opacity: theme.palette.mode === "dark" ? 0.88 : 0.92,
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

            {/* Action buttons */}
            <motion.div
              variants={{ hidden: {}, visible: {} }}
              style={{ display: "flex", flexWrap: "wrap", gap: 16 }}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {/* CV Button */}
              <Button
                variant="contained"
                startIcon={<DescriptionIcon />}
                href="/Jorge.CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderRadius: "30px",
                  textTransform: "none",
                  fontWeight: 600,
                  px: { xs: 3.5, md: 5 },
                  py: 1.4,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, #2563eb)`,
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.35)",
                  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 16px rgba(59, 130, 246, 0.5)",
                  },
                }}
              >
                Ver CV
              </Button>

              {/* Title Button */}
              <Button
                variant="contained"
                startIcon={<WorkspacePremiumIcon />}
                href="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1759022233/image_b835ddca-c010-4f78-a300-676248ea3fd120250927_201635_cizk17.jpg"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderRadius: "30px",
                  textTransform: "none",
                  fontWeight: 600,
                  px: { xs: 3.5, md: 5 },
                  py: 1.4,
                  background: `linear-gradient(135deg, #2563eb, ${theme.palette.primary.main})`,
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.35)",
                  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 16px rgba(37, 99, 235, 0.5)",
                  },
                }}
              >
                Ver Título
              </Button>

              {/* Sasha Button */}
              <Button
                variant="contained"
                startIcon={<SmartToyIcon />}
                onClick={() => {
                  if (window.openSashaChat) window.openSashaChat();
                }}
                sx={{
                  borderRadius: "30px",
                  textTransform: "none",
                  fontWeight: 600,
                  px: { xs: 3.5, md: 5 },
                  py: 1.4,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, #2563eb)`,
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.35)",
                  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 16px rgba(59, 130, 246, 0.5)",
                  },
                }}
              >
                Sasha
              </Button>

              {/* Theme toggle */}
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
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: theme.palette.primary.main,
                    color: "#fff",
                    transform: "rotate(15deg)",
                  },
                }}
              >
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </>
  );
}
