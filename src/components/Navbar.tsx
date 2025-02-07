import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Search, ChevronDown } from "lucide-react";
import CTAButton from "./CTAButton";

const Navbar = () => {
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-8"
    >
      <motion.div 
        className="mx-auto bg-black/50 backdrop-blur-lg border border-white/10 rounded-2xl max-w-5xl mt-4"
        animate={{
          maxWidth: isScrolled ? "90%" : "100%"
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-8">
            <motion.h1 
              className="text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              makemysite
            </motion.h1>
            
            <div className="hidden md:flex items-center gap-6">
              <button className="text-white/80 hover:text-white transition-colors">
                Company
              </button>
              
              <button 
                className="flex items-center gap-1 text-white/80 hover:text-white transition-colors"
                onMouseEnter={() => setIsIndustriesOpen(true)}
                onMouseLeave={() => setIsIndustriesOpen(false)}
              >
                Industries
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <button 
                className="flex items-center gap-1 text-white/80 hover:text-white transition-colors"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                Products
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <button className="text-white/80 hover:text-white transition-colors">
                API
              </button>
              
              <button className="text-white/80 hover:text-white transition-colors flex items-center gap-1">
                Superbolt
                <span className="text-xs px-1.5 py-0.5 bg-white/10 rounded-full">New</span>
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-1.5 hover:bg-white/5 rounded-full transition-colors">
              <Moon className="w-4 h-4 text-white/80" />
            </button>
            <button className="p-1.5 hover:bg-white/5 rounded-full transition-colors">
              <Search className="w-4 h-4 text-white/80" />
            </button>
            <CTAButton>Try GeoSpy</CTAButton>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
