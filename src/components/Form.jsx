import { useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import { motion } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";
import { useTheme } from "@mui/material/styles";

/* =========================
ANIMACIONES (IGUAL AL HERO)
========================= */
const fadeCinematic = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const textContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.5,
    },
  },
};

/* =========================
ESTILO INPUT (NO TOCAR)
========================= */
const inputStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: theme.palette.mode === "dark" ? "#0f172a" : "#f8fafc",
    transition: "all 0.25s ease",
    "& fieldset": {
      borderColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.15)"
          : "rgba(0,0,0,0.15)",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
    },
  },
});

/* =========================
COMPONENTE
========================= */
export default function Contact() {
  const theme = useTheme();
  const formRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    formRef.current.reset();
  };

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, #020617, #020617)"
            : "linear-gradient(180deg, #ffffff, #f8fafc)",
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          variants={textContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* ================= TITULO ================= */}
          <motion.div variants={fadeCinematic}>
            <Typography
              variant="h3"
              fontWeight={800}
              textAlign="center"
              sx={{
                color: theme.palette.primary.main,
                mb: 1,
                fontSize: { xs: "2rem", sm: "2.3rem" },
              }}
            >
              Envíame un mensaje
            </Typography>
          </motion.div>

          <motion.div variants={fadeCinematic}>
            <Typography
              textAlign="center"
              sx={{
                mb: 5,
                color: "text.secondary",
                fontStyle: "italic",
              }}
            >
              Ponte en contacto conmigo a través de este formulario
            </Typography>
          </motion.div>

          {/* ================= FORM ================= */}
          <Box
            component="form"
            ref={formRef}
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <motion.div variants={fadeCinematic}>
              <TextField
                name="from_name"
                label="Nombre"
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: theme.palette.primary.main }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle(theme)}
              />
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <TextField
                name="from_email"
                label="Correo electrónico"
                type="email"
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: theme.palette.primary.main }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle(theme)}
              />
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <TextField
                name="message"
                label="Mensaje"
                multiline
                rows={4}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", mt: 1 }}
                    >
                      <MessageIcon sx={{ color: theme.palette.primary.main }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle(theme)}
              />
            </motion.div>

            {/* ================= BOTÓN ================= */}
            <motion.div variants={fadeCinematic}>
              <Button
                type="submit"
                endIcon={<SendIcon />}
                sx={{
                  mt: 3,
                  alignSelf: "center",
                  px: 6,
                  py: 1.6,
                  borderRadius: "999px",
                  fontWeight: 700,
                  textTransform: "none",
                  color: "#fff",
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                  boxShadow: `0 6px 18px ${theme.palette.primary.main}55`,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 10px 26px ${theme.palette.primary.main}77`,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                  },
                  transition: "all 0.25s ease",
                }}
              >
                Enviar mensaje
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>

      {/* ================= ALERTA ================= */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Mensaje enviado correctamente 🚀
        </Alert>
      </Snackbar>
    </Box>
  );
}
