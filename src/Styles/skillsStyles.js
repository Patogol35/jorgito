
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

export const containerAnim = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const skillCardMotion = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.96,
  },

  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },

  exit: {
    opacity: 0,
    scale: 0.9,
  },

  transition: {
    duration: 0.35,
    ease: "easeOut",
  },
};

export const skillsStyles = {
  section: {
    py: 4,
    scrollMarginTop: "80px",
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

  filtersContainer: {
    display: "flex",
    justifyContent: "center",
    mb: 6,
  },

  filtersScroll: {
    maxWidth: "100%",
    overflowX: "auto",

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },

  filterGroup: {
    display: "inline-flex",
    gap: 1.2,
    py: 0.5,
  },

  filterButton: (isDark, primary, primaryDark) => ({
    borderRadius: "999px",
    px: 2.4,
    py: 1,
    fontWeight: 600,
    fontSize: "0.9rem",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    gap: 1,

    backgroundColor: isDark
      ? "rgba(255,255,255,0.04)"
      : "rgba(255,255,255,0.9)",

    border: `1px solid ${
      isDark
        ? "rgba(255,255,255,0.12)"
        : "rgba(0,0,0,0.12)"
    }`,

    "&.Mui-selected": {
      background: `linear-gradient(
        135deg,
        ${primary},
        ${primaryDark}
      )`,
      color: "#fff",
      borderColor: "transparent",
    },
  }),

  card: (cardBg, primary) => ({
    p: 3,
    textAlign: "center",
    borderRadius: "22px",
    backgroundColor: cardBg,
    backgroundImage: "none",
    border: `1px solid ${primary}`,

    transition: "transform 0.25s ease",
    willChange: "transform",
    transform: "translateZ(0)",

    "&:hover": {
      transform: "translateY(-4px)",
    },
  }),

  skillIcon: (isDark) => ({
    width: 65,
    height: 65,
    mb: 2,
    objectFit: "contain",

    backfaceVisibility: "hidden",
    transform: "translateZ(0)",
    willChange: "transform",

    filter: isDark
      ? "invert(1) brightness(1.22)"
      : "drop-shadow(0 0 5px rgba(0,0,0,0.22))",
  }),
};
