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

function App() {
  const storedMode = localStorage.getItem("themeMode") || "light";
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
          ...(mode === "light"
            ? {
                background: {
                  default: "#f5f7fa",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#111",
                },
              }
            : {
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
                text: {
                  primary: "#ffffff",
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ minHeight: "100vh", overflowX: "hidden" }}>
        {/* NAVBAR */}
        <Navbar mode={mode} setMode={setMode} />

        {/* HERO */}
        <Hero mode={mode} setMode={setMode} />

        {/* CONTENIDO */}
        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            py: 6,
            px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 },
          }}
        >
          {[
            { id: "about", color: "#2e7d32", Component: About },
            { id: "skills", color: "#fb8c00", Component: Skills },
            { id: "certifications", color: "#8e24aa", Component: Certifications },
            { id: "projects", color: "#1976d2", Component: Projects },
            { id: "contact", color: "#d32f2f", Component: Contact },
          ].map(({ id, color, Component }) => (
            <Paper
              key={id}
              id={id}
              elevation={3}
              sx={{
                mb: 4,
                p: { xs: 3, md: 6 },
                borderRadius: 3,
                borderLeft: `10px solid ${color}`,
                scrollMarginTop: scrollOffset,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Component />
            </Paper>
          ))}
        </Container>

        {/* FOOTER */}
        <Footer />

        {/* BOTÓN FLOTANTE WHATSAPP */}
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

        {/* CHATBOT IA PERSONAL */}
        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;



import { Container, Typography, Box } from "@mui/material";
import { GitHub, LinkedIn, Facebook, Instagram, MailOutline, Share as ShareIcon } from "@mui/icons-material"; 
import { motion } from "framer-motion";
import GroupsIcon from "@mui/icons-material/Groups";
import EmailIcon from "@mui/icons-material/Email";
import SocialLinks from "./SocialLinks";
import React from "react";
import { useTheme } from "@mui/material/styles";

export default function Contact() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const socialLinks = [
    { icon: <GitHub />, color: isDark ? "#fff" : "#181717", href: "https://github.com/Patogol35" },
    { icon: <LinkedIn />, color: isDark ? "#90caf9" : "#0A66C2", href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2" },
    { icon: <Facebook />, color: isDark ? "#90caf9" : "#1877F2", href: "https://www.facebook.com/share/1C9RgHAPvL/" },
    { icon: <Instagram />, color: isDark ? "#f48fb1" : "#E4405F", href: "https://www.instagram.com/jorge_patricio_26" },
    { icon: <MailOutline />, color: isDark ? "#fff" : "#1976d2", href: "mailto:patogol3535@gmail.com" },
  ];

  return (
    <Box
      id="contact"
      sx={{
        py: 4,
        pb: 4,
        color: theme.palette.text.primary,
        scrollMarginTop: "80px",
      }}
    >
      <Container maxWidth="sm">
        {/* Encabezado tipo badge con icono + texto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "1.5rem" }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              px: 4,
              py: 1.2,
              borderRadius: "999px",
              background:
                isDark ? "rgba(144,202,249,0.1)" : "rgba(25,118,210,0.1)",
            }}
          >
            <GroupsIcon
              sx={{
                fontSize: 26,
                mr: 1.2,
                color: isDark ? "#bbdefb" : "#1976d2",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: isDark ? "#bbdefb" : "#1976d2",
              }}
            >
              Redes Sociales
            </Typography>
          </Box>
        </motion.div>

        {/* Redes sociales */}
        <SocialLinks socialLinks={socialLinks} size="40px" animated={true} spacing={2} />
      </Container>
    </Box>
  );
}




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
import AutoStoriesIcon from "@mui/icons-material/AutoStories"; // 📚 Libros

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
  {
    titulo: "Mis Libros Favoritos",
    link: "https://mislibrosfavoritos.vercel.app/",
    color: "#8b5cf6",
    icon: AutoStoriesIcon,
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
        transition={{ duration: 0.8, delay: i * 0.3 }}
        viewport={{ once: false }}
      >
        <Box sx={{ textAlign: "center", px: 1 }}>
          <Icon sx={{ fontSize: 30, color: p.color }} />

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", mt: 1 }}
          >
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
  const badgeBg = isDark
    ? "rgba(144,202,249,0.1)"
    : "rgba(25,118,210,0.1)";

  return (
    <Box
      id="projects"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: palette.text.primary,
      }}
    >
      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            px: 4,
            py: 1.2,
            borderRadius: "999px",
            background: badgeBg,
          }}
        >
          <WorkOutlineIcon
            sx={{ fontSize: 26, mr: 1.2, color: primaryColor }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: primaryColor }}
          >
            Algunos Proyectos
          </Typography>
        </Box>
      </motion.div>

      {/* Grid de proyectos */}
      <Grid container spacing={3} justifyContent="center">
        {proyectos.map((p, i) => (
          <ProjectCard key={p.titulo} p={p} i={i} palette={palette} />
        ))}
      </Grid>
    </Box>
  );
}


import { Typography, Grid, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Brain } from "lucide-react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const certificaciones = [
  { titulo: "Curso de React.js", institucion: "Platzi", año: 2025, iconColor: "#1976d2", iconType: BookOpen },
  { titulo: "React & TypeScript - The Practical Guide", institucion: "Udemy", año: 2024, iconColor: "#d97706", iconType: BookOpen },
  { titulo: "Curso de Preparación para la Certificación AZ900: Microsoft Azure Fundamentals", institucion: "Universidad Internacional de la Rioja", año: 2023, iconColor: "#e11d48", iconType: GraduationCap },
  { titulo: "Curso de Python", institucion: "Platzi", año: 2025, iconColor: "#22c55e", iconType: BookOpen },
  { titulo: "Data Analysis with Python", institucion: "freeCodeCamp", año: 2024, iconColor: "#9333ea", iconType: Brain },
  { titulo: "Fundamentos de la Inteligencia Artificial", institucion: "IBM", año: 2025, iconColor: "#1e40af", iconType: Brain },
  
];

export default function Certifications() {
  const { palette } = useTheme();
  const isDark = palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";
  const badgeBg = isDark ? "rgba(144,202,249,0.1)" : "rgba(25,118,210,0.1)";

  return (
    <Box
      id="certifications"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: palette.text.primary,
      }}
    >
      {/* Encabezado */}
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
            px: 4,
            py: 1.2,
            borderRadius: "999px",
            background: badgeBg,
          }}
        >
          <WorkspacePremiumIcon sx={{ fontSize: 26, mr: 1.2, color: primaryColor }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", color: primaryColor }}>
            Certificaciones
          </Typography>
        </Box>
      </motion.div>

      {/* Grid de certificaciones */}
      <Grid container spacing={3} justifyContent="center">
        {certificaciones.map(({ titulo, institucion, año, iconColor, iconType: Icon }, i) => (
          <Grid item xs={12} sm={6} md={4} key={titulo}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <Box sx={{ textAlign: "center", px: 1 }}>
                <Icon size={28} color={iconColor} />
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
                  {titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {institucion} | {año}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
    }


import { useState } from "react";
import BuildIcon from "@mui/icons-material/Build";
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

const categories = ["All", "Frontend", "Backend", "Database", "Cloud", "Tools"];

const skills = [
  { name: "React", category: "Frontend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "JavaScript", category: "Frontend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Spring Boot", category: "Backend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Python", category: "Backend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "MySQL", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Elasticsearch", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg" },
  { name: "Supabase", category: "Database", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/supabase.svg" },
  { name: "AWS", category: "Cloud", img: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
  { name: "Vercel", category: "Cloud", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg" },
  { name: "Render", category: "Cloud", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/render.svg" },
  { name: "Postman", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "npm", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
];

export default function Skills() {
  const [filter, setFilter] = useState("All");
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;

  const filteredSkills =
    filter === "All" ? skills : skills.filter((s) => s.category === filter);

  const cardBg = isDark
    ? "rgba(255,255,255,0.05)"
    : "rgba(255,255,255,0.8)";

  return (
    <Box
      id="skills"
      sx={{ py: 4, scrollMarginTop: "80px", color: theme.palette.text.primary }}
    >
      <Container>
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              px: 4,
              py: 1.2,
              borderRadius: "999px",
              background: isDark
                ? "rgba(144,202,249,0.1)"
                : "rgba(25,118,210,0.1)",
            }}
          >
            <BuildIcon
              sx={{ fontSize: 26, mr: 1.2, color: isDark ? "#bbdefb" : "#1976d2" }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: isDark ? "#bbdefb" : "#1976d2",
              }}
            >
              Stack Tecnológico
            </Typography>
          </Box>
        </motion.div>

        {/* Filtros */}
        <Box display="flex" justifyContent="center" mb={6}>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(e, val) => val && setFilter(val)}
            aria-label="Filtros de Skills"
            sx={{
              background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)",
              borderRadius: "12px",
              boxShadow: isDark
                ? "0 4px 12px rgba(0,0,0,0.3)"
                : "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            {categories.map((cat) => (
              <ToggleButton
                key={cat}
                value={cat}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 1.5,
                  py: 0.5,
                  fontSize: "0.85rem",
                  color: theme.palette.text.primary,
                  "&.Mui-selected": {
                    background: `linear-gradient(90deg, ${primary}, #6d28d9)`,
                    color: "white",
                  },
                  "&:hover": {
                    background: "linear-gradient(90deg,#2563eb,#4f46e5)",
                    color: "white",
                  },
                }}
              >
                {cat}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Grid de Skills */}
        <Grid container spacing={4} justifyContent="center">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <Grid item xs={6} sm={4} md={3} key={skill.name}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08 }}
                >
                  <Paper
                    elevation={8}
                    sx={{
                      p: 3,
                      textAlign: "center",
                      borderRadius: "20px",
                      backdropFilter: "blur(12px)",
                      background: cardBg,
                      boxShadow: isDark
                        ? "0 8px 20px rgba(0,0,0,0.5)"
                        : "0 8px 20px rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        background: isDark
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(255,255,255,0.95)",
                        boxShadow: isDark
                          ? "0 12px 24px rgba(0,0,0,0.6)"
                          : "0 12px 24px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={skill.img}
                      alt={skill.name}
                      sx={{
                        width: 65,
                        height: 65,
                        objectFit: "contain",
                        mb: 2,
                        transition: "transform 0.3s ease, filter 0.3s ease",
                        filter: isDark ? "invert(1) brightness(1.2)" : "none",
                        "&:hover": { transform: "rotate(8deg) scale(1.1)" },
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{
                        transition: "color 0.3s",
                        color: theme.palette.text.primary,
                        "&:hover": { color: primary },
                      }}
                    >
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





import { Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react"; // ✅ solo una librería
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

  // 🎯 Estilos reutilizables
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
      {/* Encabezado con badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }} // 🔑 mantiene reanimación cada vez
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            px: 4,
            py: 1.2,
            borderRadius: "999px",
            background: isDark
              ? "rgba(144,202,249,0.1)"
              : "rgba(25,118,210,0.1)",
          }}
        >
          <GraduationCap
            size={26}
            style={{
              marginRight: "0.8rem",
              color: isDark ? "#bbdefb" : "#1976d2",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: isDark ? "#bbdefb" : "#1976d2",
            }}
          >
            Formación
          </Typography>
        </Box>
      </motion.div>

      {/* Grid de estudios */}
      <Grid container spacing={3} justifyContent="center">
        {estudios.map((est, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.3 }} // 🔑 misma secuencia
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




import { Toolbar, Box, Typography, Button, Avatar } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

export default function Hero({ mode, setMode }) {
  const theme = useTheme();

  return (
    <>
      <Toolbar />

      <Box
        id="hero"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, md: 8 },
          pt: { xs: 6, sm: 8, md: 10 },
          pb: { xs: 1.5, sm: 2.5, md: 3 },
          px: { xs: 2, sm: 4, md: 8 },
          color: theme.palette.text.primary,
        }}
      >
        {/* Avatar animado */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ borderRadius: "50%" }}
        >
          <Avatar
            alt="Jorge Patricio"
            src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1757093856/FB_IMG_1757092624480_hgpu4i.jpg"
            sx={{
              width: { xs: 130, sm: 170, md: 200 },
              height: { xs: 130, sm: 170, md: 200 },
              border: `4px solid ${theme.palette.primary.main}`,
            }}
          />
        </motion.div>

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            textAlign={{ xs: "center", sm: "left" }}
            maxWidth="600px"
            mx="auto"
          >
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

            <Typography
              variant="h6"
              color="text.secondary"
              gutterBottom
              sx={{ fontStyle: "italic" }}
            >
              🎓 Máster en Ingeniería de Software y Sistemas Informáticos
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.08rem" },
                lineHeight: 1.9,
                letterSpacing: "0.3px",
                fontWeight: 400,
                color: theme.palette.text.primary,
                opacity: theme.palette.mode === "dark" ? 0.85 : 0.9,
                maxWidth: "520px",
                mt: { xs: 3, sm: 3.5 },
                mb: { xs: 4, sm: 5 },
              }}
            >
              Me apasiona crear tecnología que transforma ideas en realidades
              digitales. Mi enfoque está en aportar valor constante,
              desarrollando soluciones digitales seguras, innovadoras y
              orientadas a generar impacto positivo.
            </Typography>

            {/* Botones */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: { xs: "center", sm: "flex-start" },
                flexWrap: "wrap",
              }}
            >
              {/* CV */}
              <Button
                variant="contained"
                startIcon={<DescriptionIcon />}
                href="/Jorge.CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderRadius: "25px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: { xs: 3.5, md: 5 },
                  py: 1.4,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                  },
                }}
              >
                Ver CV
              </Button>

              {/* Título */}
              <Button
                variant="contained"
                startIcon={<WorkspacePremiumIcon />}
                href="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1759022233/image_b835ddca-c010-4f78-a300-676248ea3fd120250927_201635_cizk17.jpg"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderRadius: "25px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: { xs: 3.5, md: 5 },
                  py: 1.4,
                  background: `linear-gradient(90deg, #3b82f6, ${theme.palette.primary.main})`,
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                  },
                }}
              >
                Ver Título
              </Button>

              {/* Sasha */}
              <Button
                variant="contained"
                startIcon={<SmartToyIcon />}
                onClick={() => {
                  if (window.openSashaChat) window.openSashaChat();
                }}
                sx={{
                  borderRadius: "25px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: { xs: 3.5, md: 5 },
                  py: 1.4,
                  minHeight: 48,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                  },
                  "&:active": {
                    transform: "none",
                  },
                }}
              >
                Sasha
              </Button>

              {/* Modo oscuro/claro */}
              <Button
                variant="outlined"
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
                sx={{
                  minWidth: 48,
                  width: 48,
                  height: 48,
                  padding: 0,
                  borderRadius: "50%",
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  "&:hover": {
                    background: theme.palette.primary.main,
                    color: "#fff",
                  },
                }}
              >
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </>
  );
}
