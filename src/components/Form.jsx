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
    <Box id="form" sx={{ py: { xs: 4, md: 6 } }}>
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
              sx={{ fontWeight: "bold", color: primaryColor }}
            >
              Contacto por Email
            </Typography>
          </Box>
        </motion.div>

        {/* ================= SUBTÍTULO ================= */}
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 4,
          }}
        >
          Ponte en contacto conmigo a través de este formulario
        </Typography>

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
              icon: <PersonIcon sx={{ color: primaryColor }} />,
            },
            {
              name: "from_email",
              label: "Correo electrónico",
              type: "email",
              icon: <EmailIcon sx={{ color: primaryColor }} />,
            },
            {
              name: "message",
              label: "Mensaje",
              multiline: true,
              rows: 4,
              icon: <MessageIcon sx={{ color: primaryColor }} />,
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
                variant="outlined"
                InputLabelProps={{ shrink: true }}
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
              },
              transition: "all 0.25s ease",
            }}
          >
            Enviar mensaje
          </Button>
        </Box>

        {/* ================= ALERT ================= */}
        <Snackbar
          open={success}
          autoHideDuration={3500}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" icon={false}>
            ¡Mensaje enviado con éxito!
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
        : "rgba(255,255,255,0.7)",
    backdropFilter: "blur(14px)",
    color:
      theme.palette.mode === "dark"
        ? "rgba(241,245,249,0.95)"
        : "rgba(15,23,42,0.9)",

    "& fieldset": {
      borderColor:
        theme.palette.mode === "dark"
          ? "rgba(96,165,250,0.35)"
          : "rgba(37,99,235,0.85)",
    },

    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },

    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 14px ${theme.palette.primary.main}55`,
    },
  },

  "& .MuiInputLabel-root": {
    color:
      theme.palette.mode === "dark"
        ? "rgba(226,232,240,0.75)"
        : "rgba(71,85,105,0.8)",
  },

  /* 🔴 CLAVE: el label tapa el borde */
  "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-shrink": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(15,23,42,0.55)"
        : "rgba(255,255,255,0.7)",
    padding: "0 6px",
    borderRadius: 6,
  },
});
