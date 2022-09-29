import * as React from "react";
import { motion } from "framer-motion";
import "./Circle.css";

export const Line = (props: any) => {
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
    <span id={props.name} title="line">
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 600 600"
        initial="hidden"
        animate="visible"
        id={props.name}
      >
        <motion.line
          x1="90"
          y1="90"
          x2="500"
          y2="500"
          stroke="#00cc88"
          variants={draw}
          custom={2}
          id={props.name}
        />
        <motion.line
          x1="90"
          y1="500"
          x2="500"
          y2="90"
          stroke="#00cc88"
          variants={draw}
          custom={2.5}
          id={props.name}
        />
      </motion.svg>
    </span>
  );
};
