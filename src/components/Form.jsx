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

import {
  fadeCinematic,
  fadeSoft,
  containerMotion,
  formStyles,
} from "../Styles/formStyles";

export default function Form({ t }) {
  const theme = useTheme();

  const isDark = theme.palette.mode === "dark";
  const primaryColor = isDark
    ? "#bbdefb"
    : theme.palette.primary.main;

  const formRef = useRef(null);
  const [success, setSuccess] = useState(false);

  const formText = t?.form || {
    title: "Contacto por Email",
    subtitle:
      "Ponte en contacto conmigo a través de este formulario",

    fields: {
      name: "Nombre",
      email: "Correo electrónico",
      message: "Mensaje",
    },

    button: "Enviar mensaje",
    success: "¡Mensaje enviado con éxito!",
    successMsg:
      "Me pondré en contacto contigo lo antes posible",

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

  const fields = [
    {
      name: "from_name",
      label: formText.fields.name,
      icon: (
        <PersonIcon
          sx={{ color: primaryColor }}
        />
      ),
    },

    {
      name: "from_email",
      label: formText.fields.email,
      type: "email",
      icon: (
        <EmailIcon
          sx={{ color: primaryColor }}
        />
      ),
    },

    {
      name: "message",
      label: formText.fields.message,
      multiline: true,
      rows: 4,
      icon: (
        <MessageIcon
          sx={{ color: primaryColor }}
        />
      ),
    },
  ];

  return (
    <Box id="form" sx={formStyles.section}>
      <Container maxWidth="sm">
        <motion.div
          variants={containerMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Título */}
          <motion.div variants={fadeCinematic}>
            <Box sx={formStyles.titleContainer}>
              <Box
                sx={formStyles.titleBadge(isDark)}
              >
                <ContactMailIcon
                  sx={{
                    fontSize: 22,
                    color: primaryColor,
                  }}
                />

                <Typography
                  variant="h6"
                  sx={formStyles.title(primaryColor)}
                >
                  {formText.title}
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Subtítulo */}
          <motion.div variants={fadeCinematic}>
            <Typography
              variant="subtitle1"
              sx={formStyles.subtitle}
            >
              {formText.subtitle}
            </Typography>
          </motion.div>

          {/* Formulario */}
          <Box
            component="form"
            ref={formRef}
            onSubmit={handleSubmit}
            sx={formStyles.form}
          >
            {fields.map((field) => (
              <motion.div
                key={field.name}
                variants={fadeSoft}
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
                            ? {
                                alignSelf: "flex-start",
                                mt: 1,
                              }
                            : {}
                        }
                      >
                        {field.icon}
                      </InputAdornment>
                    ),
                  }}
                  sx={formStyles.input(theme)}
                />
              </motion.div>
            ))}

            {/* Botón */}
            <motion.div
              variants={fadeCinematic}
              style={formStyles.buttonContainer}
            >
              <Button
                type="submit"
                startIcon={<SendIcon />}
                sx={formStyles.button(theme)}
              >
                {formText.button}
              </Button>
            </motion.div>
          </Box>
        </motion.div>

        {/* Alerta */}
        <Snackbar
          open={success}
          autoHideDuration={3500}
          onClose={() => setSuccess(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          sx={formStyles.snackbar}
        >
          <Alert
            severity="success"
            icon={false}
            sx={formStyles.alert(theme)}
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
