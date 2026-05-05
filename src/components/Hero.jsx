import {
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
import { useState, useEffect } from "react";

export default function Hero({ mode, setMode, t }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  // 🔥 FIX REAL: evita salto al rotar
  useEffect(() => {
    const handleResize = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("orientationchange", handleResize);
    return () => window.removeEventListener("orientationchange", handleResize);
  }, []);

  const easeOutExpo = [0.16, 1, 0.3, 1];

  const fadeCinematic = {
    hidden: {
      opacity: 0,
      y: 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: easeOutExpo },
    },
  };

  return (
    <>
      <Box
        id="hero"
        sx={{
          position: "relative",

          /* 🔥 CLAVE REAL */
          minHeight: "100dvh",

          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
            "@media (orientation: landscape)": "column",
          },

          alignItems: "center",
          justifyContent: "center",

          gap: { xs: 3, md: 8 },

          px: { xs: 2, sm: 4, md: 8 },

          /* 🔥 menos padding en horizontal */
          pt: {
            xs: 4,
            sm: 6,
            "@media (orientation: landscape)": 2,
          },

          pb: 2,

          overflow: "hidden",
        }}
      >
        {/* AVATAR */}
        <motion.div
          initial={{ opacity: 0, rotateY: -140, scale: 0.92 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Avatar
            alt="Jorge Patricio"
            src="https://i.imgur.com/jr3rjzu.jpg"
            sx={{
              width: { xs: 110, sm: 160, md: 200 },
              height: { xs: 110, sm: 160, md: 200 },
              border: `3px solid ${theme.palette.primary.main}`,
            }}
          />
        </motion.div>

        {/* TEXTO */}
        <Box textAlign={{ xs: "center", sm: "left" }} maxWidth="600px">
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fadeCinematic}>
              <Typography
                fontWeight="bold"
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: { xs: "1.6rem", sm: "2.3rem" },
                }}
              >
                {t.hero.title}
              </Typography>
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <Typography sx={{ mt: 1 }}>
                {t.hero.subtitle}
              </Typography>
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <Typography sx={{ mt: 2 }}>
                {t.hero.description}
              </Typography>
            </motion.div>
          </motion.div>

          {/* BOTONES */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 3,
              flexWrap: "wrap",
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <Button
              variant="contained"
              startIcon={<DescriptionIcon />}
              href="/Jorge.CV.pdf"
              target="_blank"
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
        </Box>
      </Box>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "fixed",
              top: 20,
              left: 20,
              color: "#fff",
            }}
          >
            <Close />
          </IconButton>

          <Box
            sx={{
              width: "90%",
              maxHeight: "90vh",
              margin: "auto",
              mt: 5,
            }}
          >
            <Box
              component="img"
              src="https://raw.githubusercontent.com/Patogol35/TrabajosUnir/main/T%C3%ADtulo-Jorge.jpg"
              sx={{
                width: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </>
      </Modal>
    </>
  );
}
