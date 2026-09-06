
export const easeOutExpo = [0.16, 1, 0.3, 1];

export const fadeCinematic = {
  hidden: {
    opacity: 0,
    y: 20,
    clipPath: "inset(0 0 100% 0)",
    filter: "blur(6px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: easeOutExpo,
    },
  },
};

export const fadeSoft = {
  hidden: {
    opacity: 0,
    y: 16,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const containerMotion = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const formStyles = {
  section: {
    py: {
      xs: 4,
      md: 6,
    },
  },

  titleContainer: {
    textAlign: "center",
    marginBottom: "2rem",
  },

  titleBadge: (isDark) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    px: 3,
    py: 0.9,
    borderRadius: "999px",

    background: isDark
      ? "rgba(144,202,249,0.06)"
      : "rgba(25,118,210,0.06)",

    border: `1px solid ${
      isDark
        ? "rgba(144,202,249,0.25)"
        : "rgba(25,118,210,0.25)"
    }`,

    backdropFilter: "blur(6px)",
  }),

  title: (primaryColor) => ({
    fontWeight: "bold",
    color: primaryColor,
    lineHeight: 1,
  }),

  subtitle: {
    textAlign: "center",
    fontWeight: "bold",
    mb: 4,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },

  input: (theme) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
      overflow: "hidden",
      transition: "all 0.25s ease",

      background:
        theme.palette.mode === "dark"
          ? "linear-gradient(145deg, rgba(15,23,42,0.92), rgba(30,41,59,0.82))"
          : "linear-gradient(145deg, rgba(255,255,255,0.97), rgba(248,250,252,0.95))",

      backdropFilter: "blur(12px)",

      boxShadow: "none",

      "& fieldset": {
        borderWidth: "1.6px",

        borderColor:
          theme.palette.mode === "dark"
            ? "rgba(148,163,184,0.35)"
            : "rgba(100,116,139,0.45)",

        transition: "all 0.25s ease",
      },

      "&:hover fieldset": {
        borderColor:
          theme.palette.mode === "dark"
            ? "rgba(96,165,250,0.65)"
            : "rgba(37,99,235,0.75)",
      },

      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: "2px",
      },

      "& input, & textarea": {
        color:
          theme.palette.mode === "dark"
            ? "#f8fafc"
            : "#0f172a",

        fontWeight: 500,
        fontSize: "0.96rem",
        paddingTop: "15px",
        paddingBottom: "15px",
      },

      "& textarea": {
        lineHeight: 1.7,
      },

      "& input::placeholder, & textarea::placeholder": {
        color:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.38)"
            : "rgba(15,23,42,0.38)",

        opacity: 1,
      },
    },

    "& .MuiInputAdornment-root": {
      marginRight: 1,

      "& svg": {
        fontSize: 21,
        opacity: 0.9,
        transition: "all 0.25s ease",
      },
    },

    "& .MuiOutlinedInput-root.Mui-focused .MuiInputAdornment-root svg": {
      transform: "scale(1.08)",
      color: theme.palette.primary.main,
    },

    "& .MuiInputLabel-root": {
      fontWeight: 600,
      letterSpacing: "0.2px",

      color:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.78)"
          : "rgba(15,23,42,0.78)",

      "&.Mui-focused": {
        color: theme.palette.primary.main,
      },
    },
  }),

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },

  button: (theme) => ({
    borderRadius: "25px",
    textTransform: "none",
    fontWeight: "bold",
    px: 5,
    py: 1.4,
    color: "#ffffff",

    background: `linear-gradient(
      90deg,
      ${theme.palette.primary.main},
      #3b82f6
    )`,

    boxShadow: "none",

    "&:hover": {
      background: `linear-gradient(
        90deg,
        ${theme.palette.primary.main},
        #3b82f6
      )`,

      transform: "scale(1.04)",
    },

    transition: "transform 0.2s ease",
  }),

  snackbar: {
    top: "50% !important",
    transform: "translateY(-50%)",
  },

  alert: (theme) => ({
    px: 4,
    py: 2,
    borderRadius: 3,
    fontWeight: 600,
    textAlign: "center",
    fontSize: "0.95rem",

    color:
      theme.palette.mode === "dark"
        ? "#dcfce7"
        : "#14532d",

    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(135deg, #064e3b, #022c22)"
        : "linear-gradient(135deg, #dcfce7, #bbf7d0)",

    boxShadow:
      theme.palette.mode === "dark"
        ? "0 20px 40px rgba(0,0,0,0.6)"
        : "0 20px 40px rgba(22,163,74,0.35)",
  }),
};
