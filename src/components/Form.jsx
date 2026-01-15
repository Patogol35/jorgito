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
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const theme = useTheme();
  const formRef = useRef();
  const [success, setSuccess] = useState(false);

  /* ================= ANIMACIÓN CINEMÁTICA (MISMA DEL HERO) ================= */
  const easeOutExpo = [0.16, 1, 0.3, 1];

  const fadeCinematic = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(8px)",
      clipPath: "inset(0 0 100% 0)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: 1, ease: easeOutExpo },
    },
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_fd9ejbr",
        "template_pwsn0sn",
        formRef.current,
        "Try7tc29-wnfxyPyf"
      )
      .then(() => {
        setSuccess(true);
        formRef.current.reset();
      })
      .catch(() => alert("Error al enviar el mensaje"));
  };

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 6, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeCinematic}
        >
          {/* ================= TITULO HERO ================= */}
          <Typography
            variant="h3"
            fontWeight={800}
            textAlign="center"
            sx={{
              color: theme.palette.primary.main,
              mb: 1,
              fontSize: { xs: "2rem", sm: "2.4rem" },
            }}
          >
            Conectemos
          </Typography>

          <Typography
            textAlign="center"
            sx={{
              mb: 5,
              color: "text.secondary",
              fontStyle: "italic",
            }}
          >
            Estoy listo para escuchar tu idea
          </Typography>

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

            {/* ================= BOTÓN HERO ================= */}
            <Button
              type="submit"
              endIcon={<SendIcon />}
              sx={{
                mt: 4,
                alignSelf: "center",
                px: 6,
                py: 1.6,
                borderRadius: "999px",
                fontWeight: 700,
                textTransform: "none",
                color: "#fff",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                boxShadow: `0 0 30px ${theme.palette.primary.main}88`,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 0 45px ${theme.palette.primary.main}`,
                },
                transition: "all 0.3s ease",
              }}
            >
              Enviar mensaje
            </Button>
          </Box>
        </motion.div>

        {/* ================= ALERT ================= */}
        <Snackbar
          open={success}
          autoHideDuration={4000}
          onClose={() => setSuccess(false)}
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Alert severity="success" variant="filled">
            Mensaje enviado correctamente 🚀
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

/* ================= INPUT STYLE HERO ================= */
const inputStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    background:
      theme.palette.mode === "dark"
        ? "rgba(15,23,42,0.55)"
        : "rgba(255,255,255,0.7)",
    backdropFilter: "blur(14px)",
    color: theme.palette.text.primary,
    "& fieldset": {
      borderColor: "rgba(96,165,250,0.35)",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 14px ${theme.palette.primary.main}55`,
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.main,
  },
});
