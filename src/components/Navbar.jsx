import { useState, useCallback, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useThemeMode } from "../context/ThemeContext";
import { useScrollTrigger } from "../hooks/useScrollTrigger";

import { authMenu, guestMenu } from "../config/menuConfig";
import NavButton from "./NavButton";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Stack,
  Button,
  Divider,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ShoppingBag as ShoppingBagIcon,
  Logout as LogoutIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.styles";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { mode, toggleMode } = useThemeMode();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const scrolled = useScrollTrigger(50);

  const menuItems = useMemo(
    () => (isAuthenticated ? authMenu : guestMenu),
    [isAuthenticated]
  );

  const handleToggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => setOpen(false), []);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
    handleCloseMenu();
  }, [logout, navigate, handleCloseMenu]);

  // 🔒 Bloquear scroll cuando menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const textColor = "#fff";

  const UserSection = ({ mobile = false }) =>
    isAuthenticated && (
      <Stack
        direction={mobile ? "column" : "row"}
        spacing={1.5}
        alignItems="center"
        sx={styles.userSection(mobile)}
      >
        <AccountCircleIcon sx={{ color: textColor }} />
        <Typography sx={{ color: textColor, fontWeight: 600 }}>
          {user?.username}
        </Typography>
      </Stack>
    );

  const MenuList = ({ onClick }) =>
    menuItems.map((item, idx) => (
      <NavButton key={idx} item={item} onClick={onClick} />
    ));

  return (
    <>
      {/* NAVBAR */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        <AppBar
          position="fixed"
          elevation={0}
          sx={(theme) => styles.appBar(theme, scrolled)}
        >
          <Toolbar sx={styles.toolbar}>
            {/* LOGO */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ ...styles.logo, color: textColor }}
            >
              <ShoppingBagIcon sx={styles.logoIcon} />
              E-commerce Jorge Patricio
            </Typography>

            {/* DESKTOP */}
            <Box sx={styles.desktopMenu}>
              <MenuList />
              <IconButton onClick={toggleMode} sx={styles.toggleIcon}>
                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
              <UserSection />
            </Box>

            {/* MOBILE BUTTON */}
            <IconButton
              sx={{ ...styles.menuBtnMobile, color: textColor }}
              onClick={handleToggleMenu}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={open ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                >
                  {open ? <CloseIcon /> : <MenuIcon />}
                </motion.div>
              </AnimatePresence>
            </IconButton>
          </Toolbar>
        </AppBar>
      </motion.div>

      {/* MOBILE MENU (REEMPLAZA DRAWER) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              zIndex: 1300,
              display: "flex",
              justifyContent: "flex-end",
            }}
            onClick={handleCloseMenu}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                width: 280,
                height: "100%",
                background: "#1976d2",
                padding: "5rem 1.5rem 2rem",
                borderRadius: "16px 0 0 16px",
                display: "flex",
                flexDirection: "column",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <UserSection mobile />

              <Divider sx={{ my: 2, opacity: 0.3 }} />

              <MenuList onClick={handleCloseMenu} />

              {isAuthenticated && (
                <Button
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  sx={styles.logoutBtn}
                >
                  Cerrar sesión
                </Button>
              )}

              <Stack alignItems="center" mt={3}>
                <IconButton onClick={toggleMode} sx={styles.toggleIcon}>
                  {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
              </Stack>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
