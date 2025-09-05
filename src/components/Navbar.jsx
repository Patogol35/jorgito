import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [elev, setElev] = useState(0);

  useEffect(() => {
    const onScroll = () => setElev(window.scrollY > 50 ? 4 : 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = [
    { label: "Sobre mí", href: "#about" },
    { label: "Tecnologías", href: "#skills" },
    { label: "Proyectos", href: "#projects" },
    { label: "Contacto", href: "#contact" },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={elev}
      color="transparent"
      sx={{
        backdropFilter: "blur(15px)",
        backgroundColor: "rgba(255,255,255,0.6)",
        transition: "0.3s",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: "#1976d2",
            letterSpacing: 1,
          }}
        >
          Jorge Dev
        </Typography>

        {/* Links animados */}
        {menuItems.map((item, i) => (
          <motion.div
            key={item.href}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Button
              color="inherit"
              href={item.href}
              sx={{
                mx: 1,
                fontWeight: "600",
                color: "#333",
                "&:hover": { color: "#1976d2" },
              }}
            >
              {item.label}
            </Button>
          </motion.div>
        ))}
      </Toolbar>
    </AppBar>
  );
}
