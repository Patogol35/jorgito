import { Container, Typography, Box, Paper } from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Facebook,
  Instagram,
  MailOutline,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import GroupsIcon from "@mui/icons-material/Groups";
import SocialLinks from "./SocialLinks";
import { useTheme } from "@mui/material/styles";

export default function Contact() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const socialLinks = [
    { icon: <GitHub />, color: "#181717", href: "https://github.com/Patogol35" },
    { icon: <LinkedIn />, color: "#0A66C2", href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2" },
    { icon: <Facebook />, color: "#1877F2", href: "https://www.facebook.com/share/1C9RgHAPvL/" },
    { icon: <Instagram />, color: "#E4405F", href: "https://www.instagram.com/jorge_patricio_26" },
    { icon: <MailOutline />, color: "#1976d2", href: "mailto:patogol3535@gmail.com" },
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            background: isDark
              ? "linear-gradient(135deg, #1e1e1e, #141414)"
              : "linear-gradient(135deg, #ffffff, #f4f6fb)",
            boxShadow:
              isDark
                ? "0 10px 30px rgba(0,0,0,0.6)"
                : "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                px: 4,
                py: 1.2,
                borderRadius: "999px",
                mb: 2,
                background: isDark
                  ? "rgba(144,202,249,0.12)"
                  : "rgba(25,118,210,0.12)",
              }}
            >
              <GroupsIcon sx={{ mr: 1, color: "#1976d2" }} />
              <Typography fontWeight="bold">Conectemos</Typography>
            </Box>

            <Typography variant="body2" sx={{ opacity: 0.75, mb: 3 }}>
              Escríbeme o sígueme en mis redes profesionales
            </Typography>

            <SocialLinks
              socialLinks={socialLinks}
              size="42px"
              spacing={2}
              animated
            />
          </motion.div>
        </Paper>
      </Container>
    </Box>
  );
}
