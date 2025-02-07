import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Refined transform values to match the exact specifications
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.862283, 0.93, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [17.2146, 8, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.4, 0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section 
      ref={sectionRef} 
      className="w-full min-h-screen flex items-center justify-center px-4 py-12 -mt-32 overflow-hidden"
    >
      <motion.div
        style={{
          scale,
          rotateX,
          opacity,
          y,
          perspective: "1200px",
          willChange: "transform",
        }}
        className="w-full max-w-6xl rounded-2xl overflow-hidden border border-white/10"
      >
        <video
          src="https://framerusercontent.com/assets/9jRcdX07q3bSLXhHxRqzX8QS0.mp4"
          loop
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover rounded-2xl"
          style={{ objectFit: 'contain' }}
        />
      </motion.div>
    </section>
  );
};

export default VideoSection;