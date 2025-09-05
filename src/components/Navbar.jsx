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

  const menuItems = [
    { label: "Sobre mí", href: "#hero" },
    { label: "Educación", href: "#about" },
    { label: "Tecnologías", href: "#skills" },
    { label: "Certificaciones", href: "#certifications" },
    { label: "Contacto", href: "#contact" },
  ];

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

  return (
    <>
      {/* Navbar sólido */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#1976d2",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
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
                color: "#fff",
                letterSpacing: 1,
                cursor: "pointer",
              }}
            >
              <CodeIcon sx={{ mr: 1 }} /> Jorge Dev
            </Typography>
          </motion.div>

          {/* Menú Desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {menuItems.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  href={item.href}
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
                  }}
                >
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </Box>

          {/* Botón móvil */}
          <IconButton sx={{ display: { xs: "block", md: "none" } }} onClick={() => setOpen(true)}>
            <MenuIcon sx={{ color: "#fff" }} fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Menú móvil moderno */}
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
                height: "100%",
                background: "linear-gradient(180deg, #1565c0, #1976d2)",
                borderRadius: "12px 0 0 12px",
                padding: "2rem",
                position: "absolute",
                top: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
                  Menú
                </Typography>
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon sx={{ color: "#fff" }} fontSize="large" />
                </IconButton>
              </Box>

              <Stack spacing={3}>
                {menuItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.05, color: "#ffeb3b" }}
                    onClick={() => setOpen(false)}
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      color: "#fff",
                      cursor: "pointer",
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
