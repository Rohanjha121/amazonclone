import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    src: '/images/amazon_banner_electronics_1773416321496.png',
    alt: 'Mega Electronics Sale',
  },
  {
    id: 2,
    src: '/images/amazon_banner_fashion_1773416340577.png',
    alt: 'New Arrivals Fashion Weekly',
  },
  {
    id: 3,
    src: '/images/amazon_banner_home_1773416359781.png',
    alt: 'Revamp Your Home',
  },
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    hiddenRight: {
      x: '100%',
      opacity: 0,
    },
    hiddenLeft: {
      x: '-100%',
      opacity: 0,
    },
    visible: {
      x: '0',
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative w-full max-w-screen-2xl mx-auto overflow-hidden group">
      {/* Banner Container */}
      <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] w-full flex items-center justify-center bg-gray-100">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={currentIndex}
            src={banners[currentIndex].src}
            alt={banners[currentIndex].alt}
            variants={slideVariants}
            initial="hiddenRight"
            animate="visible"
            exit="exit"
            className="absolute inset-0 w-full h-full object-cover origin-top"
          />
        </AnimatePresence>
        
        {/* Gradient Overlay for bleeding into content below */}
        <div className="absolute inset-x-0 bottom-0 h-32 md:h-64 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-20 p-2 md:p-3 rounded-md border-2 border-transparent hover:border-white opacity-0 group-hover:opacity-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amazon-yellow text-white"
        aria-label="Previous banner"
      >
        <ChevronLeft size={40} strokeWidth={2.5}/>
      </button>
      
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-20 p-2 md:p-3 rounded-md border-2 border-transparent hover:border-white opacity-0 group-hover:opacity-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amazon-yellow text-white"
        aria-label="Next banner"
      >
        <ChevronRight size={40} strokeWidth={2.5}/>
      </button>
    </div>
  );
}

export default Hero;
