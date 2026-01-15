import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Snackbar,
  Alert,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";
import { useTheme } from "@mui/material/styles";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Form() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primaryColor = theme.palette.primary.main;

  const formRef = useRef(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_fd9ejbr",
        "template_pwsn0sn",
        formRef.current,
        "Try7tc29-wnfxyPyf"
      )
      .then(() => {
        setSuccess(true);
        setLoading(false);
        formRef.current.reset();
      })
      .catch(() => {
        setLoading(false);
        alert("Error al enviar el mensaje");
      });
  };

  return (
    <Box id="form" sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="sm">
        {/* ================= BADGE ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "1.5rem" }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 3,
              py: 1,
              borderRadius: "999px",
              background: isDark
                ? "rgba(96,165,250,0.08)"
                : "rgba(25,118,210,0.08)",
              border: `1px solid ${
                isDark
                  ? "rgba(96,165,250,0.25)"
                  : "rgba(25,118,210,0.25)"
              }`,
              backdropFilter: "blur(10px)",
            }}
          >
            <ContactMailIcon sx={{ fontSize: 22, color: primaryColor }} />
            <Typography sx={{ fontWeight: 700, color: primaryColor }}>
              Contacto por Email
            </Typography>
          </Box>
        </motion.div>

        {/* ================= TEXTO ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Typography
            textAlign="center"
            sx={{
              mb: 5,
              maxWidth: 420,
              mx: "auto",
              color: "text.secondary",
              fontStyle: "italic",
              opacity: 0.9,
            }}
          >
            Ponte en contacto conmigo. Respondo normalmente en menos de 24 horas.
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
          {[
            {
              name: "from_name",
              label: "Nombre",
              icon: <PersonIcon />,
            },
            {
              name: "from_email",
              label: "Correo electrónico",
              type: "email",
              icon: <EmailIcon />,
            },
            {
              name: "message",
              label: "Mensaje",
              multiline: true,
              rows: 4,
              icon: <MessageIcon />,
            },
          ].map((field, i) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
            >
              <TextField
                {...field}
                fullWidth
                required
                placeholder={`Escribe tu ${field.label.toLowerCase()}`}
                InputLabelProps={{
                  sx: {
                    fontSize: "0.85rem",
                    color: "text.secondary",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={
                        field.multiline
                          ? { alignSelf: "flex-start", mt: 1 }
                          : {}
                      }
                    >
                      {field.icon}
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle(theme)}
              />
            </motion.div>
          ))}

          {/* ================= BOTÓN ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              type="submit"
              disabled={loading}
              endIcon={
                loading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <SendIcon />
                )
              }
              sx={{
                mt: 4,
                px: 7,
                py: 1.7,
                borderRadius: "999px",
                fontWeight: 700,
                textTransform: "none",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
                background: `linear-gradient(90deg, ${primaryColor}, #3b82f6)`,
                boxShadow: `0 10px 30px ${primaryColor}55`,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 16px 40px ${primaryColor}77`,
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: -2,
                  borderRadius: "999px",
                  background: `linear-gradient(90deg, transparent, ${primaryColor}55, transparent)`,
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                },
                "&:hover::after": {
                  opacity: 1,
                },
                transition: "all 0.25s ease",
              }}
            >
              {loading ? "Enviando..." : "Enviar mensaje"}
            </Button>
          </motion.div>
        </Box>

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
              borderRadius: 3,
              fontWeight: 600,
              textAlign: "center",
              fontSize: "0.95rem",
              color: isDark ? "#dcfce7" : "#14532d",
              background: isDark
                ? "linear-gradient(135deg, #064e3b, #022c22)"
                : "linear-gradient(135deg, #dcfce7, #bbf7d0)",
              boxShadow: isDark
                ? "0 20px 40px rgba(0,0,0,0.6)"
                : "0 20px 40px rgba(22,163,74,0.35)",
            }}
          >
            <strong>¡Mensaje enviado con éxito!</strong>
            <br />
            Me pondré en contacto contigo pronto 🚀
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

const inputStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 16,
    background:
      theme.palette.mode === "dark"
        ? "rgba(15,23,42,0.55)"
        : "rgba(255,255,255,0.75)",
    backdropFilter: "blur(16px)",
    transition: "all 0.25s ease",

    "& fieldset": {
      borderColor: "rgba(96,165,250,0.35)",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused": {
      transform: "scale(1.01)",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 18px ${theme.palette.primary.main}55`,
    },
  },
});
