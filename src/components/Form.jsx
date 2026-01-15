import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material/styles";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const theme = useTheme();
  const formRef = useRef();
  const [success, setSuccess] = useState(false);

  const fadeCinematic = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
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
      id="contact"
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
              borderRadius: "24px",
              backdropFilter: "blur(16px)",
              background:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.9)",
              border: `1px solid ${theme.palette.primary.main}33`,
              boxShadow: `0 0 45px ${theme.palette.primary.main}22`,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              sx={{ color: theme.palette.primary.main, mb: 1 }}
            >
              ¿Tienes una idea en mente?
            </Typography>

            <Typography
              variant="body2"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Escríbeme y te responderé personalmente 🚀
            </Typography>

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
                variant="standard"
                fullWidth
                required
              />

              <TextField
                name="from_email"
                label="Correo electrónico"
                type="email"
                variant="standard"
                fullWidth
                required
              />

              <TextField
                name="message"
                label="Mensaje"
                multiline
                rows={4}
                variant="standard"
                fullWidth
                required
              />

              <Button
                type="submit"
                endIcon={<SendIcon />}
                sx={{
                  mt: 3,
                  alignSelf: "center",
                  px: 5,
                  py: 1.4,
                  borderRadius: "30px",
                  fontWeight: "bold",
                  textTransform: "none",
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                  boxShadow: `0 0 18px ${theme.palette.primary.main}55`,
                }}
                variant="contained"
              >
                Enviar mensaje
              </Button>
            </Box>
          </Box>
        </motion.div>

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
