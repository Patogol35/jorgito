import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Snackbar,
  Alert,
  InputAdornment,
  Divider,
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

export default function Contact() {
  const theme = useTheme();
  const formRef = useRef();
  const [success, setSuccess] = useState(false);

  const fadeCinematic = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
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
      .catch(() => alert("Error al enviar el mensaje"));
  };

  return (
    <Box
      id="form"
      sx={{
        py: { xs: 10, md: 14 },
        background: `linear-gradient(180deg, ${theme.palette.background.default}, ${theme.palette.action.hover})`,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeCinematic}
        >
          {/* CARD */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            }}
          >
            {/* TÍTULO */}
            <Typography
              variant="h4"
              fontWeight={800}
              textAlign="center"
              sx={{ mb: 1 }}
            >
              Hablemos 💬
            </Typography>

            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Cuéntame tu idea y la hacemos realidad
            </Typography>

            <Divider
              sx={{
                width: 70,
                mx: "auto",
                mb: 4,
                borderBottomWidth: 3,
                borderColor: theme.palette.primary.main,
              }}
            />

            {/* FORM */}
            <Box
              component="form"
              ref={formRef}
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              <TextField
                name="from_name"
                label="Nombre"
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle}
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
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle}
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
                      <MessageIcon />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle}
              />

              <Button
                type="submit"
                endIcon={<SendIcon />}
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: "999px",
                  fontWeight: 700,
                  textTransform: "none",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
                  },
                  transition: "all 0.25s ease",
                }}
              >
                Enviar mensaje
              </Button>
            </Box>
          </Paper>
        </motion.div>

        {/* ALERTA */}
        <Snackbar
          open={success}
          autoHideDuration={4000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" variant="filled">
            Mensaje enviado correctamente 🚀
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.9)",
    transition: "all 0.25s ease",
    "&:hover": {
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },
    "&.Mui-focused": {
      boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
    },
  },
};
