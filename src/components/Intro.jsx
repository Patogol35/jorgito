import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Initializing Portfolio...",
  "Loading Projects...",
  "Loading AI Systems...",
  "Welcome Jorge Santamaría",
];

export default function Intro({ onFinish }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < messages.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 700);

      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        onFinish();
      }, 1200);

      return () => clearTimeout(finishTimer);
    }
  }, [index, onFinish]);

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
      {/* Glow fondo */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "rgba(0,255,204,0.08)",
          borderRadius: "50%",
          filter: "blur(120px)",
        }}
      />

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "90%",
          maxWidth: "700px",
          background: "rgba(15,23,42,0.7)",
          border: "1px solid rgba(0,255,204,0.15)",
          borderRadius: "24px",
          padding: "40px",
          backdropFilter: "blur(14px)",
          boxShadow: "0 0 40px rgba(0,255,204,0.08)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* botones terminal */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ff5f56",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ffbd2e",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#27c93f",
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              color: "#00ffcc",
              fontFamily: "monospace",
              fontSize: "1.15rem",
              lineHeight: 1.9,
              textShadow: "0 0 10px rgba(0,255,204,0.25)",
            }}
          >
            {messages.slice(0, index + 1).map((msg, i) => (
              <div key={i}>
                {">"} {msg}
              </div>
            ))}

            <span className="cursor">_</span>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <style>
        {`
          .cursor {
            animation: blink 0.8s infinite;
          }

          @keyframes blink {
            50% {
              opacity: 0;
            }
          }
        `}
      </style>
    </motion.div>
  );
}
