import { Toolbar, Box, Typography, Button, Avatar } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { Brightness4, Brightness7 } from "@mui/icons-material"; // Iconos de sol/luna
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

export default function Hero({ mode, setMode }) {
  const theme = useTheme();

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

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
          py: { xs: 6, sm: 8, md: 12 },
          px: { xs: 2, sm: 4, md: 8 },
          color: theme.palette.text.primary,
        }}
      >
        {/* Avatar con animación */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
          style={{ display: "inline-block", borderRadius: "50%" }}
        >
          <Avatar
            alt="Jorge Patricio Santamaría Cherrez"
            src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
            sx={{
              width: { xs: 130, sm: 170, md: 200 },
              height: { xs: 130, sm: 170, md: 200 },
              border: `4px solid ${theme.palette.primary.main}`,
              boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
              mb: { xs: 2, sm: 0 },
            }}
          />
        </motion.div>

        {/* Texto y botones */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign={{ xs: "center", sm: "left" }} maxWidth="600px" mx="auto">
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, #6d28d9)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.9rem", sm: "2.3rem", md: "2.6rem" },
              }}
            >
              Hola, soy Jorge Patricio Santamaría Cherrez
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              gutterBottom
              sx={{ fontStyle: "italic", fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" } }}
            >
              🎓 Máster en Ingeniería de Software y Sistemas Informáticos
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" }, lineHeight: 1.7 }}
            >
              Me apasiona crear tecnología que transforme ideas en realidades digitales. 
              Mi enfoque está en aportar valor constante, desarrollando soluciones digitales 
              seguras, innovadoras y orientadas a generar impacto positivo.
            </Typography>

            <Box display="flex" gap={2} flexWrap="wrap" justifyContent={{ xs: "center", sm: "flex-start" }}>
              <Button
                variant="contained"
                startIcon={<DescriptionIcon />}
                href="/Jorge.CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  mt: 3,
                  borderRadius: "25px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: { xs: 3.5, md: 5 },
                  py: 1.4,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, #6d28d9)`,
                  boxShadow: `0 6px 18px ${theme.palette.primary.main}55`,
                  transition: "all 0.3s ease",
                  "&:hover": { boxShadow: `0 8px 22px ${theme.palette.secondary.main}88`, transform: "translateY(-2px) scale(1.03)" },
                }}
              >
                Ver CV
              </Button>

              <Button
                variant="outlined"
                onClick={toggleMode}
                startIcon={mode === "light" ? <Brightness4 /> : <Brightness7 />}
                sx={{
                  mt: 3,
                  borderRadius: "25px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: { xs: 3.5, md: 5 },
                  py: 1.4,
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  "&:hover": { background: theme.palette.primary.main, color: "#fff", borderColor: theme.palette.primary.main },
                  transition: "all 0.3s ease",
                }}
              >
                {mode === "light" ? "Modo Oscuro" : "Modo Claro"}
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </>
  );
}
