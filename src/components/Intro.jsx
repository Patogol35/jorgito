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
      }, 1200);

      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        onFinish();
      }, 1800);

      return () => clearTimeout(finishTimer);
    }
  }, [index, onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        height: "100vh",
        background: "#050816",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#00ffcc",
        fontFamily: "monospace",
        fontSize: "1.2rem",
      }}
    >
      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {messages[index]}
            <span className="cursor">_</span>
          </motion.div>
        </AnimatePresence>
      </div>

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
