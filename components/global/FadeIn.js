import React from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

export default function FadeIn({ children, duration }) {
  const transition = duration ? { duration: duration } : {};
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

FadeIn.propTypes = {
  children: PropTypes.node.isRequired,
  duration: PropTypes.number,
};

FadeIn.defaultProps = {
  children: <div>Loading...</div>,
  duration: null,
};
