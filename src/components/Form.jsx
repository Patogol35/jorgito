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
import { useTheme } from "@mui/material/styles";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Form({ t }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : theme.palette.primary.main;

  const formRef = useRef(null);
  const [success, setSuccess] = useState(false);

  const formText = t?.form || {
    title: "Contacto por Email",
    subtitle: "Ponte en contacto conmigo a través de este formulario",
    fields: {
      name: "Nombre",
      email: "Correo electrónico",
      message: "Mensaje",
    },
    button: "Enviar mensaje",
    success: "¡Mensaje enviado con éxito!",
    successMsg: "Me pondré en contacto contigo lo antes posible",
    error: "Error al enviar el mensaje",
  };

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
      .catch(() => alert(formText.error));
  };

  const easeOutExpo = [0.16, 1, 0.3, 1];

  // 🎬 Animación cinematográfica (solo para títulos)
  const fadeCinematic = {
    hidden: {
      opacity: 0,
      y: 20,
      clipPath: "inset(0 0 100% 0)",
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0 0 0% 0)",
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: easeOutExpo },
    },
  };

  // 🔥 Animación segura para inputs
  const fadeSoft = {
    hidden: {
      opacity: 0,
      y: 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const containerMotion = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <Box id="form" sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="sm">
        <motion.div
          variants={containerMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* ================= TÍTULO ================= */}
          <motion.div variants={fadeCinematic}>
            <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
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
                  sx={{
                    fontWeight: "bold",
                    color: primaryColor,
                    lineHeight: 1,
                  }}
                >
                  {formText.title}
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* ================= SUBTÍTULO ================= */}
          <motion.div variants={fadeCinematic}>
            <Typography
              variant="subtitle1"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                mb: 4,
              }}
            >
              {formText.subtitle}
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
                label: formText.fields.name,
                icon: <PersonIcon sx={{ color: primaryColor }} />,
              },
              {
                name: "from_email",
                label: formText.fields.email,
                type: "email",
                icon: <EmailIcon sx={{ color: primaryColor }} />,
              },
              {
                name: "message",
                label: formText.fields.message,
                multiline: true,
                rows: 4,
                icon: <MessageIcon sx={{ color: primaryColor }} />,
              },
            ].map((field) => (
              <motion.div key={field.name} variants={fadeSoft}>
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
              variants={fadeCinematic}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type="submit"
                startIcon={<SendIcon />}
                sx={{
                  borderRadius: "25px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 5,
                  py: 1.4,
                  color: "#ffffff",
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                  boxShadow: "none",
                  "&:hover": {
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                    transform: "scale(1.04)",
                  },
                  transition: "transform 0.2s ease",
                }}
              >
                {formText.button}
              </Button>
            </motion.div>
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
            <strong>{formText.success}</strong>
            <br />
            {formText.successMsg}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

const inputStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    background:
      theme.palette.mode === "dark"
        ? "rgba(15,23,42,0.55)"
        : "rgba(255,255,255,0.75)",
    backdropFilter: "blur(14px)",

    "& input, & textarea": {
      fontWeight: 600,
      color:
        theme.palette.mode === "dark" ? "#ffffff" : "#020617",
    },

    "& input::placeholder, & textarea::placeholder": {
      color:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.45)"
          : "rgba(2,6,23,0.45)",
      fontWeight: 400,
    },

    "& fieldset": {
      borderColor:
        theme.palette.mode === "dark"
          ? "rgba(96,165,250,0.35)"
          : "rgba(37,99,235,0.85)",
    },

    "&:hover fieldset": {
      borderColor:
        theme.palette.mode === "dark"
          ? theme.palette.primary.main
          : "#1d4ed8",
    },

    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },

  "& .MuiInputLabel-root": {
    color:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.85)"
        : "rgba(2,6,23,0.85)",
    fontWeight: 600,
  },
});
