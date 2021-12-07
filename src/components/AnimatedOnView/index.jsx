import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";

export default function AnimatedOnView({
  renderProps,
  variants,
  index = null,
  className = "",
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      custom={index}
      className={className}
      transition={{
        ease: [0.4, 0.6, 1, 0.85],
        default: { duration: 0.7 },
      }}
    >
      {renderProps()}
    </motion.div>
  );
}
