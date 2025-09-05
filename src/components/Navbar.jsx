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
  const [elev, setElev] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setElev(window.scrollY > 50 ? 4 : 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = [
    { label: "Sobre mí", href: "#hero" },
    { label: "Educación", href: "#about" },
    { label: "Tecnologías", href: "#skills" },
    { label: "Certificaciones", href: "#certifications" },
    { label: "Contacto", href: "#contact" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={elev}
        sx={{
          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(255,255,255,0.75)",
          transition: "0.3s",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
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
                color: "#1976d2",
                letterSpacing: 1,
                cursor: "pointer",
              }}
            >
              <CodeIcon sx={{ mr: 1 }} /> Jorge Dev
            </Typography>
          </motion.div>

          {/* Menú desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {menuItems.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Button
                  href={item.href}
                  sx={{
                    color: "#333",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": { color: "#1976d2", backgroundColor: "transparent" },
                  }}
                >
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </Box>

          {/* Botón hamburguesa móvil */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon sx={{ color: "#1976d2" }} />
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
              right: 0,
              bottom: 0,
              left: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 1300,
            }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                width: "260px",
                height: "100%",
                background: "#f5f5f5",
                padding: "2rem 1rem",
                position: "absolute",
                top: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Stack direction="row" justifyContent="space-between" mb={4}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                  Menú
                </Typography>
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Stack>

              <Stack spacing={2}>
                {menuItems.map((item) => (
                  <Button
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      fontWeight: 600,
                      color: "#333",
                      "&:hover": { color: "#1976d2", backgroundColor: "transparent" },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
                }
