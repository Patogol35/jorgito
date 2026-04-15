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

  const [open, setOpen] = useState(false); // título
  const [openCV, setOpenCV] = useState(false); // CV

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
          initial={{ opacity: 0, rotateY: -140, scale: 0.92 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          transition={{ duration: 1.8, ease: easeOutExpo }}
          style={{
            borderRadius: "50%",
            transformStyle: "preserve-3d",
            perspective: 1200,
            willChange: "transform",
          }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
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
                  width: { xs: 130, sm: 170, md: 200 },
                  height: { xs: 130, sm: 170, md: 200 },
                  border: `3px solid ${theme.palette.primary.main}`,
                  boxShadow: `0 0 10px ${theme.palette.primary.main}66`,
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* TEXTO */}
        <Box textAlign={{ xs: "center", sm: "left" }} maxWidth="600px">
          <motion.div variants={textContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeCinematic}>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: { xs: "1.9rem", md: "2.6rem" },
                }}
              >
                {t.hero.title}
              </Typography>
            </motion.div>

            <Typography variant="h6" sx={{ fontStyle: "italic" }}>
              {t.hero.subtitle}
            </Typography>

            <Typography sx={{ mt: 3, mb: 5 }}>
              {t.hero.description}
            </Typography>
          </motion.div>

          {/* BOTONES */}
          <motion.div variants={buttonsContainer} initial="hidden" animate="visible">
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                startIcon={<DescriptionIcon />}
                onClick={() => setOpenCV(true)}
              >
                {t.hero.buttons.cv}
              </Button>

              <Button
                variant="contained"
                startIcon={<WorkspacePremiumIcon />}
                onClick={() => setOpen(true)}
              >
                {t.hero.buttons.title}
              </Button>

              <Button
                variant="contained"
                startIcon={<SmartToyIcon />}
                onClick={() => window.openSashaChat?.()}
              >
                {t.hero.buttons.ai}
              </Button>

              <IconButton onClick={() => setMode(mode === "light" ? "dark" : "light")}>
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Box>
          </motion.div>
        </Box>
      </Box>

      {/* MODAL TÍTULO */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          backgroundColor: "rgba(0,0,0,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ position: "relative", width: "70%" }}>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 10,
              color: "#fff",
            }}
          >
            <Close />
          </IconButton>

          <Box
            component="img"
            src="https://raw.githubusercontent.com/Patogol35/jorgito/master/public/T%C3%ADtulo-Jorge.jpg"
            sx={{ width: "100%", borderRadius: 2 }}
          />
        </Box>
      </Modal>

      {/* MODAL CV */}
      <Modal
        open={openCV}
        onClose={() => setOpenCV(false)}
        sx={{
          backgroundColor: "rgba(0,0,0,0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ position: "relative", width: "80%", height: "90vh" }}>
          <IconButton
            onClick={() => setOpenCV(false)}
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 10,
              color: "#fff",
            }}
          >
            <Close />
          </IconButton>

          <Box
            component="iframe"
            src="/Jorge.CV.pdf"
            sx={{
              width: "100%",
              height: "100%",
              border: "none",
              background: "#fff",
              borderRadius: 2,
            }}
          />
        </Box>
      </Modal>
    </>
  );
              }
