export const logoContainer = {
  position: "relative",
  width: "min(420px, 90vw)",
  aspectRatio: "1 / 1",
  margin: "0 auto",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const logoImage = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  display: "block",
  pointerEvents: "none",
  userSelect: "none",
};

export const monogramLayer = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  zIndex: 3,
  willChange: "transform, opacity",
};

export const nameLayer = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  zIndex: 4,
  willChange: "transform, opacity, filter",
};

export const subtitleLayer = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  zIndex: 5,
  willChange: "transform, opacity, filter",
};

export const lineLayer = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  zIndex: 6,
  transformOrigin: "center",
  willChange: "transform, opacity",
};
