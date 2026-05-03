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

/* =========================
   🎬 Animaciones tipo Hero
========================= */

const easeOutExpo = [0.16, 1, 0.3, 1];

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

const containerAnim = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export default function Form({ t }) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;

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

  const fields = [
    {
      name: "from_name",
      label: formText.fields.name,
      icon: <PersonIcon sx={{ color: primary }} />,
    },
    {
      name: "from_email",
      label: formText.fields.email,
      type: "email",
      icon: <EmailIcon sx={{ color: primary }} />,
    },
    {
      name: "message",
      label: formText.fields.message,
      multiline: true,
      rows: 4,
      icon: <MessageIcon sx={{ color: primary }} />,
    },
  ];

  return (
    <Box
      id="form"
      sx={{
        py: { xs: 4, md: 6 },
        color: theme.palette.text.primary,
      }}
    >
      <Container maxWidth="sm">

        {/* 🎬 CONTENEDOR GLOBAL */}
        <motion.div
          variants={containerAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >

          {/* ================= HEADER ================= */}
          <motion.div variants={fadeCinematic}>
            <Box sx={headerStyle(theme)}>
              <ContactMailIcon sx={{ fontSize: 22, color: primary }} />

              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: primary, lineHeight: 1 }}
              >
                {formText.title}
              </Typography>
            </Box>
          </motion.div>

          {/* ================= SUBTITLE ================= */}
          <motion.div variants={fadeCinematic}>
            <Typography
              variant="subtitle1"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                mb: 4,
                color: theme.palette.text.primary,
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
            {fields.map((field) => (
              <motion.div key={field.name} variants={fadeCinematic}>
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

            {/* ================= BUTTON ================= */}
            <motion.div
              variants={fadeCinematic}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type="submit"
                startIcon={<SendIcon />}
                sx={buttonStyle(theme)}
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
          <Alert sx={alertStyle(theme)} icon={false}>
            <strong>{formText.success}</strong>
            <br />
            {formText.successMsg}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

/* ================= STYLES (SIN CAMBIOS) ================= */

const headerStyle = (theme) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
  px: 3,
  py: 1,
  borderRadius: "999px",
  background: theme.palette.action.hover,
  border: `1px solid ${theme.palette.divider}`,
  backdropFilter: "blur(6px)",
});

const buttonStyle = (theme) => ({
  borderRadius: "25px",
  textTransform: "none",
  fontWeight: "bold",
  px: 5,
  py: 1.4,
  color: theme.palette.getContrastText(theme.palette.primary.main),
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  boxShadow: "none",
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "scale(1.04)",
  },
});

const alertStyle = (theme) => ({
  px: 4,
  py: 2,
  borderRadius: 3,
  fontWeight: 600,
  textAlign: "center",
  fontSize: "0.95rem",
  color: theme.palette.success.contrastText,
  background: theme.palette.success.main,
  boxShadow: theme.shadows[6],
});

const inputStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    background: theme.palette.background.paper,
    backdropFilter: "blur(10px)",
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
});
