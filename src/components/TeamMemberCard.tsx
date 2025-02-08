import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  socials: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}

interface TeamMemberCardProps {
  member: TeamMember;
  direction: number;
  isActive: boolean;
  index: number;
  totalCards: number;
  activeIndex: number;
}

const TeamMemberCard = ({ member, direction, isActive, index, totalCards, activeIndex }: TeamMemberCardProps) => {
  const getStackStyles = (index: number, isActive: boolean) => {
    if (isActive) {
      return {
        position: 'absolute' as const,
        transform: 'translate(-50%, -50%) rotateY(0deg)',
        zIndex: totalCards,
        opacity: 1
      };
    }
    
    const isNext = (index - activeIndex + totalCards) % totalCards === 1;
    const isPrev = (index - activeIndex + totalCards) % totalCards === totalCards - 1;
    const offset = 20;
    
    if (isNext) {
      return {
        position: 'absolute' as const,
        transform: `translate(calc(-50% + ${offset * 2}px), -50%) rotateY(-15deg) rotateZ(-5deg)`,
        zIndex: totalCards - 1,
        opacity: 0.9
      };
    }
    
    if (isPrev) {
      return {
        position: 'absolute' as const,
        transform: `translate(calc(-50% - ${offset * 2}px), -50%) rotateY(15deg) rotateZ(5deg)`,
        zIndex: totalCards - 1,
        opacity: 0.9
      };
    }

    return {
      position: 'absolute' as const,
      transform: `translate(-50%, -50%) 
        rotateY(${(index - activeIndex) * 45}deg) 
        translateZ(-${Math.abs(index - activeIndex) * 100}px)`,
      zIndex: totalCards - Math.abs(index - activeIndex) - 1,
      opacity: Math.max(1 - Math.abs(index - activeIndex) * 0.3, 0),
      filter: `blur(${Math.abs(index - activeIndex) * 2}px)`
    };
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        rotateY: direction * 90,
        scale: 0.5
      }}
      animate={{ 
        opacity: 1,
        rotateY: 0,
        scale: 1,
        ...getStackStyles(index, isActive)
      }}
      exit={{ 
        opacity: 0,
        rotateY: direction * -90,
        scale: 0.5
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1.2
      }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        willChange: "transform",
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
      }}
      className="container perspective-1000"
    >
      <div className="tracker">
        <div className="canvas">
          {[...Array(25)].map((_, i) => (
            <div key={i} className={`tr-${i + 1}`}></div>
          ))}
        </div>
      </div>
      
      <div id="card">
        <div className="card-content">
          <div className="corner-elements">
            <span></span><span></span><span></span><span></span>
          </div>
          
          <div className="cyber-lines">
            <span></span><span></span><span></span><span></span>
          </div>
          
          <div className="scan-line"></div>
          <div className="card-glare"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-white/20">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-xl font-bold text-white/90 mb-2 tracking-wider uppercase">
              {member.role}
            </p>

            <div className="flex justify-center gap-3 mt-3">
              <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-white/60 hover:text-white text-lg transition-colors" />
              </a>
              <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-white/60 hover:text-white text-lg transition-colors" />
              </a>
              <a href={member.socials.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-white/60 hover:text-white text-lg transition-colors" />
              </a>
            </div>
          </div>

          <div className="glowing-elements">
            <div className="glow-1"></div>
            <div className="glow-2"></div>
            <div className="glow-3"></div>
          </div>

          <div className="card-particles">
            {[...Array(6)].map((_, i) => (
              <span key={i}></span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard; 