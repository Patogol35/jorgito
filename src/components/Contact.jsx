import { Container, Typography, Box } from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Facebook,
  Instagram,
  MailOutline,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";
import { useTheme } from "@mui/material/styles";

export default function Contact() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const socialLinks = [
    { icon: <GitHub />, href: "https://github.com/Patogol35" },
    { icon: <LinkedIn />, href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2" },
    { icon: <Facebook />, href: "https://www.facebook.com/share/1C9RgHAPvL/" },
    { icon: <Instagram />, href: "https://www.instagram.com/jorge_patricio_26" },
    { icon: <MailOutline />, href: "mailto:patogol3535@gmail.com" },
  ];

  return (
    <Box sx={{ py: 5 }}>
      <Container maxWidth="sm">
        {/* separador */}
        <Box
          sx={{
            width: 80,
            height: 4,
            mx: "auto",
            mb: 4,
            borderRadius: 2,
            background: isDark
              ? "linear-gradient(90deg,#90caf9,#bbdefb)"
              : "linear-gradient(90deg,#1976d2,#42a5f5)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography variant="h4" fontWeight={700} align="center" mb={1}>
            Conecta conmigo
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            mb={4}
          >
            Estoy disponible en mis redes sociales y correo electrónico
          </Typography>

          <SocialLinks
            socialLinks={socialLinks}
            size="44px"
            animated
            spacing={3}
          />
        </motion.div>
      </Container>
    </Box>
  );
}
