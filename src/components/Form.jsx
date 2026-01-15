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

  /* ================= ANIMACIÓN HERO ================= */
  const easeOutExpo = [0.16, 1, 0.3, 1];

  const fadeCinematic = {
    hidden: {
      opacity: 0,
      y: 24,
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
    <Box id="contact" sx={{ py: { xs: 8, md: 6 } }}>
      <Container maxWidth="sm">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeCinematic}
        >
          {/* ================= CARD ================= */}
          <Box
            sx={{
              backdropFilter: "blur(16px)",
              background:
                theme.palette.mode === "dark"
                  ? "rgba(15,23,42,0.65)"
                  : "rgba(255,255,255,0.75)",
              borderRadius: 5,
              p: { xs: 4, sm: 5 },
              border: "1px solid rgba(96,165,250,0.25)",
              boxShadow: `0 0 40px ${theme.palette.primary.main}22`,
            }}
          >
            {/* ================= TITULO ================= */}
            <Typography
              variant="h4"
              fontWeight={800}
              textAlign="center"
              sx={{ color: theme.palette.primary.main, mb: 1 }}
            >
              Conectemos
            </Typography>

            <Typography
              textAlign="center"
              sx={{ mb: 4, color: "text.secondary" }}
            >
              Estoy listo para escuchar tu idea
            </Typography>

            {/* ================= FORM ================= */}
            <Box
              component="form"
              ref={formRef}
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
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
                      <MessageIcon
                        sx={{ color: theme.palette.primary.main }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle(theme)}
              />

              {/* ================= BOTÓN ================= */}
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
                  boxShadow: `0 0 28px ${theme.palette.primary.main}88`,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 0 40px ${theme.palette.primary.main}`,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Enviar mensaje
              </Button>
            </Box>
          </Box>
        </motion.div>

        {/* ================= ALERT CENTRADO ================= */}
        <Snackbar
          open={success}
          autoHideDuration={4000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: "center", horizontal: "center" }}
        >
          <Alert severity="success" variant="filled">
            Mensaje enviado correctamente 🚀
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

/* ================= INPUT STYLE (TEXTOS VISIBLES) ================= */
const inputStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    background:
      theme.palette.mode === "dark"
        ? "rgba(15,23,42,0.5)"
        : "rgba(255,255,255,0.65)",
    color: theme.palette.text.primary,
    "& fieldset": {
      borderColor: "rgba(96,165,250,0.35)",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.main,
  },
});
