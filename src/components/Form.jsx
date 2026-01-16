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
import { useState } from "react";
import axios from "axios";

/* 🔴 URL REAL DE TU BACKEND */
const API_URL = "https://form-backend-s31q.onrender.com/api/contact/";

export default function Form() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : theme.palette.primary.main;

  /* ===== ESTADO DEL FORM ===== */
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ===== HANDLE CHANGE ===== */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ===== HANDLE SUBMIT (AXIOS → BACKEND) ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccess(true);
      setFormData({
        from_name: "",
        from_email: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
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
          sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}
        >
          Ponte en contacto conmigo a través de este formulario
        </Typography>

        {/* ================= FORM ================= */}
        <Box
          component="form"
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
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <TextField
                {...field}
                value={formData[field.name]}
                onChange={handleChange}
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
          <Button
            type="submit"
            disabled={loading}
            endIcon={<SendIcon />}
            sx={{
              mt: 3,
              py: 1.6,
              borderRadius: "999px",
              fontWeight: 700,
              textTransform: "none",
              color: "#fff",
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
            }}
          >
            {loading ? "Enviando..." : "Enviar mensaje"}
          </Button>
        </Box>

        {/* ================= SUCCESS ================= */}
        <Snackbar
          open={success}
          autoHideDuration={3500}
          onClose={() => setSuccess(false)}
        >
          <Alert severity="success">
            ¡Mensaje enviado con éxito! 🚀
          </Alert>
        </Snackbar>

        {/* ================= ERROR ================= */}
        <Snackbar
          open={error}
          autoHideDuration={3500}
          onClose={() => setError(false)}
        >
          <Alert severity="error">
            No se pudo enviar el mensaje. Intenta nuevamente.
          </Alert>
        </Snackbar>

      </Container>
    </Box>
  );
}

/* ================= ESTILOS ================= */
const inputStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    background:
      theme.palette.mode === "dark"
        ? "rgba(15,23,42,0.55)"
        : "rgba(255,255,255,0.7)",
  },
});
