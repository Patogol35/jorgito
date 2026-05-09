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
          }, 500);

          return 100;
        }

        return prev + 1;
      });
    }, 32);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
      style={{
        height: "100vh",
        background:
          "radial-gradient(circle at top, #07111f 0%, #030712 65%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* GRID */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(79,195,247,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,195,247,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
          maskImage:
            "radial-gradient(circle at center, black 35%, transparent 85%)",
        }}
      />

      {/* GLOW 1 */}
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          background: "rgba(33,150,243,0.12)",
          borderRadius: "50%",
          filter: "blur(140px)",
        }}
      />

      {/* GLOW 2 */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "rgba(79,195,247,0.12)",
          borderRadius: "50%",
          filter: "blur(100px)",
          top: "10%",
          right: "10%",
        }}
      />

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          width: "92%",
          maxWidth: "620px",
          padding: "48px",
          borderRadius: "30px",
          position: "relative",
          overflow: "hidden",
          background: "rgba(5,10,20,0.72)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(79,195,247,0.16)",
          boxShadow:
            "0 0 60px rgba(79,195,247,0.12), inset 0 0 40px rgba(255,255,255,0.02)",
          zIndex: 5,
        }}
      >
        {/* BRILLO TOP */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #4FC3F7, transparent)",
          }}
        />

        {/* DECORACIÓN */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            border: "1px solid rgba(79,195,247,0.08)",
          }}
        />

        {/* TEXTO SYSTEM */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            color: "#4FC3F7",
            fontFamily: "monospace",
            fontSize: "0.82rem",
            letterSpacing: "3px",
            marginBottom: "18px",
            textAlign: "center",
            textShadow: "0 0 12px rgba(79,195,247,0.45)",
          }}
        >
          INICIALIZANDO SISTEMA
        </motion.div>

        {/* NOMBRE */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: 800,
            marginBottom: "14px",
            lineHeight: 1.1,
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "1px",
            background:
              "linear-gradient(90deg, #90CAF9 0%, #42A5F5 40%, #4FC3F7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 22px rgba(79,195,247,0.25)",
          }}
        >
          Jorge Santamaría
        </motion.h1>

        {/* SUBTITLE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.7)",
            fontSize: "1rem",
            lineHeight: 1.8,
            marginBottom: "40px",
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "0.5px",
          }}
        >
          Ingeniería de Software · Sistemas IA · Desarrollo Full Stack
        </motion.div>

        {/* STATUS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "14px",
            color: "#4FC3F7",
            fontFamily: "monospace",
            fontSize: "0.9rem",
            letterSpacing: "1px",
          }}
        >
          <span>Cargando interfaz</span>
          <span>{progress}%</span>
        </div>

        {/* BARRA */}
        <div
          style={{
            width: "100%",
            height: "14px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "999px",
            overflow: "hidden",
            position: "relative",
            border: "1px solid rgba(79,195,247,0.08)",
          }}
        >
          {/* FILL */}
          <motion.div
            style={{
              height: "100%",
              borderRadius: "999px",
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, #1565C0 0%, #42A5F5 45%, #4FC3F7 100%)",
              boxShadow:
                "0 0 20px rgba(79,195,247,0.7), 0 0 40px rgba(79,195,247,0.35)",
            }}
          />

          {/* SHINE */}
          <motion.div
            animate={{
              x: ["-100%", "700%"],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              top: 0,
              width: "90px",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
              filter: "blur(4px)",
            }}
          />
        </div>

        {/* TERMINAL INFO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: "28px",
            padding: "18px",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(79,195,247,0.08)",
            fontFamily: "monospace",
            color: "#90CAF9",
            fontSize: "0.88rem",
            lineHeight: 1.8,
          }}
        >
          <div>{">"} Inicializando entorno digital...</div>
          <div>{">"} Cargando proyectos y certificaciones...</div>
          <div>{">"} Sistemas de IA en línea...</div>
          <div>{">"} Portafolio listo.</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
