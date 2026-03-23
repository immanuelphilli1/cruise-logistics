import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './Button';

export interface FeaturedCar {
  name: string;
  subtitle: string;
  description: string;
  src: string;
}

interface FeaturedCarsProps {
  cars: FeaturedCar[];
  autoplay?: boolean;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export function FeaturedCars({ cars, autoplay = true }: FeaturedCarsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const carsLength = useMemo(() => cars.length, [cars]);
  const activeCar = useMemo(() => cars[activeIndex], [activeIndex, cars]);

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (autoplay && carsLength > 0) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % carsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, carsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % carsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [carsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + carsLength) % carsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [carsLength]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handlePrev, handleNext]);

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + carsLength) % carsLength === index;
    const isRight = (activeIndex + 1) % carsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: 'auto',
        transform: 'translateX(0px) translateY(0px) scale(1) rotateY(0deg)',
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: 'none',
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (cars.length === 0) return null;

  return (
    <div className="w-4/5 md:w-full max-w-xl md:max-w-7xl p-8">
      <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
        {/* Images */}
        <div
          ref={imageContainerRef}
          className="featured-cars-image-container relative w-full h-80 md:h-96"
          style={{ perspective: '1000px' }}
        >
          {cars.map((car, index) => (
            <img
              key={`${car.src}-${index}`}
              src={car.src}
              alt={car.name}
              className="featured-cars-image absolute inset-0 w-full h-full rounded-2xl object-cover shadow-xl"
              style={getImageStyle(index)}
            />
          ))}
        </div>
        {/* Content */}
        <div className="flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h3 className="font-heading text-2xl font-bold text-army-green md:text-[1.75rem]">
                {activeCar.name}
              </h3>
              <p className="mt-1 text-sm text-metallic-brown md:text-base">
                {activeCar.subtitle}
              </p>
              <p className="mt-6 leading-relaxed text-text-muted md:text-lg">
                {activeCar.description.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                    animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.22,
                      ease: 'easeInOut',
                      delay: 0.025 * i,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </p>
              <Link to="/car-rentals" className="mt-8 inline-block">
                <Button variant="primary">View &amp; book</Button>
              </Link>
            </motion.div>
          </AnimatePresence>
          <div className="mt-12 flex gap-6 pt-8 md:mt-0 md:pt-0">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-none transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-metallic-brown focus-visible:ring-offset-2 focus-visible:ring-offset-primary-black"
              style={{
                backgroundColor: hoverPrev ? '#ff3131' : '#1a1a1a',
                color: '#fafafa',
              }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous car"
            >
              <FaArrowLeft size={22} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-none transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-metallic-brown focus-visible:ring-offset-2 focus-visible:ring-offset-primary-black"
              style={{
                backgroundColor: hoverNext ? '#ff3131' : '#1a1a1a',
                color: '#fafafa',
              }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next car"
            >
              <FaArrowRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
