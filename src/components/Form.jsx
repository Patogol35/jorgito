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

export default function Contact() {
  const theme = useTheme();
  const formRef = useRef();
  const [success, setSuccess] = useState(false);

  const fadeCinematic = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
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
      .catch((err) => {
        console.error(err);
        alert("Error al enviar el mensaje");
      });
  };

  return (
    <Box
      id="form"
      sx={{
        py: { xs: 10, md: 14 },
        px: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeCinematic}
        >
          <Box
            sx={{
              p: { xs: 4, sm: 5 },
              borderRadius: "28px",
              backdropFilter: "blur(18px)",
              background:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(255,255,255,0.75)",
              border: `1px solid ${theme.palette.primary.main}22`,
              boxShadow: `0 0 50px ${theme.palette.primary.main}18`,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              textAlign="center"
              sx={{ color: theme.palette.primary.main, mb: 1 }}
            >
              Hablemos de tu proyecto
            </Typography>

            <Typography
              variant="body2"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Cuéntame tu idea y te responderé personalmente
            </Typography>

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
              {/* NOMBRE */}
              <TextField
                name="from_name"
                label="Nombre"
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* EMAIL */}
              <TextField
                name="from_email"
                label="Correo electrónico"
                type="email"
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* MENSAJE */}
              <TextField
                name="message"
                label="Mensaje"
                multiline
                rows={4}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1 }}>
                      <MessageIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* BOTÓN */}
              <Button
                type="submit"
                endIcon={<SendIcon />}
                sx={{
                  mt: 3,
                  alignSelf: "center",
                  px: 6,
                  py: 1.5,
                  borderRadius: "40px",
                  fontWeight: 600,
                  textTransform: "none",
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                  boxShadow: `0 0 25px ${theme.palette.primary.main}55`,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 0 35px ${theme.palette.primary.main}88`,
                  },
                }}
                variant="contained"
              >
                Enviar mensaje
              </Button>
            </Box>
          </Box>
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
