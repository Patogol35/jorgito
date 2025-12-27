import {
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
  Dialog,
  IconButton,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Brightness4, Brightness7, Close } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

export default function Hero({ mode, setMode }) {
  const theme = useTheme();
  const [openTitle, setOpenTitle] = useState(false);

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
          pb: { xs: 1.5, sm: 2.5, md: 3 },
          px: { xs: 2, sm: 4, md: 8 },
        }}
      >
        {/* Avatar */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Avatar
            alt="Jorge Patricio"
            src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
            sx={{
              width: { xs: 130, sm: 170, md: 200 },
              height: { xs: 130, sm: 170, md: 200 },
              border: `4px solid ${theme.palette.primary.main}`,
            }}
          />
        </motion.div>

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Box textAlign={{ xs: "center", sm: "left" }} maxWidth="600px">
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: "1.9rem", sm: "2.3rem", md: "2.6rem" },
              }}
            >
              Hola, soy Jorge Patricio Santamaría Cherrez
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              gutterBottom
              sx={{ fontStyle: "italic" }}
            >
              🎓 Máster en Ingeniería de Software y Sistemas Informáticos
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.08rem" },
                lineHeight: 1.9,
                maxWidth: "520px",
                mt: 3,
                mb: 5,
                opacity: theme.palette.mode === "dark" ? 0.85 : 0.9,
              }}
            >
              Me apasiona crear tecnología que transforma ideas en realidades
              digitales. Mi enfoque está en aportar valor constante,
              desarrollando soluciones seguras e innovadoras.
            </Typography>

            {/* Botones */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              <Button
                variant="contained"
                startIcon={<DescriptionIcon />}
                href="/Jorge.CV.pdf"
                target="_blank"
                sx={{ borderRadius: "25px", fontWeight: "bold" }}
              >
                Ver CV
              </Button>

              <Button
                variant="contained"
                startIcon={<WorkspacePremiumIcon />}
                onClick={() => setOpenTitle(true)}
                sx={{ borderRadius: "25px", fontWeight: "bold" }}
              >
                Ver Título
              </Button>

              <Button
                variant="contained"
                startIcon={<SmartToyIcon />}
                onClick={() => window.openSashaChat?.()}
                sx={{ borderRadius: "25px", fontWeight: "bold" }}
              >
                Sasha
              </Button>

              <Button
                variant="outlined"
                startIcon={mode === "light" ? <Brightness4 /> : <Brightness7 />}
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
                sx={{ borderRadius: "25px", fontWeight: "bold" }}
              >
                {mode === "light" ? "Modo Noche" : "Modo Día"}
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Box>

      {/* Modal Título — versión BONITA */}
      <Dialog
        open={openTitle}
        onClose={() => setOpenTitle(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: theme.palette.background.paper,
          },
        }}
      >
        <Box sx={{ position: "relative", p: 2 }}>
          <IconButton
            onClick={() => setOpenTitle(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <Close />
          </IconButton>

          <Box
            component="img"
            src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1759022233/image_b835ddca-c010-4f78-a300-676248ea3fd120250927_201635_cizk17.jpg"
            alt="Título de Máster"
            sx={{
              width: "100%",
              maxHeight: "70vh",
              objectFit: "contain",
              borderRadius: 2,
            }}
          />
        </Box>
      </Dialog>
    </>
  );
              }
