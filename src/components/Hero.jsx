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
import { Brightness4, Brightness7, Close } from "@mui/icons-material";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

import LinuxTerminal from "../components/LinuxTerminal";

export default function Hero({ mode, setMode, t }) {
  const theme = useTheme();

  const [openTitle, setOpenTitle] = useState(false);
  const [openTerminal, setOpenTerminal] = useState(false);

  const easeOutExpo = [0.16, 1, 0.3, 1];

  const fadeCinematic = {
    hidden: { opacity: 0, y: 16, clipPath: "inset(0 0 100% 0)" },
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
      transition: { staggerChildren: 0.18, delayChildren: 0.5 },
    },
  };

  const buttonsContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 1.1 },
    },
  };

  // 🔊 sonido terminal
  const openTerminalWithSound = () => {
    const audio = new Audio("/sounds/terminal.mp3");
    audio.volume = 0.4;
    audio.play().catch(() => {});
    setOpenTerminal(true);
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
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* TEXTO */}
        <Box textAlign={{ xs: "center", sm: "left" }} maxWidth="600px">
          <motion.div variants={textContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeCinematic}>
              <Typography variant="h3" fontWeight="bold" gutterBottom color="primary">
                {t.hero.title}
              </Typography>
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <Typography variant="h6" sx={{ fontStyle: "italic" }}>
                {t.hero.subtitle}
              </Typography>
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <Typography sx={{ mt: 3, mb: 5, whiteSpace: "pre-line" }}>
                {t.hero.description}
              </Typography>
            </motion.div>
          </motion.div>

          {/* BOTONES */}
          <motion.div variants={buttonsContainer} initial="hidden" animate="visible">
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
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
                  onClick: openTerminalWithSound,
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
                    sx={{ borderRadius: "25px", textTransform: "none" }}
                  >
                    {btn.label}
                  </Button>
                </motion.div>
              ))}

              {/* 🌙 modo */}
              <IconButton onClick={() => setMode(mode === "light" ? "dark" : "light")}>
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Box>
          </motion.div>
        </Box>
      </Box>

      {/* MODAL TITULO */}
      <Modal open={openTitle} onClose={() => setOpenTitle(false)}>
        <>
          <IconButton onClick={() => setOpenTitle(false)}>
            <Close />
          </IconButton>
          <Box
            component="img"
            src="https://raw.githubusercontent.com/Patogol35/TrabajosUnir/main/T%C3%ADtulo-Jorge.jpg"
            sx={{ width: "100%" }}
          />
        </>
      </Modal>

      {/* 🚀 TERMINAL FULLSCREEN */}
      <AnimatePresence>
        {openTerminal && (
          <Modal
            open={openTerminal}
            onClose={() => setOpenTerminal(false)}
            sx={{
              zIndex: 3000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.95)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{ width: "100%", height: "100%" }}
            >
              {/* glow hacker */}
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background:
                    "radial-gradient(circle, rgba(0,255,120,0.08), transparent 70%)",
                }}
              />

              <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LinuxTerminal
                  t={t}
                  lang="es"
                  onClose={() => setOpenTerminal(false)}
                />
              </Box>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
        }
