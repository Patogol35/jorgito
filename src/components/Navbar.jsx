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
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Code as CodeIcon,
  Brightness4,
  Brightness7,
  Person as PersonIcon,
  School as SchoolIcon,
  Build as BuildIcon,
  Verified as VerifiedIcon,
  Work as WorkIcon,
  Computer as ComputerIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { useEffect, useState, useRef } from "react";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { motion, AnimatePresence } from "framer-motion";

// 📌 Configuración del menú con iconos
const menuItems = [
  {
    label: "Sobre mí",
    href: "#hero",
    color: "linear-gradient(135deg, #0288d1, #26c6da)",
    icon: <PersonIcon sx={{ color: "#fff" }} />,
  },
  {
    label: "Educación",
    href: "#about",
    color: "linear-gradient(135deg, #2e7d32, #66bb6a)",
    icon: <SchoolIcon sx={{ color: "#fff" }} />,
  },
  {
    label: "Tecnologías",
    href: "#skills",
    color: "linear-gradient(135deg, #f57c00, #ffb74d)",
    icon: <BuildIcon sx={{ color: "#fff" }} />,
  },
  {
  label: "Certificados",
  href: "#certifications",
  color: "linear-gradient(135deg, #E0C97A, #C9B06A)",
  icon: <VerifiedIcon sx={{ color: "#fff" }} />,
  },
  {
    label: "Proyectos",
    href: "#projects",
    color: "linear-gradient(135deg, #0288d1, #03a9f4)",
    icon: <WorkIcon sx={{ color: "#fff" }} />,
  },
  {
    label: "Contacto",
    href: "#contact",
    color: "linear-gradient(135deg, #c62828, #ef5350)",
    icon: <EmailIcon sx={{ color: "#fff" }} />,
  },
  
  
{
  label: "Email",
  href: "#form",
  color: "linear-gradient(135deg, #00695c, #26a69a)", // teal
  icon: <ContactMailIcon sx={{ color: "#fff" }} />,
},
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

// 📌 Hook: scroll suave
function useSmoothScroll(offset = -70) {
  return (id) => {
    const el = document.querySelector(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
}

// 📌 Hook: detectar sección activa
function useActiveSection(setActive) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            entry.isIntersecting && setActive(`#${entry.target.id}`)
        ),
      { rootMargin: "-50% 0px -50% 0px" }
    );

    const sections = menuItems
      .map((i) => document.querySelector(i.href))
      .filter(Boolean);

    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, [setActive]);
}

// 📌 Hook: bloquear scroll al abrir menú
function useLockBodyScroll(isLocked, menuRef) {
  useEffect(() => {
    if (isLocked) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      menuRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }, [isLocked, menuRef]);
}

export default function Navbar({ mode, setMode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const theme = useTheme();
  const handleScrollTo = useSmoothScroll(-70);
  const menuRef = useRef(null);

  useActiveSection(setActive);
  useLockBodyScroll(open, menuRef);

  // 🎯 Navbar cambia con scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setMode(mode === "light" ? "dark" : "light");

  return (
    <>
      {/* Topbar */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
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
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>


<Typography
  variant="h6"
  sx={{
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer",
    lineHeight: 1, // 👈 ayuda a mantener alineación exacta
  }}
  onClick={() => handleScrollTo("#hero")}
>
  <motion.div
    whileHover={{ rotate: 10 }}
    transition={{ type: "spring", stiffness: 200 }}
    style={{
      display: "flex",
      alignItems: "center", // 👈 asegura que el ícono esté centrado verticalmente
    }}
  >
    <ComputerIcon sx={{ mr: 1, fontSize: 28, verticalAlign: "middle" }} /> {/* 👈 ajusta tamaño y alineación */}
  </motion.div>
  Jorge Patricio
</Typography>


              
            </motion.div>

            {/* Desktop menu */}
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
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
                    startIcon={item.icon}
                    sx={{
                      color: "#fff",
                      fontWeight: 600,
                      textTransform: "none",
                      fontSize: "1rem",
                      
                      borderRadius: "10px",
                      px: 2,
                      py: 1,
                      transition: "all 0.3s ease",
                      background:
                        active === item.href ? item.color : "transparent",
                      boxShadow:
                        active === item.href
                          ? "0 0 12px rgba(0,0,0,0.35)"
                          : "none",
                      "&:hover": {
                        background: item.color,
                        boxShadow: "0 0 15px rgba(0,0,0,0.4)",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}

              {/* Botón tema */}
              <IconButton
                onClick={toggleTheme}
                sx={{ color: "#fff" }}
                aria-label="Cambiar tema"
              >
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Box>

            {/* Botón menú móvil con animación */}
<IconButton
  sx={{ display: { xs: "block", lg: "none" }, color: "#fff" }}
  onClick={() => setOpen(!open)}
  aria-label={open ? "Cerrar menú" : "Abrir menú"}
>
  <AnimatePresence mode="wait" initial={false}>
    <motion.div
      key={open ? "close" : "menu"}
      initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
      animate={{ rotate: 0, opacity: 1, scale: 1 }}
      exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      style={{ display: "flex" }}
    >
      {open ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
    </motion.div>
  </AnimatePresence>
</IconButton>
          </Toolbar>
        </AppBar>
      </motion.div>

      {/* Drawer móvil */}
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
                background:
                  mode === "dark"
                    ? "rgba(30,30,30,0.95)"
                    : theme.palette.primary.main,
                borderRadius: "16px 0 0 16px",
                padding: "2rem",
                paddingTop: "5rem",
                boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
                display: "flex",
                flexDirection: "column",
                maxHeight: "100vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Stack
  spacing={2}
  alignItems="center" // ✅ centra horizontalmente todo
  sx={{ width: "100%" }}
>
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // ✅ centra texto + ícono
        textAlign: "center", // ✅ centra texto si se parte
        gap: "0.5rem",
        width: "90%", // ✅ ocupa casi todo el ancho, centrado
        background: item.color,
        boxShadow:
          active === item.href
            ? "0 0 12px rgba(255,255,255,0.7)"
            : "0 3px 10px rgba(0,0,0,0.3)",
        transition: "all 0.25s ease",
      }}
    >
      {item.icon} {item.label}
    </motion.a>
  ))}
</Stack>

              {/* Botones abajo redondos */}
<Box
  sx={{ display: "flex", gap: 2, mt: 3, justifyContent: "center" }}
>
  <IconButton
    onClick={toggleTheme}
    sx={{
      color: "#fff",
      border: "1px solid #fff",
      borderRadius: "50%",
      width: 56,
      height: 56,
      "&:hover": { background: "rgba(255,255,255,0.12)" },
    }}
  >
    {mode === "light" ? <Brightness4 /> : <Brightness7 />}
  </IconButton>
</Box>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
