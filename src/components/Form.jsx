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

export default function Form() {
  const theme = useTheme();
  const formRef = useRef(null);
  const [success, setSuccess] = useState(false);

  /* ================= ANIMACIÓN ================= */
  const easeOutExpo = [0.16, 1, 0.3, 1];

  const fadeCinematic = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
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
      id="form"
      sx={{
        py: { xs: 4, md: 7 },
        position: "relative",
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeCinematic}
        >
          {/* ================= TITULO ================= */}
          <Typography
            variant="h3"
            fontWeight={900}
            textAlign="center"
            sx={{
              mb: 1,
              fontSize: { xs: "2.1rem", sm: "2.4rem" },
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(90deg, #60a5fa, #a78bfa)"
                  : "linear-gradient(90deg, #1e3a8a, #2563eb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Envíame un mensaje
          </Typography>

          <Typography
            textAlign="center"
            sx={{
              mb: 4,
              fontSize: "0.95rem",
              color:
                theme.palette.mode === "dark"
                  ? "rgba(226,232,240,0.75)"
                  : "rgba(51,65,85,0.75)",
            }}
          >
            Respondo rápido y de forma directa
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
              p: 3,
              borderRadius: "26px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(180deg, rgba(2,6,23,0.85), rgba(15,23,42,0.85))"
                  : "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(248,250,252,0.85))",
              backdropFilter: "blur(18px)",
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(15,23,42,0.08)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 30px 60px rgba(0,0,0,0.55)"
                  : "0 30px 60px rgba(37,99,235,0.18)",
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
                    <PersonIcon color="primary" />
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
                    <EmailIcon color="primary" />
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
                    <MessageIcon color="primary" />
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
                mt: 2,
                alignSelf: "center",
                px: 6,
                py: 1.6,
                borderRadius: "999px",
                fontWeight: 800,
                letterSpacing: "0.3px",
                textTransform: "none",
                color: "#fff",
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(90deg, #3b82f6, #6366f1)"
                    : "linear-gradient(90deg, #2563eb, #1e40af)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 12px 32px rgba(59,130,246,0.45)"
                    : "0 12px 32px rgba(37,99,235,0.35)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 18px 40px rgba(59,130,246,0.6)"
                      : "0 18px 40px rgba(37,99,235,0.5)",
                },
                transition: "all 0.25s ease",
              }}
            >
              Enviar mensaje
            </Button>
          </Box>
        </motion.div>

        {/* ================= ALERT ================= */}
        <Snackbar
          open={success}
          autoHideDuration={3500}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="success"
            icon={false}
            sx={{
              px: 4,
              py: 2,
              borderRadius: "18px",
              fontWeight: 600,
              color: "#fff",
              background:
                "linear-gradient(135deg, #2563eb, #60a5fa)",
              boxShadow: "0 18px 40px rgba(37,99,235,0.45)",
            }}
          >
            Mensaje enviado correctamente 🚀
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

/* ================= INPUT STYLE ================= */
const inputStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    background:
      theme.palette.mode === "dark"
        ? "rgba(15,23,42,0.55)"
        : "rgba(255,255,255,0.75)",
    backdropFilter: "blur(12px)",
    "& fieldset": {
      borderColor:
        theme.palette.mode === "dark"
          ? "rgba(148,163,184,0.25)"
          : "rgba(15,23,42,0.2)",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}22`,
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
});
