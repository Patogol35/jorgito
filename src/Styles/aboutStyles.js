
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

export const aboutStyles = {
  section: (theme) => ({
    py: 4,
    scrollMarginTop: "80px",
    color: theme.palette.text.primary,
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

  study: {
    textAlign: "center",
    px: 1,
  },

  studyTitle: {
    fontWeight: "bold",
    mt: 1,
  },

  studyText: {
    color: "secondary",
    mt: 0.5,
    fontSize: "0.85rem",
  },

  motionStudy: {
    willChange: "transform, opacity",
  },
};
