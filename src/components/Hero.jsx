import {
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Stack,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TerminalIcon from "@mui/icons-material/Terminal";
import ApiIcon from "@mui/icons-material/Api";
import SecurityIcon from "@mui/icons-material/Security";
import StorageIcon from "@mui/icons-material/Storage";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

export default function Hero({ mode, setMode }) {
  const theme = useTheme();

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
          style={{ borderRadius: "50%", perspective: 1300 }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Avatar
              alt="Jorge Patricio"
              src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1768080897/file_00000000abe471f8a911de56e6d3cb7f_e0quhw.png"
              sx={{
                width: { xs: 130, sm: 170, md: 200 },
                height: { xs: 130, sm: 170, md: 200 },
                border: `3px solid ${theme.palette.primary.main}`,
                boxShadow: `0 0 22px ${theme.palette.primary.main}88`,
              }}
            />
          </motion.div>
        </motion.div>

        {/* ================= TEXTO ================= */}
        <Box textAlign={{ xs: "center", sm: "left" }} maxWidth="600px">
          <motion.div variants={textContainer} initial="hidden" animate="visible">
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
                sx={{ fontStyle: "italic", mt: 1 }}
              >
                Ingeniero en Sistemas · Máster en Ingeniería de Software
              </Typography>
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <Typography
                sx={{
                  mt: 3,
                  mb: 3,
                  lineHeight: 1.9,
                  opacity: theme.palette.mode === "dark" ? 0.85 : 0.9,
                }}
              >
                Desarrollo soluciones digitales{" "}
                <b>seguras, escalables e innovadoras</b>, transformando ideas en
                productos reales que generan <b>impacto y valor constante</b>.
              </Typography>
            </motion.div>

            {/* ================= ICONOS + NOMBRE ================= */}
            <motion.div variants={fadeCinematic}>
              <Stack
                direction="row"
                spacing={3}
                justifyContent={{ xs: "center", sm: "flex-start" }}
                flexWrap="wrap"
                sx={{ mb: 5 }}
              >
                {[
                  { icon: <TerminalIcon />, name: "Linux" },
                  { icon: <ApiIcon />, name: "Postman" },
                  { icon: <StorageIcon />, name: "VirtualBox" },
                  { icon: <SecurityIcon />, name: "NextDNS" },
                  { icon: <SupportAgentIcon />, name: "AnyDesk" },
                  { icon: <DescriptionOutlinedIcon />, name: "Office" },
                ].map((tech, i) => (
                  <Box
                    key={i}
                    sx={{
                      textAlign: "center",
                      minWidth: 70,
                      color: theme.palette.primary.main,
                      transition: "all 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-4px) scale(1.08)",
                        color: "#3b82f6",
                      },
                    }}
                  >
                    <Box sx={{ fontSize: 28 }}>{tech.icon}</Box>
                    <Typography
                      variant="caption"
                      sx={{ display: "block", mt: 0.5 }}
                    >
                      {tech.name}
                    </Typography>
                  </Box>
                ))}
              </Stack>
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
                    }}
                  >
                    {btn.label}
                  </Button>
                </motion.div>
              ))}

              <motion.div variants={fadeCinematic}>
                <IconButton
                  onClick={() => setMode(mode === "light" ? "dark" : "light")}
                  sx={{ color: theme.palette.primary.main }}
                >
                  {mode === "light" ? <Brightness4 /> : <Brightness7 />}
                </IconButton>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </>
  );
            }
