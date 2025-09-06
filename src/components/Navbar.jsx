import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeIcon from "@mui/icons-material/Code";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { label: "Sobre mí", href: "#hero", color: "#1565c0" },
    { label: "Educación", href: "#about", color: "#2e7d32" },
    { label: "Tecnologías", href: "#skills", color: "#f57c00" },
    { label: "Certificaciones", href: "#certifications", color: "#6a1b9a" },
    { label: "Proyectos", href: "#projects", color: "#0288d1" },
    { label: "Contacto", href: "#contact", color: "#c62828" },
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
            backgroundColor: scrolled ? "#125aa0" : "#1976d2",
            boxShadow: scrolled
              ? "0 6px 20px rgba(0,0,0,0.25)"
              : "0 4px 12px rgba(0,0,0,0.2)",
            transition: "0.3s",
            zIndex: 1400,
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                  color: "#fff",
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
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
              {menuItems.map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => handleScrollTo(item.href)}
                    sx={{
                      color: item.color, // 🔹 cada sección con su color profesional
                      fontWeight: 600,
                      textTransform: "none",
                      fontSize: "1rem",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        width: 0,
                        height: 2,
                        bottom: -2,
                        left: 0,
                        backgroundColor: "#fff",
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

            {/* Botón móvil */}
            <IconButton
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon sx={{ color: "#fff" }} fontSize="large" />
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
                background: "linear-gradient(180deg, #0d47a1, #1976d2)",
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
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ffeb3b" }}>
                  Menú
                </Typography>
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon sx={{ color: "#fff" }} fontSize="large" />
                </IconButton>
              </Box>

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
                      color: "#fff",
                      cursor: "pointer",
                      padding: "0.8rem 1rem",
                      borderRadius: "8px",
                      backgroundColor: item.color,
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
