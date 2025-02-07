import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface VideoSectionProps {
  videoUrl?: string;
  className?: string;
}

const VideoSection = ({ 
  videoUrl = "https://framerusercontent.com/assets/9jRcdX07q3bSLXhHxRqzX8QS0.mp4",
  className = ""
}: VideoSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Transform values for combined elevation and slant-to-straight animation
  const y = useTransform(scrollYProgress, 
    [0, 0.5, 1], 
    [200, 100, 0]
  ); // Smooth elevation

  const rotateX = useTransform(scrollYProgress,
    [0, 0.5, 1],
    [30, 15, 0]
  ); // Slant to straight transition

  const z = useTransform(scrollYProgress,
    [0, 0.5, 1],
    [-100, 0, 100]
  ); // Forward movement

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  return (
    <section 
      ref={sectionRef} 
      className={`w-full min-h-[80vh] flex items-center justify-center px-4 py-8 overflow-hidden -mt-24 ${className}`}
    >
      <div className="w-full max-w-6xl perspective-[2500px]">
        <motion.div
          style={{
            y,
            z,
            rotateX,
            opacity,
            scale,
            transformStyle: "preserve-3d",
            transformOrigin: "50% 100%",
            willChange: "transform",
          }}
          className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        >
          <video
            src={videoUrl}
            loop
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover rounded-2xl"
            style={{ 
              objectFit: 'contain',
              backfaceVisibility: 'hidden',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;