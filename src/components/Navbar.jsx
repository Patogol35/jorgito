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
import Brightness4 from "@mui/icons-material/Brightness4";
import Brightness7 from "@mui/icons-material/Brightness7";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Navbar({ mode, setMode }) {
  const theme = useTheme();
  const [active, setActive] = useState("#sobremi");
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Sobre mí", href: "#sobremi", color: "linear-gradient(90deg,#00c6ff,#0072ff)" },
    { label: "Educación", href: "#educacion", color: "linear-gradient(90deg,#43e97b,#38f9d7)" },
    { label: "Tecnologías", href: "#tecnologias", color: "linear-gradient(90deg,#ff6a00,#ee0979)" },
    { label: "Certificaciones", href: "#certificaciones", color: "linear-gradient(90deg,#f7971e,#ffd200)" },
    { label: "Proyectos", href: "#proyectos", color: "linear-gradient(90deg,#8e2de2,#4a00e0)" },
    { label: "Contacto", href: "#contacto", color: "linear-gradient(90deg,#00b09b,#96c93d)" },
  ];

  const handleScrollTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActive(id);
      setOpen(false);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(90deg,#1e3c72,#2a5298)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, letterSpacing: 1, cursor: "pointer", color: "#fff" }}
          onClick={() => handleScrollTo("#sobremi")}
        >
          &lt;/&gt; Jorge Patricio
        </Typography>

        {/* Menú Desktop */}
        <Box
          sx={{
            display: { xs: "none", lg: "flex" }, // solo desde pantallas grandes
            gap: 3,
            alignItems: "center",
          }}
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.href}
              whileHover={{ y: -2, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => handleScrollTo(item.href)}
                aria-current={active === item.href ? "page" : undefined}
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "1rem",
                  borderRadius: "10px",
                  padding: "0.5rem 1rem",
                  transition: "all 0.3s ease",
                  background: active === item.href ? item.color : "transparent",
                  boxShadow: active === item.href ? "0 0 12px rgba(0,0,0,0.35)" : "none",
                  "&:hover": {
                    background: item.color,
                    color: "#fff",
                    boxShadow: "0 0 15px rgba(0,0,0,0.4)",
                  },
                }}
              >
                {item.label}
              </Button>
            </motion.div>
          ))}

          {/* Botón modo oscuro/claro */}
          <motion.div whileTap={{ rotate: 180 }}>
            <IconButton
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              sx={{ color: theme.palette.common.white }}
              aria-label="Cambiar tema"
            >
              {mode === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </motion.div>
        </Box>

        {/* Botón menú móvil */}
        <IconButton
          sx={{ display: { xs: "block", lg: "none" }, color: theme.palette.common.white }}
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      </Toolbar>

      {/* Menú móvil lateral */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "70%",
            height: "100vh",
            background: theme.palette.mode === "light" ? "#fff" : "#121212",
            boxShadow: "-4px 0 12px rgba(0,0,0,0.5)",
            zIndex: 1300,
            display: "flex",
            flexDirection: "column",
            p: 3,
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ alignSelf: "flex-end", color: theme.palette.text.primary }}
          >
            <CloseIcon />
          </IconButton>

          <Stack spacing={2} mt={2}>
            {menuItems.map((item) => (
              <Button
                key={item.href}
                onClick={() => handleScrollTo(item.href)}
                sx={{
                  justifyContent: "flex-start",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  color: active === item.href ? "#fff" : theme.palette.text.primary,
                  background: active === item.href ? item.color : "transparent",
                  borderRadius: "10px",
                  px: 2,
                  py: 1,
                  "&:hover": {
                    background: item.color,
                    color: "#fff",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}

            {/* Botón modo oscuro/claro en menú móvil */}
            <IconButton
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              sx={{ color: theme.palette.text.primary, mt: 2 }}
            >
              {mode === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Stack>
        </Box>
      )}
    </AppBar>
  );
}
