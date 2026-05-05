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
import { Brightness4, Brightness7, Close } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

export default function Hero({ mode, setMode, t }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

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
      {/* 🔥 evita espacio raro */}
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

          gap: { xs: 3, md: 8 },

          /* 🔥 CLAVE: controla altura en horizontal */
          minHeight: {
            xs: "auto",
            sm: "calc(100vh - 64px)",
          },

          pt: { xs: 4, sm: 6, md: 10 },
          pb: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 4, md: 8 },
        }}
      >
        {/* AVATAR */}
        <motion.div
          initial={{ opacity: 0, rotateY: -140, scale: 0.92 }}
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
                boxShadow: [
                  `0 0 16px ${theme.palette.primary.main}55`,
                  `0 0 26px ${theme.palette.primary.main}88`,
                  `0 0 16px ${theme.palette.primary.main}55`,
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ borderRadius: "50%" }}
            >
              <Avatar
                alt="Jorge Patricio"
                src="https://i.imgur.com/jr3rjzu.jpg"
                imgProps={{
                  loading: "lazy",
                  decoding: "async",
                }}
                sx={{
                  width: { xs: 120, sm: 170, md: 200 },
                  height: { xs: 120, sm: 170, md: 200 },
                  border: `3px solid ${theme.palette.primary.main}`,
                  boxShadow: `0 0 10px ${theme.palette.primary.main}66`,
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
                  fontSize: { xs: "1.7rem", sm: "2.3rem", md: "2.6rem" },
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
                  fontSize: { xs: "0.95rem", sm: "1.05rem" },
                  lineHeight: 1.8,
                  color: theme.palette.text.primary,
                  mt: 2,
                  mb: 4,
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
                  onClick: () => setOpen(true),
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
                      px: 3,
                      py: 1.2,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                    }}
                  >
                    {btn.label}
                  </Button>
                </motion.div>
              ))}

              {/* MODO */}
              <motion.div variants={fadeCinematic}>
                <IconButton
                  onClick={() => setMode(mode === "light" ? "dark" : "light")}
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                >
                  {mode === "light" ? <Brightness4 /> : <Brightness7 />}
                </IconButton>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Box>

      {/* MODAL */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
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
            onClick={() => setOpen(false)}
            sx={{
              position: "fixed",
              top: 20,
              left: 20,
              zIndex: 3000,
              color: "#fff",
            }}
          >
            <Close />
          </IconButton>

          <Box
            sx={{
              width: { xs: "95%", md: "70%" },
              maxHeight: "90vh",
            }}
          >
            <Box
              component="img"
              src="https://raw.githubusercontent.com/Patogol35/TrabajosUnir/main/T%C3%ADtulo-Jorge.jpg"
              alt="certificado"
              sx={{
                width: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
              }}
            />
          </Box>
        </>
      </Modal>
    </>
  );
        }
