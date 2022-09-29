import * as React from "react";
import { motion } from "framer-motion";
import "./Circle.css";

export const Circle = (props: any) => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = 0.1 + i * 0.005;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  return (
    <span id={props.name} title="circle">
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 600 600"
        initial="hidden"
        animate="visible"
        id={props.name}
      >
        <motion.circle
          cx="310"
          cy="300"
          r="200"
          stroke="#ff0055"
          variants={draw}
          custom={3}
          id={props.name}
        />
      </motion.svg>
    </span>
  );
};
