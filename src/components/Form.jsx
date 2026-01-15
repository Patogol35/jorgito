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
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useTheme } from "@mui/material/styles";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Form() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : theme.palette.primary.main;

  const formRef = useRef(null);
  const [success, setSuccess] = useState(false);

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
    <Box id="form" sx={{ py: { xs: 3, md: 6 } }}>
      <Container maxWidth="sm">
        {/* ================= TITULO (MISMO ESTILO QUE CERTIFICATIONS) ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              px: 3,
              py: 0.9,
              borderRadius: "999px",
              background: isDark
                ? "rgba(144,202,249,0.06)"
                : "rgba(25,118,210,0.06)",
              border: `1px solid ${
                isDark
                  ? "rgba(144,202,249,0.25)"
                  : "rgba(25,118,210,0.25)"
              }`,
              backdropFilter: "blur(6px)",
            }}
          >
            <WorkspacePremiumIcon
              sx={{ fontSize: 22, color: primaryColor }}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: primaryColor,
                lineHeight: 1,
              }}
            >
              Contacto
            </Typography>
          </Box>
        </motion.div>

        {/* ================= SUBTITULO ================= */}
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

          {/* ================= BOTÓN (INTOCABLE) ================= */}
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
        </Box>

        {/* ================= ALERT ================= */}
        <Snackbar
          open={success}
          autoHideDuration={3500}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ fontWeight: 600 }}>
            Mensaje enviado correctamente 🚀
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

/* ================= INPUT STYLE (SOLO CLARIDAD) ================= */
const inputStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    background:
      theme.palette.mode === "dark"
        ? "rgba(15,23,42,0.55)"
        : "rgba(255,255,255,0.7)",
    backdropFilter: "blur(14px)",
    color: theme.palette.text.primary,

    "& input, & textarea": {
      color: theme.palette.text.primary,
      fontWeight: 500,
    },

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
    color:
      theme.palette.mode === "dark"
        ? "rgba(226,232,240,0.75)"
        : theme.palette.text.secondary,
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.main,
  },
});
