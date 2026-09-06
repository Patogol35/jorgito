
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
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const contactStyles = {
  section: (palette) => ({
    py: 4,
    scrollMarginTop: "80px",
    color: palette.text.primary,
  }),

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
    mb: 2,
  },

  availability: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
    mb: 3,
  },

  availabilityText: {
    color: "secondary",
    mt: 0.5,
    fontSize: "0.85rem",
  },

  divider: (isDark) => ({
    width: "160px",
    height: "1px",
    mx: "auto",
    mb: 3,
    borderRadius: "999px",

    background: isDark
      ? `linear-gradient(
          90deg,
          transparent,
          #3b82f6,
          rgba(255,255,255,0.45),
          #3b82f6,
          transparent
        )`
      : `linear-gradient(
          90deg,
          transparent,
          rgba(25,118,210,0.25),
          #1976d2,
          rgba(25,118,210,0.25),
          transparent
        )`,

    boxShadow: isDark
      ? "0 0 10px rgba(59,130,246,0.35)"
      : "0 0 6px rgba(25,118,210,0.18)",
  }),
};
