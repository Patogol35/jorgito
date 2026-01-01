import { Toolbar, Box, Typography, Button, Avatar } from "@mui/material";
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
          pb: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 4, md: 8 },
          color: theme.palette.text.primary,
        }}
      >
        {/* Avatar */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.03 }}
          style={{ borderRadius: "50%" }}
        >
          <Avatar
            alt="Jorge Patricio"
            src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
            sx={{
              width: { xs: 130, sm: 170, md: 200 },
              height: { xs: 130, sm: 170, md: 200 },
              border: `4px solid ${theme.palette.primary.main}`,
              boxShadow: isDark
                ? "0 12px 30px rgba(0,0,0,.45)"
                : "0 10px 25px rgba(0,0,0,.15)",
              transition: "transform .3s ease",
            }}
          />
        </motion.div>

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box
            textAlign={{ xs: "center", sm: "left" }}
            maxWidth="600px"
            mx="auto"
          >
            <Typography
              fontWeight={800}
              gutterBottom
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: "2rem", sm: "2.4rem", md: "2.7rem" },
                lineHeight: 1.2,
              }}
            >
              Hola, soy Jorge Patricio Santamaría Cherrez
            </Typography>

            <Typography
              sx={{
                fontSize: "1.05rem",
                fontWeight: 500,
                color: "text.secondary",
                mb: 2,
              }}
            >
              🎓 Máster en Ingeniería de Software y Sistemas Informáticos
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.05rem" },
                lineHeight: 1.9,
                letterSpacing: "0.2px",
                opacity: isDark ? 0.88 : 0.92,
                maxWidth: "520px",
                mt: 3,
                mb: 4.5,
              }}
            >
              Me apasiona crear tecnología que transforma ideas en realidades
              digitales. Desarrollo soluciones seguras, escalables e
              innovadoras, enfocadas en generar valor e impacto positivo.
            </Typography>

            {/* Botones */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: { xs: "center", sm: "flex-start" },
                flexWrap: "wrap",
                alignItems: "center",
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
                  sx={heroButton(theme)}
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
                sx={heroButton(theme)}
              >
                Sasha
              </Button>

              {/* Modo claro / oscuro */}
              <Button
                variant="outlined"
                onClick={() =>
                  setMode(mode === "light" ? "dark" : "light")
                }
                sx={{
                  minWidth: 48,
                  width: 48,
                  height: 48,
                  padding: 0,
                  borderRadius: "50%",
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  transition: "all .25s ease",
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

const heroButton = (theme) => ({
  borderRadius: "25px",
  textTransform: "none",
  fontWeight: 600,
  px: { xs: 3.5, md: 5 },
  py: 1.35,
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
  boxShadow: "none",
  transition: "transform .25s ease, box-shadow .25s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 22px rgba(0,0,0,.2)",
  },
});
