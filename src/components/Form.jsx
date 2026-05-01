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

  return (
    <Box id="form" sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="sm">

        {/* ================= HEADER ================= */}
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
              gap: 1,
              px: 3,
              py: 1,
              borderRadius: "999px",
              background: theme.palette.action.hover,
              border: `1px solid ${theme.palette.divider}`,
              backdropFilter: "blur(6px)",
            }}
          >
            <ContactMailIcon sx={{ fontSize: 22, color: primary }} />

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: primary,
                lineHeight: 1,
              }}
            >
              {formText.title}
            </Typography>
          </Box>
        </motion.div>

        {/* ================= SUBTÍTULO ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
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
          ].map((field, i) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <TextField
                {...field}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={field.multiline ? { alignSelf: "flex-start", mt: 1 } : {}}
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
                color: "#fff",
                background: `linear-gradient(90deg, ${primary}, ${theme.palette.primary.dark})`,
                "&:hover": {
                  transform: "scale(1.05)",
                },
                transition: "transform 0.2s ease",
              }}
            >
              {formText.button}
            </Button>
          </motion.div>
        </Box>

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
              borderRadius: 3,
              fontWeight: 600,
              textAlign: "center",
              background: theme.palette.success.main,
              color: theme.palette.success.contrastText,
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

/* ================= INPUT STYLE ================= */
const inputStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    background: theme.palette.background.paper,
    "& input, & textarea": {
      fontWeight: 600,
      color: theme.palette.text.primary,
    },
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

  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
    fontWeight: 600,
  },
});
