const inputStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,

    background:
      theme.palette.mode === "dark"
        ? "rgba(15,23,42,0.6)"
        : "rgba(255,255,255,0.75)",

    backdropFilter: "blur(12px)",

    color:
      theme.palette.mode === "dark"
        ? "rgba(241,245,249,0.95)"
        : "rgba(15,23,42,0.9)",

    /* ===== BORDE NORMAL ===== */
    "& fieldset": {
      borderWidth: "2px",
      borderColor:
        theme.palette.mode === "dark"
          ? "rgba(148,163,184,0.6)" // slate-400
          : "rgba(37,99,235,0.9)",
    },

    /* ===== HOVER ===== */
    "&:hover fieldset": {
      borderColor:
        theme.palette.mode === "dark"
          ? "rgba(147,197,253,0.9)" // blue-300
          : "#1d4ed8",
    },

    /* ===== FOCUS ===== */
    "&.Mui-focused fieldset": {
      borderColor:
        theme.palette.mode === "dark"
          ? "#93c5fd"
          : theme.palette.primary.main,

      boxShadow:
        theme.palette.mode === "dark"
          ? "0 0 0 2px rgba(147,197,253,0.35)"
          : `0 0 14px ${theme.palette.primary.main}55`,
    },

    /* ===== HALO SUAVE ===== */
    "&:hover": {
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 0 0 1px rgba(148,163,184,0.35)"
          : "0 0 0 2px rgba(37,99,235,0.15)",
    },

    /* ===== FIX NOTCH DEL LABEL ===== */
    "& legend": {
      width: 0,
    },

    "& .MuiOutlinedInput-notchedOutline legend": {
      display: "none",
    },
  },

  /* ===== LABEL ===== */
  "& .MuiInputLabel-root": {
    color:
      theme.palette.mode === "dark"
        ? "rgba(226,232,240,0.8)"
        : "rgba(71,85,105,0.85)",
    fontWeight: 500,
  },
});
