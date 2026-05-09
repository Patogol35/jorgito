import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Intro({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            onFinish();
          }, 400);

          return 100;
        }

        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        height: "100vh",
        background:
          "radial-gradient(circle at top, #0f172a 0%, #050816 60%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Glow azul */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "rgba(79,195,247,0.15)",
          borderRadius: "50%",
          filter: "blur(120px)",
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        style={{
          width: "90%",
          maxWidth: "500px",
          padding: "40px",
          borderRadius: "24px",
          background: "rgba(15,23,42,0.72)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(79,195,247,0.18)",
          boxShadow: "0 0 40px rgba(79,195,247,0.12)",
          zIndex: 2,
        }}
      >
        {/* Texto */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            color: "#fff",
            fontSize: "1.8rem",
            marginBottom: "30px",
            fontWeight: 700,
            textAlign: "center",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Jorge Santamaría
        </motion.h1>

        {/* Barra */}
        <div
          style={{
            width: "100%",
            height: "10px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              height: "100%",
              borderRadius: "999px",
              background:
                "linear-gradient(90deg, #42A5F5 0%, #4FC3F7 100%)",
              width: `${progress}%`,
              boxShadow: "0 0 18px rgba(79,195,247,0.6)",
            }}
          />
        </div>

        {/* porcentaje */}
        <motion.div
          key={progress}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          style={{
            marginTop: "18px",
            textAlign: "center",
            color: "#4FC3F7",
            fontSize: "1rem",
            fontWeight: 600,
            fontFamily: "monospace",
            letterSpacing: "1px",
          }}
        >
          {progress}%
        </motion.div>

        {/* texto abajo */}
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "rgba(255,255,255,0.7)",
            fontSize: "0.95rem",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Cargando experiencia digital...
        </div>
      </motion.div>
    </motion.div>
  );
}
