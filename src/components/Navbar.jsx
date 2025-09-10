import { useState, useMemo, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { Brightness4, Brightness7, Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

// Ejemplo de items de menú
const menuItems = [
  { label: "Inicio", href: "#inicio", color: "#2196f3" },
  { label: "Servicios", href: "#servicios", color: "#4caf50" },
  { label: "Portafolio", href: "#portafolio", color: "#ff9800" },
  { label: "Contacto", href: "#contacto", color: "#e91e63" },
];

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 },
  }),
};

export default function Navbar() {
  const [mode, setMode] = useState("light");
  const [open, setOpen] = useState(false);

  // Guardar tema en localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) setMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#1976d2" : "#90caf9",
          },
        },
      }),
    [mode]
  );

  const handleScrollTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="primary" sx={{ backdropFilter: "blur(6px)" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Mi Portafolio
          </Typography>

          {/* Menú Desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, alignItems: "center" }}>
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
                      background: mode === "dark" ? "#03a9f4" : "#26c6da", // 🔥 Hover dinámico
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

          {/* Botón menú móvil */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

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
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(6px)", // 🔥 Fondo difuminado
              zIndex: 1300,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%", scale: 0.95, opacity: 0 }}
              animate={{ x: 0, scale: 1, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              style={{
                width: "300px",
                background:
                  mode === "dark"
                    ? "linear-gradient(135deg, #1e1e1e, #2c2c2c)"
                    : "linear-gradient(135deg, #1976d2, #42a5f5)", // 🔥 Gradiente según modo
                borderRadius: "20px 0 0 20px",
                padding: "2rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.6)", // 🔥 Sombra fuerte
                display: "flex",
                flexDirection: "column",
                maxHeight: "85vh",
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
                <IconButton
                  onClick={() => setOpen(false)}
                  sx={{ color: "#fff", "&:hover": { scale: "1.2", rotate: "90deg" } }}
                >
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
                  "&:hover": {
                    background: "rgba(255,255,255,0.15)",
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                  },
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
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                    }}
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      color: "#fff",
                      cursor: "pointer",
                      padding: "0.9rem 1rem",
                      borderRadius: "12px",
                      background: item.color,
                      transition: "all 0.3s ease",
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
    </ThemeProvider>
  );
}
