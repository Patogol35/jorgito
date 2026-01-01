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

      {/* HERO */}
      <Box
        id="hero"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, md: 8 },
          pt: { xs: 6, sm: 8, md: 10 },
          pb: { xs: 3, md: 4 },
          px: { xs: 2, sm: 4, md: 8 },
          overflow: "hidden",

          /* Fondo con presencia */
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle at top, rgba(59,130,246,.15), transparent 55%)"
              : "radial-gradient(circle at top, rgba(59,130,246,.18), transparent 60%)",
        }}
      >
        {/* AVATAR */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ position: "relative" }}
        >
          {/* Halo */}
          <Box
            sx={{
              position: "absolute",
              inset: -12,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.palette.primary.main}33, transparent 65%)`,
              filter: "blur(14px)",
            }}
          />

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3.2, repeat: Infinity }}
          >
            <Avatar
              alt="Jorge Patricio"
              src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
              sx={{
                width: { xs: 130, sm: 170, md: 200 },
                height: { xs: 130, sm: 170, md: 200 },
                border: `4px solid ${theme.palette.primary.main}`,
                boxShadow: "0 25px 60px rgba(0,0,0,.35)",
                position: "relative",
                zIndex: 1,
              }}
            />
          </motion.div>
        </motion.div>

        {/* TEXTO */}
        <Box maxWidth="600px" textAlign={{ xs: "center", sm: "left" }}>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              fontWeight={700}
              gutterBottom
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: "1.9rem", sm: "2.3rem", md: "2.6rem" },
                letterSpacing: "-0.6px",
              }}
            >
              Hola, soy Jorge Patricio Santamaría Cherrez
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Typography
              variant="h6"
              sx={{
                fontStyle: "italic",
                color: theme.palette.text.secondary,
              }}
              gutterBottom
            >
              🎓 Máster en Ingeniería de Software y Sistemas Informáticos
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.08rem" },
                lineHeight: 1.9,
                maxWidth: "520px",
                mt: 3,
                mb: 5,
                color: theme.palette.text.primary,
                opacity: 0.9,
              }}
            >
              Me apasiona crear tecnología que transforma ideas en realidades
              digitales. Mi enfoque está en aportar valor constante,
              desarrollando soluciones seguras, innovadoras y con impacto real.
            </Typography>
          </motion.div>

          {/* BOTONES */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: { xs: "center", sm: "flex-start" },
              flexWrap: "wrap",
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
                href: "https://res.cloudinary.com/dqkwc0kf7/image/upload/v1759022233/image_b835ddca-c010-4f78-a300-676248ea3fd120250927_201635_cizk17.jpg",
              },
            ].map((btn) => (
              <Button
                key={btn.label}
                variant="contained"
                startIcon={btn.icon}
                href={btn.href}
                target="_blank"
                sx={{
                  borderRadius: "25px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: { xs: 3.5, md: 5 },
                  py: 1.4,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                  boxShadow: "0 10px 25px rgba(0,0,0,.25)",
                  transition: "all .25s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 16px 40px rgba(0,0,0,.35)",
                  },
                }}
              >
                {btn.label}
              </Button>
            ))}

            {/* SASHA */}
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
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                boxShadow: "0 10px 25px rgba(0,0,0,.25)",
                "&:hover": {
                  transform: "translateY(-3px)",
                },
              }}
            >
              Sasha
            </Button>

            {/* MODO */}
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
      </Box>
    </>
  );
}
