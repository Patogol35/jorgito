import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function Navbar({ mode, setMode }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setOpen(open);
  };

  const sections = [
    { text: "Sobre mí", id: "about" },
    { text: "Educación", id: "education" },
    { text: "Proyectos", id: "projects" },
    { text: "Certificaciones", id: "certifications" },
    { text: "Contacto", id: "contact" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <>
      {/* Barra superior */}
      <AppBar
        position="fixed"
        sx={{
          background: theme.palette.background.paper,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Mi Portafolio
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            {/* Botón cambio tema (icono solo) */}
            <IconButton
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              color="inherit"
            >
              {mode === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>

            {/* Botón menú */}
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menú lateral */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          {/* Encabezado menú */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6">Menú</Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Botón cambio tema con texto */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mb: 3,
            }}
          >
            <Button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              variant="outlined"
              startIcon={mode === "light" ? <Brightness4 /> : <Brightness7 />}
              sx={{
                borderColor: theme.palette.text.primary,
                color: theme.palette.text.primary,
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { background: theme.palette.action.hover },
              }}
            >
              {mode === "light" ? "Modo Oscuro" : "Modo Claro"}
            </Button>
          </Box>

          {/* Lista de secciones */}
          <List>
            {sections.map((section) => (
              <ListItem
                button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
              >
                <ListItemText primary={section.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
