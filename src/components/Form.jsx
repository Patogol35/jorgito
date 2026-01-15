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
  const fadeCinematic = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
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
        py: { xs: 4, md: 6 },
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
            fontWeight={800}
            textAlign="center"
            sx={{
              color: theme.palette.text.primary,
              mb: 1,
              fontSize: { xs: "2rem", sm: "2.3rem" },
            }}
          >
            Envíame un mensaje
          </Typography>

          <Typography
            textAlign="center"
            sx={{
              mb: 4,
              color: theme.palette.text.secondary,
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
              gap: 2.5,
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
                    <PersonIcon color="action" />
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
                    <EmailIcon color="action" />
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
                    <MessageIcon color="action" />
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
                px: 5,
                py: 1.4,
                borderRadius: "999px",
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Enviar mensaje
            </Button>
          </Box>
        </motion.div>

        {/* ================= ALERT ================= */}
        <Snackbar
          open={success}
          autoHideDuration={3000}
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

/* ================= INPUT STYLE ================= */
const inputStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    background:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.common.white,

    color: theme.palette.text.primary,

    "& input, & textarea": {
      color: theme.palette.text.primary,
    },

    "& fieldset": {
      borderColor:
        theme.palette.mode === "dark"
          ? theme.palette.grey[700]
          : theme.palette.grey[400],
    },

    "&:hover fieldset": {
      borderColor: theme.palette.text.primary,
    },

    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },

  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.main,
  },
});
