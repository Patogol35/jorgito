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

import {
  easeOutExpo,
  fadeCinematic,
  textContainer,
  buttonsContainer,
  heroStyles,
} from "../Styles/heroStyles";

export default function Hero({ mode, setMode, t }) {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [openTerminal, setOpenTerminal] = useState(false);

  const openTerminalWithSound = () => {
    const audio = new Audio("/sounds/terminal.wav");

    audio.volume = 0.4;
    audio.play().catch(() => {});

    setOpenTerminal(true);
  };

  const buttons = [
    {
      label: t.hero.buttons.cv,
      icon: <DescriptionIcon />,
      href: "/Jorge.CV.pdf",
      text: true,
    },
    {
      label: t.hero.buttons.title,
      icon: <WorkspacePremiumIcon />,
      onClick: () => setOpen(true),
      text: true,
    },
    {
      label: "Terminal",
      icon: <TerminalIcon />,
      onClick: openTerminalWithSound,
      text: false,
    },
    {
      label: "Sasha",
      icon: <SmartToyIcon />,
      onClick: () => window.openSashaChat?.(),
      text: false,
    },
  ];

  return (
    <>
      <Toolbar />

      <Box
        id="hero"
        sx={heroStyles.section}
      >
        {/* AVATAR */}

        <motion.div
          initial={{
            opacity: 0,
            rotateY: -45,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            rotateY: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.8,
            ease: easeOutExpo,
          }}
          style={heroStyles.avatarWrapper}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={heroStyles.avatarFloating}
          >
            <motion.div
              animate={{
                filter: [
                  `drop-shadow(0 0 16px ${theme.palette.primary.main}55)`,
                  `drop-shadow(0 0 26px ${theme.palette.primary.main}88)`,
                  `drop-shadow(0 0 16px ${theme.palette.primary.main}55)`,
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              style={heroStyles.avatarGlow}
            >
              <Avatar
                alt="Jorge Patricio"
                src="https://i.imgur.com/BgNNivP.jpeg"
                imgProps={{
                  loading: "lazy",
                  decoding: "async",
                }}
                sx={heroStyles.avatar(theme)}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* TEXTO */}

        <Box sx={heroStyles.textContainer}>
          <motion.div
            variants={textContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeCinematic}>
              <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                sx={heroStyles.title(theme)}
              >
                {t.hero.title}
              </Typography>
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <Typography
                variant="h6"
                sx={heroStyles.subtitle}
              >
                {t.hero.subtitle}
              </Typography>
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <Typography
                sx={heroStyles.description(theme)}
              >
                {t.hero.description}
              </Typography>
            </motion.div>
          </motion.div>

          {/* BOTONES */}

          <motion.div
            variants={buttonsContainer}
            initial="hidden"
            animate="visible"
          >
            <Box sx={heroStyles.buttonsWrapper}>
              {buttons.map((btn, i) => (
                <motion.div
                  key={i}
                  variants={fadeCinematic}
                >
                  <Button
                    variant="contained"
                    startIcon={
                      btn.text
                        ? btn.icon
                        : undefined
                    }
                    href={btn.href}
                    onClick={btn.onClick}
                    target={
                      btn.href
                        ? "_blank"
                        : undefined
                    }
                    aria-label={btn.label}
                    sx={heroStyles.button(
                      btn,
                      theme
                    )}
                  >
                    {!btn.text && btn.icon}
                    {btn.text && btn.label}
                  </Button>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Box>
      </Box>

      {/* MODAL CERTIFICADO */}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={heroStyles.certificateModal}
      >
        <>
          <IconButton
            onClick={() => setOpen(false)}
            sx={heroStyles.modalCloseButton}
          >
            <Close />
          </IconButton>

          <Box sx={heroStyles.certificateContainer}>
            <Box
              component="img"
              src="https://raw.githubusercontent.com/Patogol35/TrabajosUnir/main/T%C3%ADtulo-Jorge.jpg"
              alt="certificado"
              loading="lazy"
              decoding="async"
              sx={heroStyles.certificateImage}
            />
          </Box>
        </>
      </Modal>

      {/* MODAL TERMINAL */}

      <Modal
        open={openTerminal}
        onClose={() => setOpenTerminal(false)}
        sx={heroStyles.terminalModal}
      >
        <Box sx={heroStyles.terminalContainer}>
          <LinuxTerminal
            t={t}
            lang="es"
            onClose={() =>
              setOpenTerminal(false)
            }
          />
        </Box>
      </Modal>
    </>
  );
}
