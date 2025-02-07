
import { motion } from "framer-motion";

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const CTAButton = ({ children, onClick }: CTAButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative glass-effect px-4 py-1.5 rounded-full text-sm font-medium text-white 
                 transition-all duration-300 hover:bg-white/10"
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default CTAButton;
