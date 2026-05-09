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
      {/* Glow principal */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background: "rgba(79,195,247,0.14)",
          borderRadius: "50%",
          filter: "blur(140px)",
        }}
      />

      {/* Grid tecnológico */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: 0.25,
        }}
      />

      {/* Card principal */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        style={{
          width: "90%",
          maxWidth: "560px",
          padding: "42px",
          borderRadius: "28px",
          background: "rgba(10,15,25,0.72)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(79,195,247,0.18)",
          boxShadow:
            "0 0 50px rgba(79,195,247,0.12), inset 0 0 30px rgba(255,255,255,0.02)",
          position: "relative",
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        {/* Línea glow arriba */}
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

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            width: "82px",
            height: "82px",
            margin: "0 auto 26px",
            borderRadius: "24px",
            background:
              "linear-gradient(135deg, rgba(66,165,245,0.22), rgba(79,195,247,0.08))",
            border: "1px solid rgba(79,195,247,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 35px rgba(79,195,247,0.18)",
            backdropFilter: "blur(10px)",
          }}
        >
          <span
            style={{
              color: "#4FC3F7",
              fontSize: "2rem",
              fontWeight: 700,
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "1px",
            }}
          >
            JS
          </span>
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            color: "#ffffff",
            fontSize: "1.9rem",
            fontWeight: 700,
            marginBottom: "10px",
            textAlign: "center",
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "0.5px",
          }}
        >
          Portafolio Profesional
        </motion.h1>

        {/* Subtitulo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            color: "rgba(255,255,255,0.68)",
            textAlign: "center",
            fontSize: "0.98rem",
            marginBottom: "36px",
            lineHeight: 1.7,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Ingeniería de Software · Inteligencia Artificial · Desarrollo Web
        </motion.p>

        {/* Barra */}
        <div
          style={{
            width: "100%",
            height: "12px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "999px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <motion.div
            style={{
              height: "100%",
              borderRadius: "999px",
              background:
                "linear-gradient(90deg, #1976d2 0%, #4FC3F7 100%)",
              width: `${progress}%`,
              boxShadow: "0 0 20px rgba(79,195,247,0.65)",
            }}
          />

          {/* Shine */}
          <motion.div
            animate={{
              x: ["-100%", "500%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              top: 0,
              width: "80px",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
            }}
          />
        </div>

        {/* porcentaje */}
        <motion.div
          key={progress}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#4FC3F7",
            fontSize: "1.05rem",
            fontWeight: 700,
            fontFamily: "monospace",
            letterSpacing: "2px",
            textShadow: "0 0 12px rgba(79,195,247,0.4)",
          }}
        >
          {progress}%
        </motion.div>

        {/* Texto inferior */}
        <div
          style={{
            marginTop: "18px",
            textAlign: "center",
            color: "rgba(255,255,255,0.55)",
            fontSize: "0.92rem",
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "0.3px",
          }}
        >
          Inicializando experiencia digital...
        </div>
      </motion.div>
    </motion.div>
  );
}
