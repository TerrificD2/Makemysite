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

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <section 
      ref={sectionRef}
      className="relative -mt-32 mb-20 py-8 px-4"
    >
      <div className="max-w-6xl mx-auto">
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
          className="relative aspect-video rounded-2xl overflow-hidden bg-white/5"
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