import { motion } from "framer-motion";
import {
  logoContainer,
  logoImage,
  monogramLayer,
  nameLayer,
  subtitleLayer,
  lineLayer,
} from "./Logo.styles";

const MotionDiv = motion.div;

const animation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

function Logo() {
  return (
    <MotionDiv
      style={logoContainer}
      initial="hidden"
      animate="visible"
    >
      {/* MONOGRAMA JP */}
      <MotionDiv
        style={{
          ...monogramLayer,
          clipPath: "inset(20% 42% 38% 28%)",
        }}
        variants={animation}
        initial={{
          opacity: 0,
          x: -45,
          y: 35,
          scale: 0.92,
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <img
          src="/logo-jorge-patricio.png"
          alt="Jorge Patricio"
          style={logoImage}
        />
      </MotionDiv>

      <MotionDiv
        style={{
          ...monogramLayer,
          clipPath: "inset(20% 20% 38% 48%)",
        }}
        initial={{
          opacity: 0,
          x: 45,
          y: -30,
          scale: 0.92,
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.75,
          delay: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <img
          src="/logo-jorge-patricio.png"
          alt=""
          style={logoImage}
        />
      </MotionDiv>

      {/* NOMBRE */}
      <MotionDiv
        style={nameLayer}
        initial={{
          opacity: 0,
          y: 25,
          filter: "blur(8px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.8,
          delay: 0.95,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <img
          src="/logo-jorge-patricio.png"
          alt=""
          style={logoImage}
        />
      </MotionDiv>

      {/* SUBTÍTULO */}
      <MotionDiv
        style={subtitleLayer}
        initial={{
          opacity: 0,
          y: 18,
          filter: "blur(6px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.7,
          delay: 1.45,
          ease: "easeOut",
        }}
      >
        <img
          src="/logo-jorge-patricio.png"
          alt=""
          style={logoImage}
        />
      </MotionDiv>

      {/* LÍNEAS DECORATIVAS */}
      <MotionDiv
        style={lineLayer}
        initial={{
          opacity: 0,
          scaleX: 0,
        }}
        animate={{
          opacity: 1,
          scaleX: 1,
        }}
        transition={{
          duration: 0.65,
          delay: 1.75,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <img
          src="/logo-jorge-patricio.png"
          alt=""
          style={logoImage}
        />
      </MotionDiv>
    </MotionDiv>
  );
}

export default Logo;
