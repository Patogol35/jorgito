import { useEffect, useRef, useState } from "react";
import { Paper } from "@mui/material";

const CardWrapper = ({ id, color, children, mode, scrollOffset }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const borderColor = mode === "light"
    ? "rgba(0,0,0,0.35)"
    : "rgba(255,255,255,0.35)";

  return (
    <Paper
      ref={ref}
      id={id}
      elevation={0}
      sx={{
        mb: 4,
        p: { xs: 3, md: 6 },
        borderRadius: 4,

        /* BORDES */
        border: `1px solid ${borderColor}`,
        borderLeft: `4px solid ${color}`,

        /* GLASS EFFECT */
        background:
          mode === "light"
            ? "rgba(255,255,255,0.75)"
            : "rgba(30,30,30,0.75)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",

        /* SCROLL OFFSET */
        scrollMarginTop: scrollOffset,

        /* ANIMACIÓN */
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",

        /* HOVER */
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow:
            mode === "light"
              ? "0 20px 40px rgba(0,0,0,0.18)"
              : "0 20px 40px rgba(255,255,255,0.1)",
        },
      }}
    >
      {children}
    </Paper>
  );
};

export default CardWrapper;
