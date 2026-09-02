import {
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Modal,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TerminalIcon from "@mui/icons-material/Terminal";
import { Close } from "@mui/icons-material";

import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

import LinuxTerminal from "../components/LinuxTerminal";

export default function Hero({ t }) {
  const theme = useTheme();

  // 👇 estados separados (no rompe nada)
  const [openTitle, setOpenTitle] = useState(false);
  const [openTerminal, setOpenTerminal] = useState(false);

  const easeOutExpo = [0.16, 1, 0.3, 1];

  const fadeCinematic = {
    hidden: {
      opacity: 0,
      y: 16,
      clipPath: "inset(0 0 100% 0)",
    },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: 0.9, ease: easeOutExpo },
    },
  };

  const textContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.5,
      },
    },
  };

  const buttonsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 1.1,
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
        {/* AVATAR */}
        <motion.div
          initial={{ opacity: 0, rotateY: -45, scale: 0.92 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          transition={{ duration: 1.8, ease: easeOutExpo }}
          style={{
            borderRadius: "50%",
            transformStyle: "preserve-3d",
            perspective: 1200,
          }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <motion.div
              animate={{
                filter: [
                  `drop-shadow(0 0 16px ${theme.palette.primary.main}55)`,
                  `drop-shadow(0 0 26px ${theme.palette.primary.main}88)`,
                  `drop-shadow(0 0 16px ${theme.palette.primary.main}55)`,
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Avatar
                alt="Jorge Patricio"
                src="https://i.imgur.com/BgNNivP.jpeg"
                sx={{
                  width: { xs: 130, sm: 170, md: 200 },
                  height: { xs: 130, sm: 170, md: 200 },
                  border: `3px solid ${theme.palette.primary.main}`,
                  backgroundColor: theme.palette.background.paper,
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* TEXTO */}
        <Box
          textAlign={{ xs: "center", sm: "left" }}
          maxWidth="600px"
          mx="auto"
          zIndex={1}
        >
          <motion.div variants={textContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeCinematic}>
              <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: { xs: "1.9rem", sm: "2.3rem", md: "2.6rem" },
                }}
              >
                {t.hero.title}
              </Typography>
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <Typography variant="h6" sx={{ fontStyle: "italic" }}>
                {t.hero.subtitle}
              </Typography>
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.08rem" },
                  lineHeight: 1.9,
                  letterSpacing: "0.3px",
                  color: theme.palette.text.primary,
                  maxWidth: "520px",
                  mt: 3,
                  mb: 5,
                  whiteSpace: "pre-line",
                }}
              >
                {t.hero.description}
              </Typography>
            </motion.div>
          </motion.div>

          {/* BOTONES */}
          <motion.div variants={buttonsContainer} initial="hidden" animate="visible">
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
                  label: t.hero.buttons.cv,
                  icon: <DescriptionIcon />,
                  href: "/Jorge.CV.pdf",
                },
                {
                  label: t.hero.buttons.title,
                  icon: <WorkspacePremiumIcon />,
                  onClick: () => setOpenTitle(true),
                },
                {
                  label: "Terminal",
                  icon: <TerminalIcon />,
                  onClick: () => setOpenTerminal(true),
                },
                {
                  label: t.hero.buttons.ai,
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
            </Box>
          </motion.div>
        </Box>
      </Box>

      {/* MODAL TITULO */}
      <Modal
        open={openTitle}
        onClose={() => setOpenTitle(false)}
        sx={{
          zIndex: 2000,
          backgroundColor: "rgba(0,0,0,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <>
          <IconButton
            onClick={() => setOpenTitle(false)}
            sx={{
              position: "fixed",
              top: 20,
              left: 20,
              zIndex: 3000,
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
            }}
          >
            <Close />
          </IconButton>

          <Box sx={{ width: { xs: "95%", md: "70%" } }}>
            <Box
              component="img"
              src="https://raw.githubusercontent.com/Patogol35/TrabajosUnir/main/T%C3%ADtulo-Jorge.jpg"
              sx={{ width: "100%", borderRadius: 2 }}
            />
          </Box>
        </>
      </Modal>

      {/* MODAL TERMINAL */}
      <Modal
        open={openTerminal}
        onClose={() => setOpenTerminal(false)}
        sx={{
          zIndex: 2000,
          backgroundColor: "rgba(0,0,0,0.95)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LinuxTerminal
          t={t}
          lang="es"
          onClose={() => setOpenTerminal(false)}
        />
      </Modal>
    </>
  );
            }
