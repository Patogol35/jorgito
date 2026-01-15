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

  const easeOutExpo = [0.16, 1, 0.3, 1];

  const fadeCinematic = {
    hidden: {
      opacity: 0,
      y: 24,
      filter: "blur(8px)",
      clipPath: "inset(0 0 100% 0)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: 1, ease: easeOutExpo },
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeCinematic}
        >
          {/* CARD GLASS */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 5,
              background:
                theme.palette.mode === "dark"
                  ? "rgba(15,23,42,0.6)"
                  : "rgba(255,255,255,0.7)",
              backdropFilter: "blur(16px)",
              border: `1px solid ${theme.palette.primary.main}22`,
              boxShadow: `0 0 30px ${theme.palette.primary.main}22`,
            }}
          >
            {/* TITULO */}
            <Typography
              variant="h4"
              fontWeight={800}
              textAlign="center"
              sx={{
                color: theme.palette.primary.main,
                mb: 1,
              }}
            >
              Conectemos
            </Typography>

            <Typography
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 3, fontStyle: "italic" }}
            >
              Estoy listo para escuchar tu idea
            </Typography>

            <Divider
              sx={{
                width: 80,
                mx: "auto",
                mb: 4,
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
                      <EmailIcon />
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
                      <MessageIcon />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle(theme)}
              />

              <Button
                type="submit"
                endIcon={<SendIcon />}
                sx={{
                  mt: 3,
                  py: 1.6,
                  borderRadius: "999px",
                  fontWeight: 700,
                  textTransform: "none",
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                  boxShadow: `0 0 24px ${theme.palette.primary.main}55`,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 0 36px ${theme.palette.primary.main}88`,
                  },
                  transition: "all 0.3s ease",
                }}
                variant="contained"
              >
                Enviar mensaje
              </Button>
            </Box>
          </Paper>
        </motion.div>

        {/* ALERT */}
        <Snackbar
          open={success}
          autoHideDuration={4000}
          onClose={() => setSuccess(false)}
        >
          <Alert severity="success" variant="filled">
            Mensaje enviado correctamente 🚀
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
        ? "rgba(15,23,42,0.5)"
        : "rgba(255,255,255,0.9)",
    transition: "all 0.25s ease",
    "& fieldset": {
      borderColor: `${theme.palette.primary.main}33`,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused": {
      boxShadow: `0 0 18px ${theme.palette.primary.main}55`,
    },
  },
});
