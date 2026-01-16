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

const WHATSAPP_NUMBER = "5930997979099"; // ← TU NÚMERO

export default function Form() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : theme.palette.primary.main;

  const formRef = useRef(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(formRef.current);

    const name = data.get("from_name");
    const email = data.get("from_email");
    const message = data.get("message");

    const whatsappText = `
👋 *Nuevo mensaje desde el portafolio*

👤 *Nombre:* ${name}
📧 *Correo:* ${email}

💬 *Mensaje:*
${message}
    `.trim();

    const encodedText = encodeURIComponent(whatsappText);

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`,
      "_blank"
    );

    setSuccess(true);
    formRef.current.reset();
  };

  return (
    <Box id="form" sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="sm">
        {/* ===== TÍTULO ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
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
              background: isDark
                ? "rgba(34,197,94,0.08)"
                : "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.35)",
              backdropFilter: "blur(8px)",
            }}
          >
            <ContactMailIcon sx={{ color: "#22c55e" }} />
            <Typography sx={{ fontWeight: 700, color: "#22c55e" }}>
              Contacto por WhatsApp
            </Typography>
          </Box>
        </motion.div>

        {/* ===== SUBTÍTULO ===== */}
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            fontWeight: 600,
            mb: 4,
          }}
        >
          Escríbeme directamente y te responderé lo antes posible
        </Typography>

        {/* ===== FORM ===== */}
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
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
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

          {/* ===== BOTÓN ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
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
                background: "linear-gradient(90deg, #22c55e, #16a34a)",
                boxShadow: "0 10px 26px rgba(34,197,94,0.45)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 14px 32px rgba(34,197,94,0.6)",
                },
                transition: "all 0.25s ease",
              }}
            >
              Enviar por WhatsApp
            </Button>
          </motion.div>
        </Box>

        {/* ===== ALERT ===== */}
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="success"
            sx={{
              fontWeight: 600,
              borderRadius: 3,
              textAlign: "center",
            }}
          >
            ✅ WhatsApp abierto correctamente
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
    "& fieldset": {
      borderColor: "rgba(34,197,94,0.35)",
    },
    "&:hover fieldset": {
      borderColor: "#22c55e",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#22c55e",
      boxShadow: "0 0 14px rgba(34,197,94,0.45)",
    },
  },
});
