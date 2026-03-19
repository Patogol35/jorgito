app
import { useState, useMemo, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Paper,
  Container,
  Fab,
  Tooltip,
} from "@mui/material";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ChatBot from "./components/ChatBot.jsx";
import Form from "./components/Form.jsx";

function App() {
  const storedMode = localStorage.getItem("themeMode") || "dark";
  const [mode, setMode] = useState(storedMode);
  const scrollOffset = "80px";

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "dark" ? "#0a0a0a" : "#ffffff",
            paper: mode === "dark" ? "#121212" : "#ffffff",
          },
          text: {
            primary: mode === "dark" ? "#ffffff" : "#111111",
          },
        },
      }),
    [mode]
  );

  const LIGHT_CARD_BG = "#f7f9fc";

  const sections = [
    { id: "about", color: "#2e7d32", Component: About },
    { id: "skills", color: "#fb8c00", Component: Skills },
    { id: "certifications", color: "#C0A660", Component: Certifications },
    { id: "projects", color: "#1976d2", Component: Projects },
    { id: "contact", color: "#d32f2f", Component: Contact },
    { id: "form", color: "#00897b", Component: Form },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ minHeight: "100vh", overflowX: "hidden" }}>
        <Navbar mode={mode} setMode={setMode} />
        <Hero mode={mode} setMode={setMode} />

        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            py: 6,
            px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 },
          }}
        >
          {sections.map(({ id, color, Component }) => (
            <Paper
              key={id}
              id={id}
              elevation={0}
              sx={{
                mb: 4,
                p: { xs: 3, md: 6 },
                borderRadius: 3,

                backgroundColor:
                  mode === "light" ? LIGHT_CARD_BG : "#222222",

                /* 🧱 Bordes */
                border: `2px solid ${
                  mode === "light"
                    ? "rgba(0,0,0,0.85)"
                    : "rgba(255,255,255,0.85)"
                }`,

                /* 🎯 Línea izquierda fija */
                borderLeft: `4px solid ${color}`,

                scrollMarginTop: scrollOffset,

                /* 🎞️ Solo movimiento, sin efectos visuales */
                transition: "transform 0.25s ease",

                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Component />
            </Paper>
          ))}
        </Container>

        <Footer />

        <Tooltip title="Chatea por WhatsApp" placement="left">
          <Fab
            aria-label="whatsapp"
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 1000,
              bgcolor: "#25D366",
              "&:hover": { bgcolor: "#1ebe5c" },
            }}
            onClick={() =>
              window.open("https://wa.me/593997979099", "_blank")
            }
          >
            <WhatsAppIcon sx={{ fontSize: 32, color: "#fff" }} />
          </Fab>
        </Tooltip>

        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;

hero

import {
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

export default function Hero({ mode, setMode }) {
  const theme = useTheme();

  const glowColor =
    theme.palette.mode === "dark"
      ? theme.palette.primary.main
      : "#60a5fa";

  /* ================= ANIMACIONES CINEMATOGRÁFICAS ================= */
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

  const textContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.6,
      },
    },
  };

  const buttonsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 1.3,
      },
    },
  };

  return (
    <>
      <Toolbar />

      <Box
        id="hero"
        sx={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, md: 8 },
          pt: { xs: 6, sm: 8, md: 10 },
          pb: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 4, md: 8 },
        }}
      >
        {/* ================= AVATAR MONEDA PULIDA ================= */}

<motion.div
  initial={{
    opacity: 0,
    rotateY: -180,
    scale: 0.9,
  }}
  animate={{
    opacity: 1,
    rotateY: 0,
    scale: 1,
  }}
  transition={{
    duration: 2.4,
    ease: [0.25, 0.9, 0.35, 1], // natural cinematic
  }}
  style={{
    borderRadius: "50%",
    transformStyle: "preserve-3d",
    perspective: 1300,
  }}
>
  <motion.div
    animate={{
      y: [0, -12, 0],
      rotateX: [0, 1.2, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <motion.div
      animate={{
        boxShadow: [
          `0 0 18px ${theme.palette.primary.main}55`,
          `0 0 28px ${theme.palette.primary.main}88`,
          `0 0 18px ${theme.palette.primary.main}55`,
        ],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        borderRadius: "50%",
      }}
    >
      <Avatar
        alt="Jorge Patricio"
        src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1768080897/file_00000000abe471f8a911de56e6d3cb7f_e0quhw.png"
        sx={{
          width: { xs: 130, sm: 170, md: 200 },
          height: { xs: 130, sm: 170, md: 200 },
          border: `3px solid ${theme.palette.primary.main}`,
          boxShadow: `0 0 12px ${theme.palette.primary.main}66`,
          backfaceVisibility: "hidden",
          backgroundColor: theme.palette.background.paper,
        }}
      />
    </motion.div>
  </motion.div>
</motion.div>

        {/* ================= TEXTO ================= */}
        <Box
          textAlign={{ xs: "center", sm: "left" }}
          maxWidth="600px"
          mx="auto"
          zIndex={1}
        >
          <motion.div
            variants={textContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeCinematic}>
              <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: { xs: "1.9rem", sm: "2.3rem", md: "2.6rem" },
                }}
              >
                Hola, soy Jorge Patricio Santamaría Cherrez
              </Typography>
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ fontStyle: "italic" }}
              >
                Ingeniero en Sistemas · Máster en Ingeniería de Software y Sistemas Informáticos
              </Typography>
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.08rem" },
                  lineHeight: 1.9,
                  letterSpacing: "0.3px",
                  color: theme.palette.text.primary,
          
                  maxWidth: "520px",
                  mt: 3,
                  mb: 5,
                }}
              >
                Me apasiona crear tecnología que transforma ideas en realidades digitales.
Mi enfoque está en aportar valor constante, desarrollando soluciones digitales seguras, innovadoras y orientadas a generar un impacto positivo.
Además, domino herramientas de desarrollo, pruebas de APIs, virtualización, seguridad de red, soporte remoto y documentación técnica.
              </Typography>
            </motion.div>
          </motion.div>

          {/* ================= BOTONES ================= */}
          <motion.div
            variants={buttonsContainer}
            initial="hidden"
            animate="visible"
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: { xs: "center", sm: "flex-start" },
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {[
                {
                  label: "Ver CV",
                  icon: <DescriptionIcon />,
                  href: "/Jorge.CV.pdf",
                },
                {
                  label: "Ver Título",
                  icon: <WorkspacePremiumIcon />,
                  href:
                    "https://res.cloudinary.com/dqkwc0kf7/image/upload/v1759022233/image_b835ddca-c010-4f78-a300-676248ea3fd120250927_201635_cizk17.jpg",
                },
                {
                  label: "Sasha",
                  icon: <SmartToyIcon />,
                  onClick: () => window.openSashaChat?.(),
                },
              ].map((btn, i) => (
                <motion.div key={i} variants={fadeCinematic}>
                  <Button
                    variant="contained"
                    startIcon={btn.icon}
                    href={btn.href}
                    onClick={btn.onClick}
                    target={btn.href ? "_blank" : undefined}
                    sx={{
                      borderRadius: "25px",
                      textTransform: "none",
                      fontWeight: "bold",
                      px: 4,
                      py: 1.4,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                      boxShadow: "none",
                    }}
                  >
                    {btn.label}
                  </Button>
                </motion.div>
              ))}

              <motion.div variants={fadeCinematic}>
                <IconButton
                  onClick={() => setMode(mode === "light" ? "dark" : "light")}
                  sx={{
                    color: theme.palette.primary.main,
                    "&:hover": {
                      background: "transparent",
                      transform: "scale(1.15)",
                    },
                    transition: "transform 0.2s ease",
                  }}
                >
                  {mode === "light" ? (
                    <Brightness4 sx={{ fontSize: 28 }} />
                  ) : (
                    <Brightness7 sx={{ fontSize: 28 }} />
                  )}
                </IconButton>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </>
  );
              }


about

import { Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useTheme } from "@mui/material/styles";

const estudios = [
  {
    titulo: "Máster en Ingeniería de Software y Sistemas Informáticos",
    institucion: "Universidad Internacional de La Rioja, España",
    detalle: "Nota TFM: 9 | Promedio final: 8.68",
    iconColor: "#1976d2",
  },
  {
    titulo: "Ingeniero en Sistemas",
    institucion: "Universidad Indoamérica, Ecuador",
    detalle: "Nota Tesis: 9.50 | Promedio final: 9",
    iconColor: "#9333ea",
  },
];

export default function About() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  const secondary = theme.palette.text.secondary;
  const subtitleStyle = { fontWeight: "bold", mt: 1 };

  return (
    <Box
      id="about"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: theme.palette.text.primary,
      }}
    >
      {/* Encabezado — ACTUALIZADO */}
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
            justifyContent: "center",
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
          {/* Icono SIN fondo */}
          <GraduationCap size={22} color={primaryColor} />

          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: primaryColor, lineHeight: 1 }}
          >
            Formación
          </Typography>
        </Box>
      </motion.div>

      {/* Grid de estudios — SIN CAMBIOS */}
      <Grid container spacing={3} justifyContent="center">
        {estudios.map((est, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.3 }}
              viewport={{ once: false }}
            >
              <Box sx={{ textAlign: "center", px: 1 }}>
                <GraduationCap size={28} color={est.iconColor} />
                <Typography variant="subtitle1" sx={subtitleStyle}>
                  {est.titulo}
                </Typography>
                <Typography variant="body2" color={secondary}>
                  {est.institucion}
                </Typography>
                <Typography variant="body2" color={secondary}>
                  {est.detalle}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}


contact

import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Facebook,
  Instagram,
  MailOutline,
  AccessTime,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import GroupsIcon from "@mui/icons-material/Groups";
import SocialLinks from "./SocialLinks";
import { useTheme } from "@mui/material/styles";

export default function Contact() {
  const theme = useTheme();
  const { palette } = theme;
  const isDark = palette.mode === "dark";

  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  const socialLinks = [
    {
      icon: <GitHub />,
      color: isDark ? "#ffffff" : "#181717",
      href: "https://github.com/Patogol35",
    },
    {
      icon: <LinkedIn />,
      color: isDark ? "#90caf9" : "#0A66C2",
      href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2",
    },
    {
      icon: <Facebook />,
      color: isDark ? "#90caf9" : "#1877F2",
      href: "https://www.facebook.com/share/1C9RgHAPvL/",
    },
    {
      icon: <Instagram />,
      color: isDark ? "#f48fb1" : "#E4405F",
      href: "https://www.instagram.com/jorge_patricio_26",
    },
    { icon: <MailOutline />, color: isDark ? "#fff" : "#1976d2", href: "mailto:patogol3535@gmail.com" },
  ];

  return (
    <Box
      id="contact"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: palette.text.primary,
      }}
    >
      <Container maxWidth="sm">
        {/* =========================  
        TÍTULO CONTACTO  
========================= */}
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
      justifyContent: "center",
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
    {/* Icono SIN fondo */}
    <GroupsIcon sx={{ fontSize: 22, color: primaryColor }} />

    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        color: primaryColor,
        lineHeight: 1,
      }}
    >
      Redes Sociales
    </Typography>
  </Box>
</motion.div>

        {/* =========================
            TEXTO INTRO (subtitle1)
        ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Puedes contactarme a través de mis redes profesionales o por correo
            electrónico.
          </Typography>
        </motion.div>

        {/* =========================
            DISPONIBILIDAD (body2)
        ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mb: 3,
              color: palette.text.secondary,
            }}
          >
            <AccessTime sx={{ fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Respuesta habitual en menos de 24 horas
            </Typography>
          </Box>
        </motion.div>

        <Divider sx={{ mb: 3 }} />

        {/* Redes sociales */}
        <SocialLinks socialLinks={socialLinks} size="48px" animated={true} spacing={2} />

        
      </Container>
    </Box>
  );
      }


certification

import { Typography, Grid, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Brain } from "lucide-react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const certificaciones = [
  {
    titulo: "Curso de React.js",
    institucion: "Platzi",
    año: 2025,
    iconColor: "#1976d2",
    iconType: BookOpen,
  },
  {
    titulo: "React & TypeScript - The Practical Guide",
    institucion: "Udemy",
    año: 2024,
    iconColor: "#d97706",
    iconType: BookOpen,
  },
  {
    titulo:
      "Curso de Preparación para la Certificación AZ900: Microsoft Azure Fundamentals",
    institucion: "Universidad Internacional de la Rioja",
    año: 2023,
    iconColor: "#e11d48",
    iconType: GraduationCap,
  },
  {
    titulo: "Curso de Python",
    institucion: "Platzi",
    año: 2025,
    iconColor: "#22c55e",
    iconType: BookOpen,
  },
  {
    titulo: "Data Analysis with Python",
    institucion: "freeCodeCamp",
    año: 2024,
    iconColor: "#9333ea",
    iconType: Brain,
  },
  {
    titulo: "Fundamentos de la Inteligencia Artificial",
    institucion: "IBM",
    año: 2025,
    iconColor: "#1e40af",
    iconType: Brain,
  },
];

export default function Certifications() {
  const { palette } = useTheme();
  const isDark = palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  return (
    <Box
      id="certifications"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: palette.text.primary,
      }}
    >
      {/* =========================
          TÍTULO CERTIFICACIONES
          (MISMO DISEÑO QUE ABOUT)
      ========================= */}
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
            justifyContent: "center",
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
          {/* Icono SIN fondo */}
          <WorkspacePremiumIcon
            sx={{ fontSize: 22, color: primaryColor }}
          />

          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: primaryColor, lineHeight: 1 }}
          >
            Certificaciones
          </Typography>
        </Box>
      </motion.div>

      {/* Grid de certificaciones — SIN CAMBIOS */}
      <Grid container spacing={3} justifyContent="center">
        {certificaciones.map(
          ({ titulo, institucion, año, iconColor, iconType: Icon }, i) => (
            <Grid item xs={12} sm={6} md={4} key={titulo}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <Box sx={{ textAlign: "center", px: 1 }}>
                  <Icon size={28} color={iconColor} />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mt: 1 }}
                  >
                    {titulo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {institucion} | {año}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}

projects

import { Typography, Grid, Box, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

// Íconos
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MovieIcon from "@mui/icons-material/Movie";
import QuizIcon from "@mui/icons-material/Quiz";
import FunctionsIcon from "@mui/icons-material/Functions";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

// =====================
// Datos de proyectos
// =====================
const proyectos = [
  {
    titulo: "App para ver el clima",
    link: "https://jorgepatriciosantamariacherrezweath.vercel.app/",
    color: "#1976d2",
    icon: WbSunnyIcon,
  },
  {
    titulo: "E-commerce Full Stack (React + Django)",
    link: "https://ecommerce-jorge-patricio.vercel.app/",
    color: "#9333ea",
    icon: ShoppingCartIcon,
  },
  {
    titulo: "Explorador de películas",
    link: "https://movie-explorer-jorge-patricio.vercel.app/",
    color: "#16a34a",
    icon: MovieIcon,
  },
  {
    titulo: "Quiz educativo de Ambato y Ecuador",
    link: "https://quiz-educativo-jorgepatricio.vercel.app/",
    color: "#e11d48",
    icon: QuizIcon,
  },
  {
    titulo: "Calculadora Científica",
    link: "https://calculadorajorgepatricio.vercel.app/",
    color: "#f59e0b",
    icon: FunctionsIcon,
  },
  {
    titulo: "Reloj Global",
    link: "https://reloj-jorgepatricio.vercel.app/",
    color: "#0ea5e9",
    icon: AccessTimeIcon,
  },
  {
    titulo: "App para Crear y Escanear Códigos QR",
    link: "https://jorgepatricio-codigo-qr.vercel.app/",
    color: "#10b981",
    icon: QrCode2Icon,
  },
  
];

// =====================
// Tarjeta individual
// =====================
function ProjectCard({ p, i, palette }) {
  const Icon = p.icon;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: i * 0.12 }}
        viewport={{ once: false }}
      >
        <Box sx={{ textAlign: "center", px: 1 }}>
          <Icon sx={{ fontSize: 30, color: p.color }} />

          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
            <Link
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                color: palette.text.primary,
                fontWeight: "bold",
                "&:hover": { color: p.color },
              }}
            >
              {p.titulo}
            </Link>
          </Typography>
        </Box>
      </motion.div>
    </Grid>
  );
}

// =====================
// Componente principal
// =====================
export default function Projects() {
  const { palette } = useTheme();
  const isDark = palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  return (
    <Box
      id="projects"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: palette.text.primary,
      }}
    >
      {/* =========================
          TÍTULO PROYECTOS
          (MISMO DISEÑO QUE ABOUT)
      ========================= */}
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
            justifyContent: "center",
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
          {/* Icono SIN fondo */}
          <WorkOutlineIcon sx={{ fontSize: 22, color: primaryColor }} />

          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: primaryColor, lineHeight: 1 }}
          >
            Apps Demostrativas 
          </Typography>
        </Box>
      </motion.div>

      {/* Grid de proyectos — SIN CAMBIOS */}
      <Grid container spacing={3} justifyContent="center">
        {proyectos.map((p, i) => (
          <ProjectCard key={p.titulo} p={p} i={i} palette={palette} />
        ))}
      </Grid>
    </Box>
  );
}

form

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
        {/* ================= TÍTULO (SIN CAMBIOS) ================= */}
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
              justifyContent: "center",
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
              sx={{ fontWeight: "bold", color: primaryColor, lineHeight: 1 }}
            >
              Contacto por Email
            </Typography>
          </Box>
        </motion.div>

        {/* ================= SUBTÍTULO (MÁS CLARO) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>

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
          {/* ================= BOTÓN (MISMO DISEÑO HERO) ================= */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.4 }}
  style={{ display: "flex", justifyContent: "center" }}
>
  <Button
    type="submit"
    startIcon={<SendIcon />}
    sx={{
      borderRadius: "25px",
      textTransform: "none",
      fontWeight: "bold",
      px: 5,
      py: 1.4,
      color:
  theme.palette.mode === "light"
    ? "#ffffff"
    : "#020617",
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
      boxShadow: "none",
      "&:hover": {
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
        transform: "scale(1.04)",
      },
      transition: "transform 0.2s ease",
    }}
  >
    Enviar mensaje
  </Button>
</motion.div>
        </Box>

        {/* ================= ALERT ================= */}
        <Snackbar
          open={success}
          autoHideDuration={3500}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            top: "50% !important",
            transform: "translateY(-50%)",
          }}
        >
          <Alert
            severity="success"
            icon={false}
            sx={{
              px: 4,
              py: 2,
              borderRadius: 3,
              fontWeight: 600,
              textAlign: "center",
              fontSize: "0.95rem",
              color: theme.palette.mode === "dark" ? "#dcfce7" : "#14532d",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #064e3b, #022c22)"
                  : "linear-gradient(135deg, #dcfce7, #bbf7d0)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 20px 40px rgba(0,0,0,0.6)"
                  : "0 20px 40px rgba(22,163,74,0.35)",
            }}
          >
            <strong>¡Mensaje enviado con éxito!</strong>
            <br />
            Me pondré en contacto contigo lo antes posible 
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
        : "rgba(255,255,255,0.75)",
    backdropFilter: "blur(14px)",

    outline: "none",

    "& input": {
      outline: "none",
      fontWeight: 600,
      color:
        theme.palette.mode === "dark"
          ? "#ffffff"   
          : "#020617",  
    },

    "& textarea": {
      outline: "none",
      fontWeight: 600,
      color:
        theme.palette.mode === "dark"
          ? "#ffffff"
          : "#020617",
    },

    "& input::placeholder, & textarea::placeholder": {
      color:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.45)"
          : "rgba(2,6,23,0.45)",
      fontWeight: 400,
    },

    "& fieldset": {
      borderColor:
        theme.palette.mode === "dark"
          ? "rgba(96,165,250,0.35)"
          : "rgba(37,99,235,0.85)",
    },

    "&:hover fieldset": {
      borderColor:
        theme.palette.mode === "dark"
          ? theme.palette.primary.main
          : "#1d4ed8",
    },

    "&:hover": {
      boxShadow: "none",
    },

    "&.Mui-focused": {
      outline: "none",
    },

    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      boxShadow: "none",
    },
  },

  "& .MuiInputLabel-root": {
    color:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.85)"
        : "rgba(2,6,23,0.85)",
    fontWeight: 600,
  },
});

skills

import { useState, useRef, useEffect } from "react";
import BuildIcon from "@mui/icons-material/Build";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";

import { motion, AnimatePresence } from "framer-motion";

/* =========================
   DATA
========================= */

const categories = ["All", "Frontend", "Backend", "Database", "Cloud", "Tools"];

const skills = [
  { name: "React", category: "Frontend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "JavaScript", category: "Frontend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Spring", category: "Backend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Python", category: "Backend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "MySQL", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Postgres", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Supabase", category: "Database", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/supabase.svg" },
  { name: "AWS", category: "Cloud", img: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
  { name: "Vercel", category: "Cloud", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg" },
  { name: "Render", category: "Cloud", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/render.svg" },
  { name: "Postman", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "npm", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
  { name: "VirtualBox", category: "Tools", img: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/virtualbox.svg" },
  { name: "Git", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "AnyDesk", category: "Tools", img: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anydesk.svg" },
  { name: "MS Office", category: "Tools", img: "https://res.cloudinary.com/dqkwc0kf7/image/upload/v1768227236/office_732222_wevshn.png" },
  { name: "Ubuntu", category: "Tools", img: "https://res.cloudinary.com/dqkwc0kf7/image/upload/v1768394423/UbuntuCoF.svg_xjbvw9.png" },
  { name: "GitHub", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"},
  { name: "Elasticsearch", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg" },
  { name: "NextDNS", category: "Tools", img: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdns.svg" },
];

const categoryIcons = {
  All: <AllInclusiveIcon fontSize="small" />,
  Frontend: <CodeIcon fontSize="small" />,
  Backend: <BuildCircleIcon fontSize="small" />,
  Database: <StorageIcon fontSize="small" />,
  Cloud: <CloudQueueIcon fontSize="small" />,
  Tools: <BuildIcon fontSize="small" />,
};

/* =========================
   COMPONENT
========================= */

export default function Skills() {

  const [filter, setFilter] = useState("All");

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const primaryColor = isDark ? "#bbdefb" : "#1976d2";
  const primary = theme.palette.primary.main;

  const containerRef = useRef(null);
  const buttonRefs = useRef({});

  useEffect(() => {
    const activeBtn = buttonRefs.current[filter];
    const container = containerRef.current;

    if (activeBtn && container) {
      container.scrollTo({
        left:
          activeBtn.offsetLeft -
          container.offsetWidth / 2 +
          activeBtn.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  }, [filter]);

  const filteredSkills =
    filter === "All" ? skills : skills.filter((s) => s.category === filter);

  const cardBg = isDark
    ? "rgba(255,255,255,0.05)"
    : "rgba(255,255,255,0.85)";

  return (
    <Box id="skills" sx={{ py: 4, scrollMarginTop: "80px" }}>
      <Container>

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
              justifyContent: "center",
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
            <BuildIcon
              sx={{ fontSize: 22, color: primaryColor }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: primaryColor, lineHeight: 1 }}
            >
              Stack Tecnológico
            </Typography>
          </Box>
        </motion.div>

        {/* FILTERS */}

        <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>

          <Box
            ref={containerRef}
            sx={{
              maxWidth: "100%",
              overflowX: "auto",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >

            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={(e, val) => val && setFilter(val)}
              sx={{
                display: "inline-flex",
                gap: 1.2,
                py: 0.5,
              }}
            >

              {categories.map((cat) => (
                <ToggleButton
                  key={cat}
                  value={cat}
                  ref={(el) => (buttonRefs.current[cat] = el)}
                  component={motion.button}
                  whileTap={{ scale: 0.92 }}
                  sx={{
                    borderRadius: "999px",
                    px: 2.4,
                    py: 1,
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(255,255,255,0.9)",
                    border: `1px solid ${
                      isDark
                        ? "rgba(255,255,255,0.12)"
                        : "rgba(0,0,0,0.12)"
                    }`,
                    "&.Mui-selected": {
                      background: `linear-gradient(135deg, ${primary}, ${theme.palette.primary.dark})`,
                      color: "#fff",
                      borderColor: "transparent",
                    },
                  }}
                >
                  {categoryIcons[cat]}
                  {cat}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

          </Box>
        </Box>

        {/* GRID */}

        <Grid container spacing={4} justifyContent="center">

          <AnimatePresence mode="popLayout">

            {filteredSkills.map((skill) => (

              <Grid item xs={6} sm={4} md={3} key={skill.name}>

                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.35,
                    ease: "easeOut",
                  }}
                >

                  <Paper
                    sx={{
                      p: 3,
                      textAlign: "center",
                      borderRadius: "22px",
                      background: cardBg,
                      border: `1px solid ${
                        isDark
                          ? "rgba(255,255,255,0.15)"
                          : "rgba(0,0,0,0.12)"
                      }`,
                      transition: "all 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >

                    <Box
                      component={motion.img}
                      src={skill.img}
                      alt={skill.name}
                      whileHover={{
                        scale: 1.12,
                        rotate: [0, 3, -3, 2, 0],
                        y: -4,
                      }}
                      whileTap={{
                        scale: 0.94,
                        rotate: 180,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 16,
                      }}
                      sx={{
                        width: 65,
                        height: 65,
                        mb: 2,
                        objectFit: "contain",
                        filter: isDark
                          ? "invert(1) brightness(1.22)"
                          : "drop-shadow(0 0 5px rgba(0,0,0,0.22))",
                      }}
                    />

                    <Typography fontWeight="bold">
                      {skill.name}
                    </Typography>

                  </Paper>

                </motion.div>

              </Grid>

            ))}

          </AnimatePresence>

        </Grid>

      </Container>
    </Box>
  );
}

