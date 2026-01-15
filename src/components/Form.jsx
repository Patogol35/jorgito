import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Snackbar,
  Alert,
  InputAdornment,
  Paper,
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

  /* ========== MISMA CINEMÁTICA DEL HERO ========== */
  const easeOutExpo = [0.16, 1, 0.3, 1];

  const fadeCinematic = {
    hidden: {
      opacity: 0,
      y: 18,
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

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.3,
      },
    },
  };

  /* ========== SUBMIT ========== */
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
    <Box id="form" sx={{ py: { xs: 5, md: 9 } }}>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: "28px",
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(180deg, rgba(2,6,23,0.94), rgba(15,23,42,0.94))"
                : "linear-gradient(180deg, rgba(255,255,255,0.94), rgba(239,246,255,0.94))",
            backdropFilter: "blur(20px)",
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.08)",
            boxShadow: `0 0 28px ${theme.palette.primary.main}22`,
          }}
        >
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* ===== TÍTULO ===== */}
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
                Envíame un mensaje directo
              </Typography>
            </motion.div>

            <motion.div variants={fadeCinematic}>
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
            </motion.div>

            {/* ===== FORM ===== */}
            <Box
              component="form"
              ref={formRef}
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
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
                        <PersonIcon
                          sx={{ color: theme.palette.primary.main, opacity: 0.75 }}
                        />
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
                        <EmailIcon
                          sx={{ color: theme.palette.primary.main, opacity: 0.75 }}
                        />
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
                        <MessageIcon
                          sx={{ color: theme.palette.primary.main, opacity: 0.75 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyle(theme)}
                />
              </motion.div>

              {/* ===== BOTÓN CENTRADO CORRECTAMENTE ===== */}
              <motion.div variants={fadeCinematic}>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    type="submit"
                    endIcon={<SendIcon />}
                    sx={{
                      px: 6,
                      py: 1.6,
                      borderRadius: "999px",
                      fontWeight: 700,
                      textTransform: "none",
                      color: "#fff",
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                      boxShadow: `0 8px 22px ${theme.palette.primary.main}55`,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 12px 30px ${theme.palette.primary.main}77`,
                      },
                      transition: "all 0.25s ease",
                    }}
                  >
                    Enviar mensaje
                  </Button>
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </Paper>

        {/* ===== ALERT ===== */}
        <Snackbar
          open={success}
          autoHideDuration={3500}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" icon={false}>
            Mensaje enviado correctamente 🚀
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

/* ========== INPUT PREMIUM (ELEGANTE) ========== */
const inputStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 16,
    background:
      theme.palette.mode === "dark"
        ? "rgba(15,23,42,0.45)"
        : "rgba(255,255,255,0.85)",
    backdropFilter: "blur(16px)",
    transition: "all 0.25s ease",
    "& fieldset": {
      borderColor: "rgba(96,165,250,0.25)",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 18px ${theme.palette.primary.main}44`,
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.main,
  },
});
