
export const easeOutExpo = [0.16, 1, 0.3, 1];

export const fadeCinematic = {
  hidden: {
    opacity: 0,
    y: 20,
    clipPath: "inset(0 0 100% 0)",
    filter: "blur(4px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
    },
  },
};

export const footerContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const footerStyles = {
  footer: (isDark) => ({
    position: "relative",
    pt: {
      xs: 6,
      md: 7,
    },
    pb: {
      xs: 3.5,
      md: 4,
    },
    textAlign: "center",
    color: "#fff",

    background: isDark
      ? "linear-gradient(180deg, #020617 0%, #000000 100%)"
      : "linear-gradient(135deg, #0d47a1, #42a5f5)",

    boxShadow: isDark
      ? "inset 0 1px 0 rgba(255,255,255,0.04)"
      : "inset 0 1px 0 rgba(255,255,255,0.3)",

    overflow: "hidden",
  }),

  glassOverlay: {
    position: "absolute",
    inset: 0,
    backdropFilter: "blur(10px)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.25))",
    pointerEvents: "none",
  },

  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: 900,
    mx: "auto",
    px: {
      xs: 2,
      sm: 3,
    },
  },

  name: {
    fontWeight: 700,
    letterSpacing: "2px",
    mb: 1,
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.98)",
  },

  separator: {
    width: 120,
    height: 2,
    mx: "auto",
    my: 3,
    borderRadius: 4,

    background:
      "linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.85), rgba(255,255,255,0.12))",
  },

  slogan: {
    mb: 2,
    fontWeight: 500,
    letterSpacing: "0.6px",
    color: "rgba(255,255,255,0.92)",
  },

  socialContainer: {
    mb: 3,
  },

  credits: {
    color: "rgba(255,255,255,0.9)",
    letterSpacing: "0.5px",
    fontWeight: 500,
  },

  rights: {
    color: "rgba(255,255,255,0.65)",
    letterSpacing: "0.4px",
  },
};
