import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [elev, setElev] = useState(0);

  useEffect(() => {
    const onScroll = () => setElev(window.scrollY > 50 ? 4 : 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppBar
      position="sticky"
      elevation={elev}
      color="transparent"
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255,255,255,0.7)",
        transition: "0.3s",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: "bold", color: "#1976d2" }}
        >
          Jorge Dev
        </Typography>
        <Button color="inherit" href="#about">Sobre mí</Button>
        <Button color="inherit" href="#projects">Proyectos</Button>
        <Button color="inherit" href="#contact">Contacto</Button>
      </Toolbar>
    </AppBar>
  );
}
