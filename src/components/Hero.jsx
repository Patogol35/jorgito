import { Toolbar, Box, Typography, Button, Avatar } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function Hero({ mode, setMode }) {
  const theme = useTheme();

  return (
    <>
      <Toolbar />

      <Box
        id="hero"
        component={motion.section}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 5, md: 9 },
          pt: { xs: 7, sm: 9, md: 11 },
          pb: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 4, md: 8 },
          overflow: "hidden",
        }}
      >
        {/* Glow decorativo */}
        <Box
          sx={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.palette.primary.main}33, transparent 70%)`,
            filter: "blur(80px)",
            top: "-10%",
            left: { xs: "50%", sm: "15%" },
            transform: "translateX(-50%)",
            zIndex: 0,
          }}
        />

        {/* Avatar */}
        <motion.div
          variants={itemVariants}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ zIndex: 1 }}
        >
          <Avatar
            alt="Jorge Patricio"
            src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
            sx={{
              width: { xs: 140, sm: 180, md: 210 },
              height: { xs: 140, sm: 180, md: 210 },
              border: `4px solid ${theme.palette.primary.main}`,
              boxShadow: `0 0 35px ${theme.palette.primary.main}55`,
            }}
          />
        </motion.div>

        {/* Texto */}
        <Box
          component={motion.div}
          variants={containerVariants}
          sx={{ zIndex: 1, maxWidth: 620 }}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
              }}
            >
              Hola, soy Jorge Patricio Santamaría Cherrez
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h6"
              sx={{
                mt: 1,
                fontStyle: "italic",
                opacity: 0.85,
              }}
            >
              🎓 Máster en Ingeniería de Software y Sistemas Informáticos
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              sx={{
                mt: 3.5,
                mb: 4.5,
                lineHeight: 1.9,
                opacity: theme.palette.mode === "dark" ? 0.85 : 0.9,
              }}
            >
              Desarrollo soluciones digitales seguras, escalables e innovadoras,
              combinando ingeniería de software, arquitectura y pensamiento
              estratégico para generar impacto real.
            </Typography>
          </motion.div>

          {/* Botones */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              {[{
                label: "Ver CV",
                icon: <DescriptionIcon />,
                href: "/Jorge.CV.pdf",
              },{
                label: "Ver Título",
                icon: <WorkspacePremiumIcon />,
                href: "https://res.cloudinary.com/dqkwc0kf7/image/upload/v1759022233/image_b835ddca-c010-4f78-a300-676248ea3fd120250927_201635_cizk17.jpg",
              }].map((btn) => (
                <Button
                  key={btn.label}
                  component={motion.button}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  variant="contained"
                  startIcon={btn.icon}
                  href={btn.href}
                  target="_blank"
                  sx={{
                    borderRadius: 30,
                    px: 5,
                    py: 1.4,
                    textTransform: "none",
                    fontWeight: 700,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                  }}
                >
                  {btn.label}
                </Button>
              ))}

              <Button
                variant="outlined"
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
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
          </motion.div>
        </Box>
      </Box>
    </>
  );
          }
