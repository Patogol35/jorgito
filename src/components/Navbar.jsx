import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeIcon from "@mui/icons-material/Code";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const menuItems = [
  { label: "Sobre mí", href: "#hero", color: "linear-gradient(135deg, #0288d1, #26c6da)" },
  { label: "Educación", href: "#about", color: "linear-gradient(135deg, #2e7d32, #66bb6a)" },
  { label: "Tecnologías", href: "#skills", color: "linear-gradient(135deg, #f57c00, #ffb74d)" },
  { label: "Certificaciones", href: "#certifications", color: "linear-gradient(135deg, #6a1b9a, #ab47bc)" },
  { label: "Proyectos", href: "#projects", color: "linear-gradient(135deg, #0288d1, #03a9f4)" },
  { label: "Contacto", href: "#contact", color: "linear-gradient(135deg, #c62828, #ef5350)" },
];

const menuVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring", stiffness: 200, damping: 25 } },
  exit: { x: "100%", transition: { type: "spring", stiffness: 200, damping: 25 } },
};

const itemVariants = {
  hidden: { x: 40, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.1, type: "spring", stiffness: 250, damping: 18 },
  }),
};

function useSmoothScroll(offset = -70) {
  return (id) => {
    const element = document.querySelector(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
}

export default function Navbar({ mode, setMode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const handleScrollTo = useSmoothScroll(-70);
  const menuRef = useRef(null);

  // Cambia estado scrolled en scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (open) setOpen(false); // cerrar menú al hacer scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  // Bloquear scroll del body cuando menú esté abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      menuRef.current?.focus();
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <>
      {/* Barra de navegación */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <AppBar
          position="fixed"
          elevation={scrolled ? 6 : 2}
          sx={{
            backgroundColor:
              mode === "dark"
                ? "#121212"
                : scrolled
                ? theme.palette.primary.dark
                : theme.palette.primary.main,
            transition: "all 0.3s ease",
            boxShadow: scrolled ? "0 4px 16px rgba(0,0,0,0.25)" : "none",
            zIndex: 1400,
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                  color: theme.palette.common.white,
                  letterSpacing: 1,
                  cursor: "pointer",
                }}
                onClick={() => handleScrollTo("#hero")}
              >
                <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 200 }}>
                  <CodeIcon sx={{ mr: 1 }} />
                </motion.div>
                Jorge Patricio
              </Typography>
            </motion.div>

{/* Menú Desktop */}
<Box sx={{ display: { xs: "none", lg: "flex" }, gap: 3, alignItems: "center" }}>
  {menuItems.map((item) => (
    <motion.div key={item.href} whileHover={{ y: -2, scale: 1.08 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={() => handleScrollTo(item.href)}
        sx={{
          color: mode === "dark" ? "#fff" : theme.palette.common.white,
          fontWeight: 600,
          textTransform: "none",
          fontSize: "1rem",
          position: "relative",
          transition: "all 0.25s ease",
          padding: "6px 12px",
          borderRadius: "8px",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "8px",
            background: mode === "dark" ? "#03a9f4" : "#26c6da",
            opacity: 0,
            transform: "scaleX(0.6)",
            transformOrigin: "center",
            transition: "all 0.35s ease",
            zIndex: -1,
          },
          "&:hover::before": {
            opacity: 1,
            transform: "scaleX(1)",
          },
          "&:hover": {
            color: "#fff",
            textShadow: "0 0 8px rgba(0,0,0,0.5)",
            boxShadow: mode === "dark" ? "0 0 10px #03a9f4" : "0 0 12px #26c6da",
          },
        }}
      >
        {item.label}
      </Button>
    </motion.div>
  ))}

  {/* Botón modo oscuro/claro */}
  <IconButton
    onClick={() => setMode(mode === "light" ? "dark" : "light")}
    sx={{
      color: theme.palette.common.white,
      transition: "all 0.25s ease",
      "&:hover": { transform: "scale(1.15)" },
    }}
  >
    {mode === "light" ? <Brightness4 /> : <Brightness7 />}
  </IconButton>
</Box>

{/* Botón móvil abrir menú */}
<IconButton
  sx={{ display: { xs: "block", lg: "none" }, color: theme.palette.common.white }}
  onClick={() => setOpen(true)}
>
  <MenuIcon fontSize="large" />
</IconButton>

          </Toolbar>
        </AppBar>
      </motion.div>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(6px)",
              zIndex: 1300,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              ref={menuRef}
              tabIndex={-1}
              style={{
                width: "280px",
                background: mode === "dark" ? "rgba(30,30,30,0.95)" : theme.palette.primary.main,
                borderRadius: "16px 0 0 16px",
                padding: "2rem",
                boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
                display: "flex",
                flexDirection: "column",
                maxHeight: "80vh",
                overflowY: "auto",
                transition: "all 0.3s ease",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Encabezado */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
                  Menú
                </Typography>
                <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff", "&:hover": { scale: "1.1" } }}>
                  <CloseIcon fontSize="large" />
                </IconButton>
              </Box>

              {/* Botón modo oscuro/claro */}
              <Button
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
                startIcon={mode === "light" ? <Brightness4 /> : <Brightness7 />}
                sx={{
                  color: "#fff",
                  border: "1px solid #fff",
                  textTransform: "none",
                  mb: 3,
                  fontWeight: "bold",
                  borderRadius: "10px",
                  transition: "all 0.3s ease",
                  "&:hover": { background: "rgba(255,255,255,0.12)", transform: "scale(1.03)" },
                }}
              >
                {mode === "light" ? "Modo Noche" : "Modo Día"}
              </Button>

              {/* Links menú móvil */}
              <Stack spacing={2}>
                {menuItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    onClick={() => {
                      handleScrollTo(item.href);
                      setOpen(false);
                    }}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      color: "#fff",
                      cursor: "pointer",
                      padding: "0.9rem 1rem",
                      borderRadius: "10px",
                      background: item.color,
                      transition: "all 0.3s ease",
                      boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </Stack>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
