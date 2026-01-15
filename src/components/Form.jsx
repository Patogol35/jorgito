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
import ContactMailIcon from "@mui/icons-material/ContactMail";
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
        {/* ================= TÍTULO ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
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
            <ContactMailIcon sx={{ fontSize: 22, color: primaryColor }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: primaryColor, lineHeight: 1 }}
            >
              Contacto por Email
            </Typography>
          </Box>
        </motion.div>

        {/* ================= SUBTÍTULO ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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

        {/* ================= FORM ================= */}
        <Box
          component="form"
          ref={formRef}
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {[
            {
              name: "from_name",
              label: "Nombre",
              icon: <PersonIcon sx={{ color: theme.palette.primary.main }} />,
            },
            {
              name: "from_email",
              label: "Correo electrónico",
              type: "email",
              icon: <EmailIcon sx={{ color: theme.palette.primary.main }} />,
            },
            {
              name: "message",
              label: "Mensaje",
              multiline: true,
              rows: 4,
              icon: <MessageIcon sx={{ color: theme.palette.primary.main }} />,
            },
          ].map((field, i) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TextField
                {...field}
                fullWidth
                required
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              type="submit"
              endIcon={<SendIcon />}
              sx={{
                mt: 3,
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
      color: theme.palette.mode === "dark" ? "#dcfce7" : "#14532d",
      background:
        theme.palette.mode === "dark"
          ? "linear-gradient(135deg, #064e3b, #022c22)"
          : "linear-gradient(135deg, #dcfce7, #bbf7d0)",
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 20px 40px rgba(0,0,0,0.6)"
          : "0 20px 40px rgba(22,163,74,0.35)",
    }}
  >
    <strong>¡Mensaje enviado con éxito!</strong>
    <br />
    Me pondré en contacto contigo lo antes posible 🚀
  </Alert>
</Snackbar>
      </Container>
    </Box>
  );
}

const inputStyle = (theme) => {
  const isDark = theme.palette.mode === "dark";

  return {
    "& .MuiOutlinedInput-root": {
      borderRadius: 14,
      background: isDark
        ? "rgba(15,23,42,0.75)"
        : "rgba(255,255,255,0.85)",
      backdropFilter: "blur(16px)",

      // 👉 TEXTO ESCRITO
      color: isDark ? "#e5e7eb" : "#0f172a",
      fontWeight: 500,

      "& input::placeholder": {
        color: isDark ? "#94a3b8" : "#64748b",
        opacity: 1,
      },

      "& textarea::placeholder": {
        color: isDark ? "#94a3b8" : "#64748b",
        opacity: 1,
      },

      "& fieldset": {
        borderColor: isDark
          ? "rgba(148,163,184,0.35)"
          : "rgba(30,64,175,0.25)",
      },

      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },

      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
      },
    },

    // 👉 LABEL
    "& .MuiInputLabel-root": {
      color: isDark ? "#cbd5f5" : "#475569",
      fontWeight: 500,
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },

    // 👉 ICONOS
    "& .MuiInputAdornment-root svg": {
      color: isDark ? "#93c5fd" : theme.palette.primary.main,
    },

    // 👉 AUTOFILL (Chrome fix)
    "& input:-webkit-autofill": {
      WebkitBoxShadow: isDark
        ? "0 0 0 100px rgba(15,23,42,0.9) inset"
        : "0 0 0 100px #ffffff inset",
      WebkitTextFillColor: isDark ? "#e5e7eb" : "#0f172a",
      transition: "background-color 9999s ease-out",
    },
  };
};);
