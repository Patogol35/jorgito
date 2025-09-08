
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
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeIcon from "@mui/icons-material/Code";

export default function Navbar({ mode, setMode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();

  // Colores de menú adaptados según el modo
  const menuItems = [
    { label: "Sobre mí", href: "#hero", color: mode === "dark" ? "#42a5f5" : "#1565c0" },
    { label: "Educación", href: "#about", color: mode === "dark" ? "#66bb6a" : "#2e7d32" },
    { label: "Tecnologías", href: "#skills", color: mode === "dark" ? "#ffb74d" : "#f57c00" },
    { label: "Certificaciones", href: "#certifications", color: mode === "dark" ? "#ab47bc" : "#6a1b9a" },
    { label: "Proyectos", href: "#projects", color: mode === "dark" ? "#29b6f6" : "#0288d1" },
    { label: "Contacto", href: "#contact", color: mode === "dark" ? "#ef5350" : "#c62828" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.08, type: "spring", stiffness: 300 },
    }),
  };

  const handleScrollTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <AppBar
          position="fixed"
          elevation={scrolled ? 6 : 2}
          sx={{
            backgroundColor: scrolled
              ? theme.palette.primary.dark
              : theme.palette.primary.main,
            transition: "0.3s",
            zIndex: 1400,
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
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
                <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 200 }}>
                  <CodeIcon sx={{ mr: 1 }} />
                </motion.div>
                Jorge Patricio
              </Typography>
            </motion.div>

            {/* Menú Desktop */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, alignItems: "center" }}>
              {menuItems.map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => handleScrollTo(item.href)}
                    sx={{
                      color: item.color,
                      fontWeight: 600,
                      textTransform: "none",
                      fontSize: "1rem",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        width: 0,
                        height: 2,
                        bottom: 0,
                        left: 0,
                        backgroundColor: theme.palette.secondary.main,
                        transition: "0.3s",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </Box>

            {/* Botón móvil abrir menú */}
            <IconButton
              sx={{ display: { xs: "block", md: "none" }, color: theme.palette.common.white }}
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
              background: "rgba(0,0,0,0.5)",
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
              style={{
                width: "280px",
                background: theme.palette.background.paper,
                borderRadius: "16px 0 0 16px",
                padding: "2rem",
                boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
                display: "flex",
                flexDirection: "column",
                height: "auto",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
                >
                  Menú
                </Typography>
                <IconButton onClick={() => setOpen(false)} sx={{ color: theme.palette.text.primary }}>
                  <CloseIcon fontSize="large" />
                </IconButton>
              </Box>

              {/* Links menú móvil */}
              <Stack spacing={2}>
                {menuItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    onClick={() => handleScrollTo(item.href)}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.05 }}
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      color: item.color,
                      cursor: "pointer",
                      padding: "0.8rem 1rem",
                      borderRadius: "8px",
                      backgroundColor:
                        mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.05)",
                      transition: "0.3s",
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
