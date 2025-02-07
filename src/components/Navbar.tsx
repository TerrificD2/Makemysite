import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced search icon animation variants
  const searchIconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 15 },
    tap: { scale: 0.95, rotate: -15 },
    exit: { scale: 0, rotate: -180 },
    enter: { scale: 1, rotate: 0 }
  };

  // Enhanced search bar animation variants
  const searchBarVariants = {
    initial: { 
      width: 0, 
      opacity: 0,
      x: 50
    },
    animate: { 
      width: "250px", 
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      width: 0, 
      opacity: 0,
      x: 50,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-4"
    >
      <motion.div 
        className="mx-auto bg-black/50 backdrop-blur-lg border border-white/10 rounded-2xl max-w-4xl mt-4"
        animate={{
          maxWidth: isScrolled ? "70%" : "90%"
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between h-16 px-3">
          <div className="flex items-center gap-6">
            <Link to="/">
              <motion.h1 
                className="text-xl font-bold cursor-pointer text-white"
                whileHover={{ scale: 1.05 }}
              >
                MakemySite
              </motion.h1>
            </Link>
            
            <div className="hidden md:flex items-center gap-4">
              {['about', 'services', 'contact'].map((item) => (
                <Link key={item} to={`/${item}`}>
                  <span className="text-white/80 hover:text-white transition-colors cursor-pointer">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </span>
                </Link>
              ))}
              
              <button 
                onClick={() => navigate('/contact')}
                className="text-white/80 hover:text-white transition-colors flex items-center gap-1"
              >
                Let's Talk
                <span className="text-xs px-1.5 py-0.5 bg-white/10 rounded-full">New</span>
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              {isSearchOpen && (
                <motion.div
                  variants={searchBarVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative"
                >
                  <motion.input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 
                             focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20
                             text-white placeholder:text-white/50 text-sm"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    autoFocus
                  />
                  <motion.div 
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-xs text-white/40">Press /</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1.5 hover:bg-white/5 rounded-full transition-colors relative"
              variants={searchIconVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              aria-label="Toggle search"
            >
              <AnimatePresence mode="wait">
                {isSearchOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-4 h-4 text-white/80" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="search"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search className="w-4 h-4 text-white/80" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
