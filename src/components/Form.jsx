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

  /* ================= HERO ENTRY (MISMO QUE HERO) ================= */
  const heroFadeUp = {
    hidden: {
      opacity: 0,
      y: 24,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
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
        py: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={heroFadeUp}
        >
          {/* ================= TITLE ================= */}
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight={800}
            sx={{
              mb: 1,
              fontSize: { xs: "2rem", sm: "2.4rem" },
              color: theme.palette.primary.main,
            }}
          >
            Contáctame
          </Typography>

          <Typography
            textAlign="center"
            sx={{
              mb: 4,
              color: "text.secondary",
            }}
          >
            Envíame un mensaje y te responderé pronto
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
                    <PersonIcon sx={{ color: "primary.main" }} />
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
                    <EmailIcon sx={{ color: "primary.main" }} />
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
                    <MessageIcon sx={{ color: "primary.main" }} />
                  </InputAdornment>
                ),
              }}
              sx={inputStyle(theme)}
            />

            {/* ================= BUTTON ================= */}
            <Button
              type="submit"
              endIcon={<SendIcon />}
              sx={{
                mt: 2,
                alignSelf: "center",
                px: 6,
                py: 1.5,
                borderRadius: "999px",
                fontWeight: 700,
                textTransform: "none",
                color: "#fff",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                boxShadow: `0 6px 16px ${theme.palette.primary.main}55`,
                "&:hover": {
                  boxShadow: `0 10px 26px ${theme.palette.primary.main}75`,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.25s ease",
              }}
            >
              Enviar mensaje
            </Button>
          </Box>
        </motion.div>

        {/* ================= SUCCESS ================= */}
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ borderRadius: 3 }}>
            Mensaje enviado correctamente 🚀
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

/* ================= INPUT STYLE (LIMPIO + HERO) ================= */
const inputStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    background:
      theme.palette.mode === "dark"
        ? "rgba(15,23,42,0.45)"
        : "rgba(255,255,255,0.75)",
    "& fieldset": {
      borderColor: "rgba(96,165,250,0.35)",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 12px ${theme.palette.primary.main}55`,
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.main,
  },
});
