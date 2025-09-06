import { Box, Typography, Button, Avatar } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "center",
        gap: { xs: 4, md: 8 },
        py: { xs: 6, sm: 8, md: 10 },
        pt: { xs: 10, sm: 8, md: 10 }, // 👈 más espacio arriba en móvil
      }}
    >
      {/* Avatar con animación */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
        style={{ display: "inline-block", borderRadius: "50%" }}
      >
        <Avatar
          alt="Jorge Patricio Santamaría Cherrez"
          src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
          sx={{
            width: { xs: 130, sm: 170, md: 200 },
            height: { xs: 130, sm: 170, md: 200 },
            border: "4px solid #1976d2",
            boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
            mb: { xs: 2, sm: 0 },
          }}
        />
      </motion.div>

      {/* Texto */}
      <Box textAlign={{ xs: "center", sm: "left" }} maxWidth="600px">
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: "#1976d2",
            display: "inline-block",
            position: "relative",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
          }}
        >
          Hola, soy Jorge Patricio Santamaría Cherrez
          <Box
            component="span"
            sx={{
              position: "absolute",
              left: 0,
              bottom: -6,
              width: "100%",
              height: 4,
              backgroundColor: "#1976d2",
              borderRadius: 2,
            }}
          />
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          gutterBottom
          sx={{
            fontStyle: "italic",
            fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
          }}
        >
          🎓 Máster en Ingeniería de Software y Sistemas Informáticos
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            lineHeight: 1.6,
          }}
        >

     Me apasiona crear tecnología que transforme ideas en realidades digitales. Mi enfoque está en aportar valor constante, desarrollando soluciones digitales seguras, innovadoras y orientadas a generar impacto positivo.
          
        </Typography>

        {/* Botón con hover animado */}
        <Button
          variant="outlined"
          startIcon={<DescriptionIcon />}
          href="/CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            mt: 2,
            borderRadius: "20px",
            textTransform: "none",
            fontWeight: "bold",
            border: "2px solid #1976d2",
            color: "#1976d2",
            px: { xs: 3, md: 4 },
            py: 1.2,
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(90deg, #1976d2, #6d28d9)",
              color: "#fff",
              transform: "scale(1.05)",
            },
          }}
        >
          Ver CV
        </Button>
      </Box>
    </Box>
  );
}
