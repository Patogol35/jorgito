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
import { Brightness4, Brightness7 } from "@mui/icons-material";
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

import { translations } from "./i18n";

function App() {
  const [mode, setMode] = useState(() =>
    localStorage.getItem("themeMode") || "dark"
  );

  const [lang, setLang] = useState(() =>
    localStorage.getItem("lang") || "es"
  );

  const scrollOffset = "80px";

  // 🔥 Persistencia
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
  const handleBefore = () => {
    const sections = document.querySelectorAll("section, [id]");
    for (let sec of sections) {
      const rect = sec.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
        localStorage.setItem("currentSection", sec.id);
        break;
      }
    }
  };

  const handleAfter = () => {
    const id = localStorage.getItem("currentSection");
    if (!id) return;

    requestAnimationFrame(() => {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "auto",
          block: "start",
        });

        // 🧹 limpiar para evitar basura en memoria
        localStorage.removeItem("currentSection");
      }, 80);
    });
  };

  window.addEventListener("orientationchange", handleBefore);
  window.addEventListener("resize", handleAfter);

  return () => {
    window.removeEventListener("orientationchange", handleBefore);
    window.removeEventListener("resize", handleAfter);
  };
}, []);

  const t = translations[lang] || translations["es"];

  // 🎨 Theme optimizado
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#1976d2" },
          secondary: { main: "#ffeb3b" },
          background: {
  default: mode === "dark" ? "#0a0a0a" : "#F8FAFC",
  paper: mode === "dark" ? "#121212" : "#ffffff",
},
          text: {
            primary: mode === "dark" ? "#ffffff" : "#111111",
          },
        },
        typography: {
          fontFamily: "Poppins, Roboto, sans-serif",
          h2: { fontWeight: 700 },
          h4: { fontWeight: 600 },
        },
        shape: {
          borderRadius: 12,
        },
      }),
    [mode]
  );

  //  Memo de secciones 
  const sections = useMemo(
  () => [
    { id: "about", color: "#2DD4BF", Component: About },
    { id: "projects", color: "#60A5FA", Component: Projects },
    { id: "skills", color: "#A78BFA", Component: Skills },
    { id: "certifications", color: "#D4AF37", Component: Certifications },
    { id: "contact", color: "#FB7185", Component: Contact },
    { id: "form", color: "#2DD4BF", Component: Form },
  ],
  []
);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
  sx={(theme) => ({
    minHeight: "100vh",
    overflowX: "hidden",

    background:
  theme.palette.mode === "dark"
    ? "#0a0a0a"
    : `
      radial-gradient(circle at top left, rgba(255,255,255,0.6), transparent 30%),
      linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)
    `,
  })}
>
        <Navbar mode={mode} setMode={setMode} t={t} lang={lang} />

        <Hero
          mode={mode}
          setMode={setMode}
          t={t}
          lang={lang}
          setLang={setLang}
        />

        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            py: 6,
            px: { xs: 1, sm: 2, md: 3, lg: 4 },
          }}
        >
          {sections.map(({ id, color, Component }) => (

<Paper
  key={id}
  id={id}
  elevation={0}
  sx={(theme) => {
    const backgrounds = {
      about:
        theme.palette.mode === "dark"
          ? "linear-gradient(135deg, #102a2b 0%, #123c3d 45%, #172b38 100%)"
          : "linear-gradient(135deg, #e8f5f2 0%, #d9f0ec 45%, #e6eef5 100%)",

      projects:
        theme.palette.mode === "dark"
          ? "linear-gradient(135deg, #101d3b 0%, #172b55 45%, #241d45 100%)"
          : "linear-gradient(135deg, #e9f0ff 0%, #dce8ff 50%, #eee9ff 100%)",

      skills:
        theme.palette.mode === "dark"
          ? "linear-gradient(135deg, #201b38 0%, #30264a 50%, #3a2d1d 100%)"
          : "linear-gradient(135deg, #eeeaff 0%, #e7e1fa 50%, #fff2df 100%)",

      certifications:
        theme.palette.mode === "dark"
          ? "linear-gradient(135deg, #302719 0%, #45351b 50%, #241c2c 100%)"
          : "linear-gradient(135deg, #fff6df 0%, #f8ecd0 50%, #eee7f4 100%)",

      contact:
        theme.palette.mode === "dark"
          ? "linear-gradient(135deg, #291a27 0%, #3b202d 50%, #19283c 100%)"
          : "linear-gradient(135deg, #fae9ef 0%, #f5dfe7 50%, #e6eef8 100%)",

      form:
        theme.palette.mode === "dark"
          ? "linear-gradient(135deg, #102c2c 0%, #164544 50%, #172d3c 100%)"
          : "linear-gradient(135deg, #e3f6f2 0%, #d8f0eb 50%, #e3edf5 100%)",
    };

    return {
      mb: 4,
      p: { xs: 3, md: 5 },
      borderRadius: "18px",

      background: backgrounds[id],

      border: `1.5px solid ${color}70`,

      boxShadow:
        theme.palette.mode === "dark"
          ? `
            0 10px 30px rgba(0, 0, 0, 0.40),
            inset 0 1px 0 rgba(255,255,255,0.04)
          `
          : `
            0 10px 30px rgba(15, 23, 42, 0.08),
            inset 0 1px 0 rgba(255,255,255,0.8)
          `,

      scrollMarginTop: scrollOffset,

      transition:
        "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",

      willChange: "transform",

      "&:hover": {
        transform: "translateY(-4px) scale(1.01)",

        border: `1.5px solid ${color}`,

        boxShadow:
          theme.palette.mode === "dark"
            ? `
              0 16px 40px rgba(0,0,0,0.55),
              0 0 25px ${color}20
            `
            : `
              0 16px 40px rgba(15,23,42,0.12),
              0 0 20px ${color}18
            `,
      },
    };
  }}
>
  <Component t={t} />
</Paper>


          
          ))}
        </Container>

        <Footer t={t} />

        {/* WhatsApp */}
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

{/* Tema */}
<Tooltip title="Cambiar tema" placement="right">
  <Fab
    aria-label="tema"
    onClick={() => setMode(mode === "light" ? "dark" : "light")}
    sx={(theme) => ({
      position: "fixed",
      top: 90,     // 👈 MISMA ALTURA QUE IDIOMA
      left: 16,    // 👈 lado izquierdo
      zIndex: 1200,

      bgcolor:
        theme.palette.mode === "dark"
          ? theme.palette.grey[900]
          : theme.palette.primary.main,

      color: "#fff",
      width: 52,
      height: 52,
      boxShadow: "none",

      transition: "background-color 0.25s ease, transform 0.2s ease",

      "&:hover": {
        bgcolor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[800]
            : theme.palette.primary.dark,
      },

      "&:active": {
        transform: "scale(0.95)",
      },
    })}
  >
    {mode === "light" ? <Brightness4 /> : <Brightness7 />}
  </Fab>
</Tooltip>
        {/* Idioma */}
        <Tooltip title="Cambiar idioma" placement="left">
  <Fab
    aria-label="idioma"
    disableRipple
    disableFocusRipple
    disableTouchRipple
    onClick={() => setLang(lang === "es" ? "en" : "es")}
    sx={(theme) => ({
      position: "fixed",
      top: 90,
      right: 16,
      zIndex: 1200,

      bgcolor:
        theme.palette.mode === "dark"
          ? theme.palette.grey[900]
          : theme.palette.primary.main,

      color: "#fff",
      width: 52,
      height: 52,
      fontWeight: 800,
      fontSize: "1rem",
      letterSpacing: "1px",
      boxShadow: "none",

      // 🔥 MISMO FIX
      transition: "background-color 0.25s ease, transform 0.2s ease",
      willChange: "background-color",

      "&:hover": {
        bgcolor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[800]
            : theme.palette.primary.dark,
      },

      "&:active": {
        transform: "scale(0.95)",
      },
    })}
  >
    {lang === "es" ? "EN" : "ES"}
  </Fab>
</Tooltip>
        <ChatBot t={t} lang={lang} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
