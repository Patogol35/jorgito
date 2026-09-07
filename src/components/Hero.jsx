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

export default function Hero({ mode, setMode, t }) {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [openTerminal, setOpenTerminal] = useState(false);

  // ==============================
  // TERMINAL
  // ==============================

  const openTerminalWithSound = () => {
    const audio = new Audio("/sounds/terminal.wav");

    audio.volume = 0.4;

    audio.play().catch(() => {});

    setOpenTerminal(true);
  };

  // ==============================
  // ANIMATIONS
  // ==============================

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

      transition: {
        duration: 0.9,
        ease: easeOutExpo,
      },
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

      {/* =====================================================
          HERO
      ====================================================== */}

      <Box
        id="hero"
        sx={{
          position: "relative",
          overflow: "hidden",

          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },

          alignItems: "center",
          justifyContent: "center",

          gap: {
            xs: 4,
            md: 8,
          },

          pt: {
            xs: 6,
            sm: 8,
            md: 10,
          },

          pb: {
            xs: 2,
            sm: 3,
          },

          px: {
            xs: 2,
            sm: 4,
            md: 8,
          },
        }}
      >
        {/* =====================================================
            AVATAR
        ====================================================== */}

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
          style={{
            borderRadius: "50%",
            transformStyle: "preserve-3d",
            perspective: 1200,
            willChange: "transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
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
            style={{
              willChange: "transform",
            }}
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
              style={{
                borderRadius: "50%",
              }}
            >
              <Avatar
                alt="Jorge Patricio"
                src="https://i.imgur.com/BgNNivP.jpeg"
                imgProps={{
                  loading: "lazy",
                  decoding: "async",
                }}
                sx={{
                  width: {
                    xs: 130,
                    sm: 170,
                    md: 200,
                  },

                  height: {
                    xs: 130,
                    sm: 170,
                    md: 200,
                  },

                  border: `3px solid ${theme.palette.primary.main}`,

                  backgroundColor:
                    theme.palette.background.paper,
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* =====================================================
            TEXTO
        ====================================================== */}

        <Box
          textAlign={{
            xs: "center",
            sm: "left",
          }}
          maxWidth="600px"
          mx="auto"
          zIndex={1}
        >
          <motion.div
            variants={textContainer}
            initial="hidden"
            animate="visible"
          >
            {/* =================================================
                NOMBRE PROFESIONAL
            ================================================== */}

            <motion.div variants={fadeCinematic}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                  mb: 1.5,
                }}
              >
                {/* Pequeño indicador superior */}

                <motion.div
                  initial={{
                    opacity: 0,
                    width: 0,
                  }}
                  animate={{
                    opacity: 1,
                    width: "45px",
                  }}
                  transition={{
                    delay: 0.5,
                    duration: 0.6,
                    ease: easeOutExpo,
                  }}
                  style={{
                    height: "3px",
                    marginBottom: "10px",
                    borderRadius: "10px",
                    background: theme.palette.primary.main,
                    boxShadow: `0 0 12px ${theme.palette.primary.main}88`,
                  }}
                />

                {/* Nombre */}

                <Typography
                  component={motion.h1}
                  initial={{
                    opacity: 0,
                    y: 20,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 1.2,
                    ease: easeOutExpo,
                  }}
                  sx={{
                    m: 0,

                    fontWeight: 900,

                    fontSize: {
                      xs: "2.5rem",
                      sm: "3.5rem",
                      md: "4.5rem",
                    },

                    lineHeight: 1,

                    letterSpacing: {
                      xs: "-1.5px",
                      md: "-3px",
                    },

                    background: `linear-gradient(
                      90deg,
                      ${theme.palette.primary.main},
                      #60a5fa,
                      ${theme.palette.primary.main}
                    )`,

                    backgroundSize: "200% auto",

                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",

                    animation:
                      "jorgeGradient 5s linear infinite",

                    textShadow: `0 0 30px ${theme.palette.primary.main}30`,

                    "@keyframes jorgeGradient": {
                      "0%": {
                        backgroundPosition: "0% center",
                      },

                      "100%": {
                        backgroundPosition: "200% center",
                      },
                    },
                  }}
                >
                  Jorge Patricio
                </Typography>

                {/* Línea inferior animada */}

                <motion.div
                  initial={{
                    width: 0,
                    opacity: 0,
                  }}
                  animate={{
                    width: "100%",
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.8,
                    duration: 0.8,
                    ease: easeOutExpo,
                  }}
                  style={{
                    height: "3px",
                    marginTop: "10px",
                    borderRadius: "10px",

                    background: `linear-gradient(
                      90deg,
                      ${theme.palette.primary.main},
                      #60a5fa,
                      transparent
                    )`,

                    boxShadow: `0 0 12px ${theme.palette.primary.main}88`,
                  }}
                />

                {/* Detalle de código */}

                <Typography
                  sx={{
                    mt: 1,

                    fontFamily:
                      '"Fira Code", "Roboto Mono", monospace',

                    fontSize: {
                      xs: "0.72rem",
                      sm: "0.8rem",
                    },

                    letterSpacing: "1.5px",

                    color:
                      theme.palette.text.secondary,

                    opacity: 0.75,

                    textAlign: {
                      xs: "center",
                      sm: "left",
                    },
                  }}
                >
                  &lt; software.engineer /&gt;
                </Typography>
              </Box>
            </motion.div>

            {/* =================================================
                SUBTÍTULO
            ================================================== */}

            <motion.div variants={fadeCinematic}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,

                  fontSize: {
                    xs: "1rem",
                    sm: "1.15rem",
                    md: "1.25rem",
                  },

                  mt: 1,
                }}
              >
                {t.hero.subtitle}
              </Typography>
            </motion.div>

            {/* =================================================
                DESCRIPCIÓN
            ================================================== */}

            <motion.div variants={fadeCinematic}>
              <Typography
                sx={{
                  fontWeight: 500,

                  fontSize: {
                    xs: "1rem",
                    sm: "1.08rem",
                  },

                  lineHeight: 1.9,

                  letterSpacing: "0.3px",

                  color:
                    theme.palette.text.primary,

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

          {/* =====================================================
              BOTONES
          ====================================================== */}

          <motion.div
            variants={buttonsContainer}
            initial="hidden"
            animate="visible"
          >
            <Box
              sx={{
                display: "flex",

                gap: 2,

                justifyContent: {
                  xs: "center",
                  sm: "flex-start",
                },

                flexWrap: "wrap",

                alignItems: "center",
              }}
            >
              {[
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
                  onClick: () =>
                    window.openSashaChat?.(),
                  text: false,
                },
              ].map((btn, i) => (
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
                    sx={{
                      minWidth: btn.text
                        ? "auto"
                        : 50,

                      width: btn.text
                        ? "auto"
                        : 50,

                      height: btn.text
                        ? "auto"
                        : 50,

                      borderRadius: btn.text
                        ? "25px"
                        : "50%",

                      textTransform: "none",

                      fontWeight: "bold",

                      px: btn.text
                        ? 4
                        : 0,

                      py: btn.text
                        ? 1.4
                        : 0,

                      background: `linear-gradient(
                        90deg,
                        ${theme.palette.primary.main},
                        #3b82f6
                      )`,

                      boxShadow: "none",

                      transition:
                        "all 0.3s ease",

                      "&:hover": {
                        transform:
                          "translateY(-3px)",

                        boxShadow: `0 8px 25px ${theme.palette.primary.main}44`,

                        background: `linear-gradient(
                          90deg,
                          #3b82f6,
                          ${theme.palette.primary.main}
                        )`,
                      },

                      ...(btn.text
                        ? {}
                        : {
                            "& .MuiButton-startIcon":
                              {
                                margin: 0,
                              },
                          }),
                    }}
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

      {/* =====================================================
          MODAL DEL TÍTULO
      ====================================================== */}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          zIndex: 2000,

          backgroundColor:
            "rgba(0,0,0,0.85)",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",
        }}
      >
        <>
          {/* Botón cerrar */}

          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "fixed",

              top: 20,
              left: 20,

              zIndex: 3000,

              background:
                "rgba(0,0,0,0.6)",

              color: "#fff",

              backdropFilter:
                "blur(6px)",

              "&:hover": {
                background:
                  "rgba(0,0,0,0.8)",
              },
            }}
          >
            <Close />
          </IconButton>

          {/* Imagen */}

          <Box
            sx={{
              position: "relative",

              width: {
                xs: "95%",
                md: "70%",
              },

              maxHeight: "90vh",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src="https://raw.githubusercontent.com/Patogol35/TrabajosUnir/main/T%C3%ADtulo-Jorge.jpg"
              alt="Título de Jorge Patricio"
              loading="lazy"
              decoding="async"
              sx={{
                width: "100%",

                maxHeight: "90vh",

                objectFit: "contain",

                borderRadius: 2,

                display: "block",
              }}
            />
          </Box>
        </>
      </Modal>

      {/* =====================================================
          MODAL TERMINAL
      ====================================================== */}

      <Modal
        open={openTerminal}
        onClose={() => setOpenTerminal(false)}
        sx={{
          zIndex: 2000,

          backgroundColor:
            "rgba(0,0,0,0.95)",

          overflow: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",

            minHeight: "100dvh",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            p: {
              xs: 0,
              sm: 2,
            },

            boxSizing: "border-box",

            "@media (orientation: landscape) and (max-height: 600px)":
              {
                alignItems: "flex-start",

                justifyContent:
                  "flex-start",

                p: 0,
              },
          }}
        >
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
