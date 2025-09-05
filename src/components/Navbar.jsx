import { AppBar, Toolbar, Button, Typography } from "@mui/material";
export default function Navbar() {
  return (
    <AppBar position="sticky" color="primary" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Andres Gamer
        </Typography>
        <Button color="inherit" href="#about">Sobre mí</Button>
        <Button color="inherit" href="#projects">Proyectos</Button>
        <Button color="inherit" href="#contact">Contacto</Button>
      </Toolbar>
    </AppBar>
  );
}