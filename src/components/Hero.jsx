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
import {
  Brightness4,
  Brightness7,
  Terminal,
  Api,
  Storage,
  Security,
  SupportAgent,
  Description,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

export default function Hero({ mode, setMode }) {
  const theme = useTheme();

  /* ================= ANIMACIONES ================= */
  const easeOutExpo = [0.16, 1, 0.3, 1];

  const fadeCinematic = {
    hidden: {
      opacity: 0,
      y: 16,
      clipPath: "inset(0 0 100% 0)",
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0 0 0% 0)",
      filter: "blur(0px)",
      transition: { duration: 1, ease: easeOutExpo },
    },
  };

  const textContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.6,
      },
    },
  };

  const buttonsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 1.3,
      },
    },
  };

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
          pt: { xs: 6, sm: 8, md: 10 },
          pb: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 4, md: 8 },
        }}
      >
        {/* ================= AVATAR ================= */}
        <motion.div
          initial={{ opacity: 0, rotateY: -180, scale: 0.9 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          transition={{ duration: 2.4, ease: [0.25, 0.9, 0.35, 1] }}
          style={{
            borderRadius: "50%",
            transformStyle: "preserve-3d",
            perspective: 1300,
          }}
        >
          <motion.div
            animate={{ y: [0, -12, 0], rotateX: [0, 1.2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 18px ${theme.palette.primary.main}55`,
                  `0 0 28px ${theme.palette.primary.main}88`,
                  `0 0 18px ${theme.palette.primary.main}55`,
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ borderRadius: "50%" }}
            >
              <Avatar
                alt="Jorge Patricio"
                src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1768080897/file_00000000abe471f8a911de56e6d3cb7f_e0quhw.png"
                sx={{
                  width: { xs: 130, sm: 170, md: 200 },
                  height: { xs: 130, sm: 170, md: 200 },
                  border: `3px solid ${theme.palette.primary.main}`,
                  boxShadow: `0 0 12px ${theme.palette.primary.main}66`,
                  backgroundColor: theme.palette.background.paper,
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ================= TEXTO ================= */}
        <Box
          textAlign={{ xs: "center", sm: "left" }}
          maxWidth="600px"
          mx="auto"
          zIndex={1}
        >
          <motion.div
            variants={textContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeCinematic}>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: { xs: "1.9rem", sm: "2.3rem", md: "2.6rem" },
                }}
              >
                Hola, soy Jorge Patricio Santamaría Cherrez
              </Typography>
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ fontStyle: "italic" }}
              >
                Ingeniero en Sistemas · Máster en Ingeniería de Software y Sistemas
                Informáticos
              </Typography>
            </motion.div>

            {/* ================= DESCRIPCIÓN ================= */}
            <motion.div variants={fadeCinematic}>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.08rem" },
                  lineHeight: 1.9,
                  letterSpacing: "0.3px",
                  color: theme.palette.text.primary,
                  opacity: theme.palette.mode === "dark" ? 0.85 : 0.9,
                  maxWidth: "520px",
                  mt: 3,
                }}
              >
                Me apasiona crear tecnología que transforma ideas en realidades
                digitales. Mi enfoque está en aportar valor constante,
                desarrollando soluciones digitales seguras, innovadoras y
                orientadas a generar un impacto positivo.
              </Typography>

              {/* ================= HERRAMIENTAS (OPCIÓN 3) ================= */}
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: "Desarrollo y sistemas",
                    icon: <Terminal fontSize="small" />,
                    items: "Linux",
                  },
                  {
                    title: "APIs y validación",
                    icon: <Api fontSize="small" />,
                    items: "Postman",
                  },
                  {
                    title: "Virtualización",
                    icon: <Storage fontSize="small" />,
                    items: "VirtualBox",
                  },
                  {
                    title: "Seguridad y red",
                    icon: <Security fontSize="small" />,
                    items: "NextDNS",
                  },
                  {
                    title: "Soporte remoto",
                    icon: <SupportAgent fontSize="small" />,
                    items: "AnyDesk",
                  },
                  {
                    title: "Productividad y documentación",
                    icon: <Description fontSize="small" />,
                    items: "Microsoft Office",
                  },
                ].map((tool, i) => (
                  <motion.div
                    key={tool.title}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 * i }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 1.2,
                        fontSize: "0.95rem",
                        color: theme.palette.text.secondary,
                      }}
                    >
                      <Box sx={{ color: theme.palette.primary.main }}>
                        {tool.icon}
                      </Box>
                      <strong>{tool.title}:</strong> {tool.items}
                    </Typography>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </motion.div>

          {/* ================= BOTONES ================= */}
          <motion.div
            variants={buttonsContainer}
            initial="hidden"
            animate="visible"
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: { xs: "center", sm: "flex-start" },
                flexWrap: "wrap",
                alignItems: "center",
                mt: 5,
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
                {
                  label: "Sasha",
                  icon: <SmartToyIcon />,
                  onClick: () => window.openSashaChat?.(),
                },
              ].map((btn, i) => (
                <motion.div key={i} variants={fadeCinematic}>
                  <Button
                    variant="contained"
                    startIcon={btn.icon}
                    href={btn.href}
                    onClick={btn.onClick}
                    target={btn.href ? "_blank" : undefined}
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
                    {btn.label}
                  </Button>
                </motion.div>
              ))}

              <motion.div variants={fadeCinematic}>
                <IconButton
                  onClick={() =>
                    setMode(mode === "light" ? "dark" : "light")
                  }
                  sx={{
                    color: theme.palette.primary.main,
                    "&:hover": {
                      background: "transparent",
                      transform: "scale(1.15)",
                    },
                  }}
                >
                  {mode === "light" ? (
                    <Brightness4 sx={{ fontSize: 28 }} />
                  ) : (
                    <Brightness7 sx={{ fontSize: 28 }} />
                  )}
                </IconButton>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </>
  );
}
