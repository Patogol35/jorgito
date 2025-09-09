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
import { Brightness4, Brightness7 } from "@mui/icons-material";

const menuItems = [
{ label: "Sobre mí", href: "#hero", color: "#1565c0" },
{ label: "Educación", href: "#about", color: "#2e7d32" },
{ label: "Tecnologías", href: "#skills", color: "#f57c00" },
{ label: "Certificaciones", href: "#certifications", color: "#6a1b9a" },
{ label: "Proyectos", href: "#projects", color: "#0288d1" },
{ label: "Contacto", href: "#contact", color: "#c62828" },
];

const menuVariants = {
hidden: { x: "100%" },
visible: { x: 0, transition: { type: "spring", stiffness: 220, damping: 28 } },
exit: { x: "100%", transition: { type: "spring", stiffness: 220, damping: 28 } },
};

const itemVariants = {
hidden: { x: 20, opacity: 0 },
visible: (i) => ({
x: 0,
opacity: 1,
transition: { delay: i * 0.07, type: "spring", stiffness: 260 },
}),
};

function useSmoothScroll(offset = -70) {
return (id) => {
const element = document.querySelector(id);
if (element) {
const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
window.scrollTo({ top: y, behavior: "smooth" });
}
};
}

export default function Navbar({ mode, setMode }) {
const [open, setOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);
const theme = useTheme();
const handleScrollTo = useSmoothScroll(-70);

useEffect(() => {
const handleScroll = () => setScrolled(window.scrollY > 50);
window.addEventListener("scroll", handleScroll);
return () => window.removeEventListener("scroll", handleScroll);
}, []);

return (
<>
{/* Barra de navegación /}
<motion.div
initial={{ y: -80, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.6, ease: "easeOut" }}
>
<AppBar
position="fixed"
elevation={scrolled ? 6 : 2}
sx={{
backgroundColor:
mode === "dark"
? "#121212"
: scrolled
? theme.palette.primary.dark
: theme.palette.primary.main,
transition: "all 0.3s ease",
boxShadow: scrolled ? "0 4px 16px rgba(0,0,0,0.25)" : "none",
zIndex: 1400,
}}
>
<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
{/ Logo */}
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
<motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 200 }}>
<CodeIcon sx={{ mr: 1 }} />
</motion.div>
Jorge Patricio
</Typography>
</motion.div>

{/* Menú Desktop */}  
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, alignItems: "center" }}>  
          {menuItems.map((item) => (  
            <motion.div key={item.href} whileHover={{ y: -2, scale: 1.08 }} whileTap={{ scale: 0.95 }}>  
              <Button  
                onClick={() => handleScrollTo(item.href)}  
                sx={{  
                  color: mode === "dark" ? "#fff" : theme.palette.common.white,  
                  fontWeight: 600,  
                  textTransform: "none",  
                  fontSize: "1rem",  
                  position: "relative",  
                  transition: "all 0.25s ease",  
                  borderRadius: "8px",  
                  "&:hover": {  
                    // 👇 todos sólidos en hover  
                    backgroundColor: item.label === "Sobre mí" ? "#0288d1" : item.color,  
                    color: "#fff",  
                    boxShadow: `0 4px 12px ${item.label === "Sobre mí" ? "#0288d1" : item.color}55`,  
                  },  
                }}  
              >  
                {item.label}  
              </Button>  
            </motion.div>  
          ))}  

          {/* Botón modo oscuro/claro */}  
          <IconButton  
            onClick={() => setMode(mode === "light" ? "dark" : "light")}  
            sx={{  
              color: theme.palette.common.white,  
              transition: "all 0.25s ease",  
              "&:hover": { transform: "scale(1.15)" },  
            }}  
          >  
            {mode === "light" ? <Brightness4 /> : <Brightness7 />}  
          </IconButton>  
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
            background: mode === "dark" ? "#1e1e1e" : theme.palette.primary.main,  
            borderRadius: "16px 0 0 16px",  
            padding: "2rem",  
            boxShadow: "0 6px 20px rgba(0,0,0,0.35)",  
            display: "flex",  
            flexDirection: "column",  
            maxHeight: "80vh",  
            overflowY: "auto",  
            transition: "all 0.3s ease",  
          }}  
          onClick={(e) => e.stopPropagation()}  
        >  
          {/* Encabezado */}  
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>  
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>  
              Menú  
            </Typography>  
            <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff", "&:hover": { scale: "1.1" } }}>  
              <CloseIcon fontSize="large" />  
            </IconButton>  
          </Box>  

          {/* Botón modo oscuro/claro */}  
          <Button  
            onClick={() => setMode(mode === "light" ? "dark" : "light")}  
            startIcon={mode === "light" ? <Brightness4 /> : <Brightness7 />}  
            sx={{  
              color: "#fff",  
              border: "1px solid #fff",  
              textTransform: "none",  
              mb: 3,  
              fontWeight: "bold",  
              borderRadius: "10px",  
              transition: "all 0.3s ease",  
              "&:hover": { background: "rgba(255,255,255,0.12)", transform: "scale(1.03)" },  
            }}  
          >  
            {mode === "light" ? "Modo Noche" : "Modo Día"}  
          </Button>  

          {/* Links menú móvil */}  
          <Stack spacing={2}>  
            {menuItems.map((item, i) => (  
              <motion.a  
                key={item.href}  
                onClick={() => {  
                  handleScrollTo(item.href);  
                  setOpen(false);  
                }}  
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
                  borderRadius: "10px",  
                  backgroundColor: item.color,  
                  transition: "all 0.3s ease",  
                  boxShadow: "0 3px 10px rgba(0,0,0,0.3)",  
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

