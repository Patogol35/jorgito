import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
          {/* Logo con icono */}
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

      {/* Drawer móvil */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            background: "linear-gradient(180deg, #f5f5f5, #e8f0ff)",
            width: 260,
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 3, color: "#1976d2" }}
          >
            Navegación
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component="a"
                  href={item.href}
                  onClick={() => setOpen(false)}
                  sx={{
                    "&:hover": { backgroundColor: "rgba(25,118,210,0.1)" },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
