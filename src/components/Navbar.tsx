import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Tag } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import LiveChat from './LiveChat';

// Enhanced search result types
interface SearchResult {
  title: string;
  description: string;
  link: string;
  type: 'page' | 'service' | 'feature' | 'content';
  tags?: string[];
  priority: number;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  // Comprehensive search data
  const searchData: SearchResult[] = [
    // Pages
    { 
      title: "Home",
      description: "Welcome to MakemySite - Web Development Services",
      link: "/",
      type: 'page',
      tags: ['home', 'main'],
      priority: 1
    },
    { 
      title: "About Us",
      description: "Learn about our company and values",
      link: "/about",
      type: 'page',
      tags: ['company', 'team'],
      priority: 2
    },
    // Services
    {
      title: "Custom Web Development",
      description: "Tailored websites built from scratch",
      link: "/services",
      type: 'service',
      tags: ['development', 'custom', 'responsive'],
      priority: 3
    },
    {
      title: "E-commerce Solutions",
      description: "Powerful online stores with payment integration",
      link: "/services",
      type: 'service',
      tags: ['ecommerce', 'shop', 'store'],
      priority: 3
    },
    // Features
    {
      title: "Responsive Design",
      description: "Websites that work on all devices",
      link: "/services#responsive",
      type: 'feature',
      tags: ['mobile', 'tablet', 'desktop'],
      priority: 4
    },
    // Add more searchable content...
  ];

  // Enhanced search function with debounce
  const handleSearch = useCallback(
    debounce((query: string) => {
      if (query.length > 1) {
        const searchTerms = query.toLowerCase().split(' ');
        
        const scored = searchData
          .map(item => {
            let score = 0;
            const searchableText = `
              ${item.title.toLowerCase()} 
              ${item.description.toLowerCase()} 
              ${item.tags?.join(' ').toLowerCase() || ''}
            `;

            // Score calculation
            searchTerms.forEach(term => {
              // Exact matches in title
              if (item.title.toLowerCase().includes(term)) score += 10;
              // Exact matches in description
              if (item.description.toLowerCase().includes(term)) score += 5;
              // Tag matches
              if (item.tags?.some(tag => tag.toLowerCase().includes(term))) score += 3;
              // Partial matches
              if (searchableText.includes(term)) score += 1;
            });

            return {
              ...item,
              score: score * (1 / item.priority) // Adjust score by priority
            };
          })
          .filter(item => item.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 5); // Limit to top 5 results

        setSearchResults(scored);
      } else {
        setSearchResults([]);
      }
    }, 150),
    [searchData]
  );

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          handleResultClick(searchResults[selectedIndex]);
        }
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(result.link);
    setIsSearchOpen(false);
    setSearchResults([]);
    setSearchQuery("");
    setSelectedIndex(-1);
  };

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
    <>
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
                  onClick={() => setIsChatOpen(true)}
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
                    <div className="relative">
                      <motion.input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          handleSearch(e.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Search pages, services, features..."
                        className="w-full px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 
                                 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20
                                 text-white placeholder:text-white/50 text-sm pr-24"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        autoFocus
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <kbd className="px-2 py-0.5 text-xs text-white/40 bg-white/5 rounded">
                          {isSearchOpen ? 'ESC' : '/'}
                        </kbd>
                      </div>
                    </div>

                    {/* Enhanced Search Results Dropdown */}
                    <AnimatePresence>
                      {searchResults.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 py-2 bg-black/90 backdrop-blur-xl 
                                   border border-white/10 rounded-lg shadow-xl max-h-[60vh] overflow-y-auto"
                        >
                          {searchResults.map((result, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className={`px-4 py-2 hover:bg-white/5 cursor-pointer ${
                                selectedIndex === index ? 'bg-white/10' : ''
                              }`}
                              onClick={() => handleResultClick(result)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-medium text-white flex items-center gap-2">
                                    {result.title}
                                    <span className={`text-xs px-2 py-0.5 rounded ${
                                      getTypeStyles(result.type)
                                    }`}>
                                      {result.type}
                                    </span>
                                  </h3>
                                  <p className="text-sm text-white/60 mt-1">{result.description}</p>
                                  {result.tags && (
                                    <div className="flex items-center gap-2 mt-1">
                                      <Tag className="w-3 h-3 text-white/40" />
                                      <div className="flex gap-1">
                                        {result.tags.map((tag, i) => (
                                          <span key={i} className="text-xs text-white/40">
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <ArrowRight className="w-4 h-4 text-white/40" />
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
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
      <LiveChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  );
};

// Utility function for type styles
const getTypeStyles = (type: string) => {
  switch (type) {
    case 'page':
      return 'bg-blue-500/20 text-blue-300';
    case 'service':
      return 'bg-green-500/20 text-green-300';
    case 'feature':
      return 'bg-purple-500/20 text-purple-300';
    default:
      return 'bg-white/10 text-white/60';
  }
};

export default Navbar;
