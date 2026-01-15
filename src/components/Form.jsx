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

  /* ================= MISMAS ANIMACIONES QUE HERO ================= */
  const easeOutExpo = [0.16, 1, 0.3, 1];

  const fadeCinematic = {
    hidden: {
      opacity: 0,
      y: 16,
      clipPath: "inset(0 0 100% 0)",
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0 0 0% 0)",
      filter: "blur(0px)",
      transition: { duration: 1, ease: easeOutExpo },
    },
  };

  const containerStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.4,
      },
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
      id="contact"
      sx={{
        pt: { xs: 10, md: 14 },
        pb: { xs: 10, md: 14 },
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* ================= TITULO ================= */}
          <motion.div variants={fadeCinematic}>
            <Typography
              variant="h4"
              fontWeight={800}
              textAlign="center"
              sx={{ color: theme.palette.primary.main, mb: 1 }}
            >
              Conectemos
            </Typography>
          </motion.div>

          <motion.div variants={fadeCinematic}>
            <Typography
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 6, fontStyle: "italic" }}
            >
              Estoy listo para escuchar tu idea
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
              gap: 4,
            }}
          >
            <motion.div variants={fadeCinematic}>
              <TextField
                name="from_name"
                label="Nombre"
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle(theme)}
              />
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <TextField
                name="from_email"
                label="Correo electrónico"
                type="email"
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle(theme)}
              />
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <TextField
                name="message"
                label="Mensaje"
                multiline
                rows={4}
                required
                fullWidth
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
            </motion.div>

            {/* ================= BOTON ================= */}
            <motion.div
              variants={fadeCinematic}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type="submit"
                endIcon={<SendIcon />}
                sx={{
                  mt: 4,
                  px: 6,
                  py: 1.6,
                  borderRadius: "25px",
                  fontWeight: "bold",
                  textTransform: "none",
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                  boxShadow: "none",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Enviar mensaje
              </Button>
            </motion.div>
          </Box>
        </motion.div>

        {/* ================= ALERT ================= */}
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

/* ================= INPUTS LIMPIOS Y ELEGANTES ================= */
const inputStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    background: "transparent",
    transition: "all 0.25s ease",
    "& fieldset": {
      borderColor:
        theme.palette.mode === "dark"
          ? "rgba(96,165,250,0.3)"
          : "rgba(59,130,246,0.3)",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused": {
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
    },
  },
  "& label.Mui-focused": {
    color: theme.palette.primary.main,
  },
});
