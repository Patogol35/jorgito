
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

export const container = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const projectsStyles = {
  section: (palette) => ({
    py: 4,
    scrollMarginTop: "80px",
    color: palette.text.primary,
  }),

  headerContainer: {
    textAlign: "center",
    marginBottom: "2rem",
  },

  headerBadge: (isDark) => ({
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

  headerTitle: (primaryColor) => ({
    fontWeight: "bold",
    color: primaryColor,
    lineHeight: 1,
  }),

  cardMotion: {
    willChange: "transform, opacity",
  },

  card: {
    textAlign: "center",
    px: 1,
  },

  cardTitle: {
    fontWeight: "bold",
    mt: 1,
  },

  cardDescription: {
    color: "secondary",
    mt: 0.5,
    fontSize: "0.85rem",
  },

  button: (color, palette) => ({
    mt: 1,
    textTransform: "none",
    fontSize: "0.75rem",
    borderRadius: "999px",
    color,
    borderColor: color,

    "&:hover": {
      borderColor: color,

      background:
        palette.mode === "dark"
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.05)",
    },
  }),

  divider: (color, palette) => ({
    width: "160px",
    height: "1px",
    mx: "auto",
    mt: 2,
    borderRadius: "999px",

    background:
      palette.mode === "dark"
        ? `linear-gradient(
            90deg,
            transparent,
            ${color},
            rgba(255,255,255,0.45),
            ${color},
            transparent
          )`
        : `linear-gradient(
            90deg,
            transparent,
            rgba(25,118,210,0.25),
            ${color},
            rgba(25,118,210,0.25),
            transparent
          )`,

    boxShadow:
      palette.mode === "dark"
        ? `0 0 10px ${color}55`
        : `0 0 6px ${color}22`,
  }),
};
