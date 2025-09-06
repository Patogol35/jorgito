import { Box, Typography, Button, Avatar } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

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
        py: { xs: 6, sm: 8, md: 10 }, // padding normal en lugar de altura forzada
        minHeight: "auto", // 👈 ya no se estira en PC vertical
      }}
    >
      {/* Avatar */}
      <Avatar
        alt="Jorge Patricio Santamaría Cherrez"
        src="/foto.jpg"
        sx={{
          width: { xs: 140, sm: 180, md: 200 },
          height: { xs: 140, sm: 180, md: 200 },
          border: "4px solid #1976d2",
          boxShadow: 3,
        }}
      />

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
          sx={{ fontStyle: "italic" }}
        >
          🎓 Máster en Ingeniería de Software y Sistemas Informáticos
        </Typography>

        <Typography variant="body1" paragraph>
          Transformo ideas en soluciones digitales eficientes, seguras y escalables.
          Apasionado por la innovación tecnológica, siempre buscando aportar valor y
          optimizar procesos en cada proyecto.
        </Typography>

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
          }}
        >
          Ver CV
        </Button>
      </Box>
    </Box>
  );
}
