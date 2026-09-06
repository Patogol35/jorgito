export const easeOutExpo = [0.16, 1, 0.3, 1];

export const fadeCinematic = {
  hidden: {
    opacity: 0,
    y: 16,
    clipPath: "inset(0 0 100% 0)",
  },

  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.9,
      ease: easeOutExpo,
    },
  },
};

export const textContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.5,
    },
  },
};

export const buttonsContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 1.1,
    },
  },
};

export const heroStyles = {
  section: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: {
      xs: "column",
      sm: "row",
    },
    alignItems: "center",
    justifyContent: "center",
    gap: {
      xs: 4,
      md: 8,
    },
    pt: {
      xs: 6,
      sm: 8,
      md: 10,
    },
    pb: {
      xs: 2,
      sm: 3,
    },
    px: {
      xs: 2,
      sm: 4,
      md: 8,
    },
  },

  avatarWrapper: {
    borderRadius: "50%",
    transformStyle: "preserve-3d",
    perspective: 1200,
    willChange: "transform",
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
  },

  avatarFloating: {
    willChange: "transform",
  },

  avatarGlow: {
    borderRadius: "50%",
  },

  avatar: (theme) => ({
    width: {
      xs: 130,
      sm: 170,
      md: 200,
    },
    height: {
      xs: 130,
      sm: 170,
      md: 200,
    },
    border: `3px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.paper,
  }),

  textContainer: {
    textAlign: {
      xs: "center",
      sm: "left",
    },
    maxWidth: "600px",
    mx: "auto",
    zIndex: 1,
  },

  title: (theme) => ({
    color: theme.palette.primary.main,
    fontSize: {
      xs: "1.7rem",
      sm: "2.1rem",
      md: "2.4rem",
    },
  }),

  subtitle: {
    fontWeight: 700,
  },

  description: (theme) => ({
    fontWeight: 500,
    fontSize: {
      xs: "1rem",
      sm: "1.08rem",
    },
    lineHeight: 1.9,
    letterSpacing: "0.3px",
    color: theme.palette.text.primary,
    maxWidth: "520px",
    mt: 3,
    mb: 5,
    whiteSpace: "pre-line",
  }),

  buttonsWrapper: {
    display: "flex",
    gap: 2,
    justifyContent: {
      xs: "center",
      sm: "flex-start",
    },
    flexWrap: "wrap",
    alignItems: "center",
  },

  button: (btn, theme) => ({
    minWidth: btn.text ? "auto" : 50,
    width: btn.text ? "auto" : 50,
    height: btn.text ? "auto" : 50,
    borderRadius: btn.text ? "25px" : "50%",
    textTransform: "none",
    fontWeight: "bold",
    px: btn.text ? 4 : 0,
    py: btn.text ? 1.4 : 0,

    background: `linear-gradient(
      90deg,
      ${theme.palette.primary.main},
      #3b82f6
    )`,

    boxShadow: "none",

    ...(btn.text
      ? {}
      : {
          "& .MuiButton-startIcon": {
            margin: 0,
          },
        }),
  }),

  certificateModal: {
    zIndex: 2000,
    backgroundColor: "rgba(0,0,0,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  modalCloseButton: {
    position: "fixed",
    top: 20,
    left: 20,
    zIndex: 3000,
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    backdropFilter: "blur(6px)",

    "&:hover": {
      background: "rgba(0,0,0,0.8)",
    },
  },

  certificateContainer: {
    position: "relative",
    width: {
      xs: "95%",
      md: "70%",
    },
    maxHeight: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  certificateImage: {
    width: "100%",
    maxHeight: "90vh",
    objectFit: "contain",
    borderRadius: 2,
    display: "block",
  },

  terminalModal: {
    zIndex: 2000,
    backgroundColor: "rgba(0,0,0,0.95)",
    overflow: "auto",
  },

  terminalContainer: {
    width: "100%",
    minHeight: "100dvh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: {
      xs: 0,
      sm: 2,
    },
    boxSizing: "border-box",

    "@media (orientation: landscape) and (max-height: 600px)": {
      alignItems: "flex-start",
      justifyContent: "flex-start",
      p: 0,
    },
  },
};
