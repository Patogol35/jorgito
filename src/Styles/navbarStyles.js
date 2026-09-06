
export const menuVariants = {
  hidden: {
    x: "100%",
    opacity: 0,
  },

  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },

  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

export const itemVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },

  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.25,
      ease: "easeOut",
    },
  }),
};

export const navbarStyles = {
  appBar: (mode, theme, scrolled) => ({
    backgroundColor:
      mode === "dark"
        ? "#121212"
        : theme.palette.primary.main,

    transition: "box-shadow 0.3s ease",

    boxShadow: scrolled
      ? "0 4px 16px rgba(0,0,0,0.25)"
      : "none",

    zIndex: 1400,
  }),

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer",
    lineHeight: 1,
  },

  logoIconWrapper: {
    display: "flex",
    alignItems: "center",
  },

  logoIcon: {
    mr: 1,
    fontSize: 28,
    verticalAlign: "middle",
  },

  desktopMenu: {
    display: {
      xs: "none",
      lg: "flex",
    },
    gap: 3,
    alignItems: "center",
  },

  desktopButton: (item, active) => ({
    color: "#fff",
    fontWeight: 600,
    textTransform: "none",
    fontSize: "1rem",

    borderRadius: "10px",
    px: 2,
    py: 1,

    transition: "all 0.3s ease",

    background:
      active === item.href
        ? item.color
        : "transparent",

    boxShadow:
      active === item.href
        ? "0 0 12px rgba(0,0,0,0.35)"
        : "none",

    "&:hover": {
      background: item.color,
      boxShadow: "0 0 15px rgba(0,0,0,0.4)",
    },
  }),

  mobileMenuButton: {
    display: {
      xs: "block",
      lg: "none",
    },
    color: "#fff",
  },

  mobileMenuIcon: {
    display: "flex",
  },

  drawerBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    zIndex: 1300,
    display: "flex",
    justifyContent: "flex-end",
  },

  drawer: (mode, theme) => ({
    width: "280px",

    background:
      mode === "dark"
        ? "#1e1e1e"
        : theme.palette.primary.main,

    borderRadius: "16px 0 0 16px",

    padding: "2rem",
    paddingTop: "5rem",

    boxShadow:
      "0 6px 20px rgba(0,0,0,0.35)",

    display: "flex",
    flexDirection: "column",

    maxHeight: "100vh",
    overflowY: "auto",
  }),

  drawerStack: {
    width: "100%",
  },

  drawerItem: (item, active) => ({
    fontSize: "1.1rem",
    fontWeight: 600,
    textDecoration: "none",
    color: "#fff",
    cursor: "pointer",

    padding: "0.9rem 1rem",
    borderRadius: "10px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    textAlign: "center",
    gap: "0.5rem",

    width: "90%",

    background: item.color,

    boxShadow:
      active === item.href
        ? "0 0 12px rgba(255,255,255,0.7)"
        : "0 3px 10px rgba(0,0,0,0.3)",

    transition: "all 0.25s ease",
  }),
};
