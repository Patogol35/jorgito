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
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeIcon from "@mui/icons-material/Code";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const menuItems = [
{ label: "Sobre mí", href: "#hero", color: "linear-gradient(135deg, #0288d1, #26c6da)" },
{ label: "Educación", href: "#about", color: "linear-gradient(135deg, #2e7d32, #66bb6a)" },
{ label: "Tecnologías", href: "#skills", color: "linear-gradient(135deg, #f57c00, #ffb74d)" },
{ label: "Certificaciones", href: "#certifications", color: "linear-gradient(135deg, #6a1b9a, #ab47bc)" },
{ label: "Proyectos", href: "#projects", color: "linear-gradient(135deg, #0288d1, #03a9f4)" },
{ label: "Contacto", href: "#contact", color: "linear-gradient(135deg, #c62828, #ef5350)" },
];

// Variantes animaciones
const menuVariants = {
hidden: { x: "100%", opacity: 0 },
visible: { x: 0, opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
exit: { x: "100%", opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

const itemVariants = {
hidden: { y: 20, opacity: 0 },
visible: (i) => ({
y: 0,
opacity: 1,
transition: { delay: i * 0.05, duration: 0.25, ease: "easeOut" },
}),
};

// Smooth scroll con offset
function useSmoothScroll(offset = -70) {
return (id) => {
const element = document.querySelector(id);
if (element) {
const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
window.scrollTo({ top: y, behavior: "smooth" });
}
};
}

// Throttle
function throttle(fn, wait) {
let lastTime = 0;
return (...args) => {
const now = Date.now();
if (now - lastTime >= wait) {
fn(...args);
lastTime = now;
}
};
}

export default function Navbar({ mode, setMode }) {
const [open, setOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);
const [active, setActive] = useState("#hero");
const theme = useTheme();
const handleScrollTo = useSmoothScroll(-70);
const menuRef = useRef(null);

// Detectar scroll + sección activa
useEffect(() => {
const handleScroll = throttle(() => {
setScrolled(window.scrollY > 50);

let current = "#hero";  
  const scrollPosition = window.scrollY + window.innerHeight / 2;  

  menuItems.forEach((item) => {  
    const section = document.querySelector(item.href);  
    if (section) {  
      const top = section.offsetTop - 80;  
      const bottom = top + section.offsetHeight;  
      if (scrollPosition >= top && scrollPosition < bottom) {  
        current = item.href;  
      }  
    }  
  });  

  // ✅ Forzar "contact" si estamos al final de la página  
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 10) {  
    current = "#contact";  
  }  

  setActive(current);  
}, 100);  

window.addEventListener("scroll", handleScroll);  
return () => window.removeEventListener("scroll", handleScroll);

}, []);

// Bloquear scroll en móvil
useEffect(() => {
if (open) {
document.body.style.overflow = "hidden";
menuRef.current?.focus();
} else {
document.body.style.overflow = "auto";
}
}, [open]);

return (
<>
{/* Barra de navegación /}
<motion.div initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
<AppBar
position="fixed"
elevation={scrolled ? 6 : 2}
role="navigation"
aria-label="Barra de navegación principal"
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
        <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 3, alignItems: "center" }}>  
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

        {/* Botón móvil abrir menú */}  
        <IconButton  
          sx={{ display: { xs: "block", lg: "none" }, color: theme.palette.common.white }}  
          onClick={() => setOpen(true)}  
          aria-label="Abrir menú"  
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
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}  
        animate={{ opacity: 1, backdropFilter: "blur(6px)" }}  
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}  
        transition={{ duration: 0.25 }}  
        style={{  
          position: "fixed",  
          inset: 0,  
          background: "rgba(0,0,0,0.45)",  
          zIndex: 1300,  
          display: "flex",  
          justifyContent: "flex-end",  
        }}  
        onClick={() => setOpen(false)}  
        role="dialog"  
        aria-modal="true"  
      >  
        <motion.div  
          variants={menuVariants}  
          initial="hidden"  
          animate="visible"  
          exit="exit"  
          ref={menuRef}  
          tabIndex={-1}  
          style={{  
            width: "280px",  
            background: mode === "dark" ? "rgba(30,30,30,0.95)" : theme.palette.primary.main,  
            borderRadius: "16px 0 0 16px",  
            padding: "2rem",  
            boxShadow: "0 6px 20px rgba(0,0,0,0.35)",  
            display: "flex",  
            flexDirection: "column",  
            maxHeight: "100vh",  
            overflowY: "auto",  
          }}  
          onClick={(e) => e.stopPropagation()}  
        >  
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
              "&:hover": { background: "rgba(255,255,255,0.12)" },  
            }}  
          >  
            {mode === "light" ? "Modo Noche" : "Modo Día"}  
          </Button>  

          {/* Links menú móvil */}  
          <Stack spacing={2} flexGrow={1}>  
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
                whileHover={{ scale: 1.08 }}  
                whileTap={{ scale: 0.96 }}  
                aria-current={active === item.href ? "page" : undefined}  
                style={{  
                  fontSize: "1.1rem",  
                  fontWeight: 600,  
                  textDecoration: "none",  
                  color: "#fff",  
                  cursor: "pointer",  
                  padding: "0.9rem 1rem",  
                  borderRadius: "10px",  
                  background: item.color,  
                  boxShadow:  
                    active === item.href  
                      ? "0 0 12px rgba(255,255,255,0.7)"  
                      : "0 3px 10px rgba(0,0,0,0.3)",  
                }}  
              >  
                {item.label}  
              </motion.a>  
            ))}  
          </Stack>  

          {/* ❌ Botón cerrar al final */}  
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>  
            <Button  
              onClick={() => setOpen(false)}  
              startIcon={<CloseIcon sx={{ fontSize: 28 }} />}  
              sx={{  
                color: "#fff",  
                textTransform: "none",  
                fontWeight: "bold",  
                fontSize: "1rem",  
                borderRadius: "10px",  
                border: "1px solid #fff",  
                px: 2,  
                "&:hover": { background: "rgba(255,255,255,0.12)" },  
              }}  
            >  
              Cerrar menú  
            </Button>  
          </Box>  
        </motion.div>  
      </motion.div>  
    )}  
  </AnimatePresence>  
</>

);
} 
