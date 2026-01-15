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
      y: 16,
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
      id="form"
      sx={{
        py: { xs: 4, md: 7 },
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle at top, rgba(59,130,246,0.12), transparent 70%)"
              : "radial-gradient(circle at top, rgba(37,99,235,0.08), transparent 70%)",
          zIndex: 0,
        },
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeCinematic}
        >
          {/* ================= TITULO ================= */}
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
            Envíame un mensaje directo
          </Typography>

          <Typography
            textAlign="center"
            sx={{
              mb: 4,
              color: "text.secondary",
              fontStyle: "italic",
            }}
          >
            Ponte en contacto conmigo a través de este formulario
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
                boxShadow: `0 6px 18px ${theme.palette.primary.main}55`,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 10px 26px ${theme.palette.primary.main}77`,
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
          sx={{
            top: "50% !important",
            transform: "translateY(-50%)",
          }}
        >
          <Alert
            severity="success"
            icon={false}
            sx={{
              px: 4,
              py: 2,
              borderRadius: "18px",
              fontSize: "1.05rem",
              fontWeight: 600,
              textAlign: "center",
              color:
                theme.palette.mode === "dark" ? "#e5e7eb" : "#eff6ff",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(2,6,23,0.96), rgba(15,23,42,0.96))"
                  : "linear-gradient(135deg, rgba(37,99,235,0.95), rgba(96,165,250,0.95))",
              backdropFilter: "blur(14px)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 12px 28px rgba(0,0,0,0.65)"
                  : "0 12px 28px rgba(37,99,235,0.45)",
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(255,255,255,0.35)",
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
    borderRadius: 3,
    background:
      theme.palette.mode === "dark"
        ? "rgba(2,6,23,0.75)"
        : "rgba(255,255,255,0.85)",
    backdropFilter: "blur(14px)",
    color: theme.palette.text.primary,

    "& input, & textarea": {
      color: theme.palette.text.primary,
      fontWeight: 500,
    },

    "& input::placeholder, & textarea::placeholder": {
      color:
        theme.palette.mode === "dark"
          ? "rgba(226,232,240,0.6)"
          : "rgba(55,65,81,0.55)",
      opacity: 1,
    },

    "& fieldset": {
      borderColor:
        theme.palette.mode === "dark"
          ? "rgba(148,163,184,0.35)"
          : "rgba(37,99,235,0.35)",
    },

    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },

    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}33`,
    },
  },

  "& .MuiInputLabel-root": {
    color:
      theme.palette.mode === "dark"
        ? "rgba(226,232,240,0.7)"
        : "rgba(55,65,81,0.7)",
    fontWeight: 500,
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.main,
  },
});
