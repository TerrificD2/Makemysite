import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter = ({ from, to, duration = 2, suffix = "" }: AnimatedCounterProps) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, to, { duration });
      return animation.stop;
    }
  }, [count, to, isInView]);

  return (
    <motion.div ref={ref} className="text-3xl md:text-4xl font-bold">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.div>
  );
};

export default AnimatedCounter; 