import { useState, useEffect, useMemo, useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
} from 'framer-motion';

type AnimationPhase = 'scatter' | 'line' | 'circle';

export interface PartnerItem {
  name: string;
  logoUrl: string;
}

interface FlipCardProps {
  partner: PartnerItem;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: {
    x: number;
    y: number;
    rotation: number;
    scale: number;
    opacity: number;
  };
}

const CARD_WIDTH = 128;
const CARD_HEIGHT = 176;

function FlipCard({ partner, target }: FlipCardProps) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: 'spring', stiffness: 40, damping: 15 }}
      style={{
        position: 'absolute',
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-white border-white/10"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={partner.logoUrl}
            alt={partner.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
        </div>
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-primary-black flex flex-col items-center justify-center p-2 border border-[#c9a962]/30"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p className="text-[10px] font-bold text-[#c9a962] uppercase tracking-wider mb-0.5">
            Partner
          </p>
          <p className="text-xs font-medium text-white text-center leading-tight">
            {partner.name}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;

interface ScrollMorphPartnersProps {
  partners: PartnerItem[];
  /** Section title shown when arc is formed */
  title?: string;
}

const SCROLL_SECTION_HEIGHT = 250; // vh equivalent via min-height for scroll range

export function ScrollMorphPartners({
  partners,
  title = 'Our partners',
}: ScrollMorphPartnersProps) {
  const TOTAL = partners.length;
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Page scroll: progress 0→1 as this section scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on('change', setScrollProgress);
    return unsub;
  }, [scrollYProgress]);

  // Derive phase from scroll: 0–0.08 scatter, 0.08–0.22 line, 0.22+ circle (then morph/arc)
  const introPhase: AnimationPhase =
    scrollProgress < 0.08 ? 'scatter' : scrollProgress < 0.22 ? 'line' : 'circle';
  const morphValue = Math.max(
    0,
    Math.min(1, (scrollProgress - 0.35) / 0.25)
  );
  const rotateValue = Math.max(
    0,
    Math.min(360, ((scrollProgress - 0.6) / 0.4) * 360)
  );

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    ro.observe(el);
    setContainerSize({ width: el.offsetWidth, height: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const norm = (e.clientX - rect.left) / rect.width;
      mouseX.set((norm * 2 - 1) * 80);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [mouseX]);

  const [parallaxValue, setParallaxValue] = useState(0);
  useEffect(() => {
    const un = smoothMouseX.on('change', setParallaxValue);
    return un;
  }, [smoothMouseX]);

  const scatterPositions = useMemo(
    () =>
      partners.map(() => ({
        x: (Math.random() - 0.5) * 1200,
        y: (Math.random() - 0.5) * 800,
        rotation: (Math.random() - 0.5) * 180,
        scale: 0.6,
        opacity: 0,
      })),
    [partners.length]
  );

  const contentOpacity = Math.max(0, Math.min(1, (morphValue - 0.75) / 0.25));
  const contentY = contentOpacity < 1 ? 16 : 0;

  if (TOTAL === 0) return null;

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      style={{ minHeight: `${SCROLL_SECTION_HEIGHT}vh` }}
    >
      <div
        ref={viewportRef}
        className="sticky top-0 left-0 right-0 h-screen w-full overflow-hidden rounded-2xl border border-white/10 "
      >
      <div className="flex h-1/2 w-full flex-col items-center justify-center">
        <div
          style={{
            opacity: contentOpacity,
            transform: `translateY(${contentY}px)`,
          }}
          className="absolute top-[8%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
        >
          <h2 className="font-heading text-2xl md:text-4xl font-semibold text-army-green tracking-tight mb-2">
            {title}
          </h2>
          <p className="text-sm text-text-muted max-w-md">
            Trusted by leading brands. Scroll to explore.
          </p>
        </div>

        <div className="relative flex items-center justify-center w-full h-full">
          {partners.map((partner, i) => {
            let target: FlipCardProps['target'] = {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
            };

            if (introPhase === 'scatter') {
              target = scatterPositions[i];
            } else if (introPhase === 'line') {
              const lineSpacing = 76;
              const lineTotalWidth = TOTAL * lineSpacing;
              target = {
                x: i * lineSpacing - lineTotalWidth / 2,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
              };
            } else {
              const isMobile = containerSize.width < 768;
              const minDim = Math.min(containerSize.width, containerSize.height);
              const circleRadius = Math.min(minDim * 0.32, 280);
              const circleAngle = (i / TOTAL) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              const baseRadius = Math.min(
                containerSize.width,
                containerSize.height * 1.4
              );
              const arcRadius = baseRadius * (isMobile ? 1.3 : 1.05);
              const arcApexY = containerSize.height * (isMobile ? 0.38 : 0.28);
              const arcCenterY = arcApexY + arcRadius;
              const spreadAngle = isMobile ? 90 : 120;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / Math.max(TOTAL - 1, 1);
              const rotationProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
              const maxRotation = spreadAngle * 0.7;
              const boundedRotation = -rotationProgress * maxRotation;
              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;
              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.3 : 1.6,
              };

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return (
              <FlipCard
                key={partner.name}
                partner={partner}
                index={i}
                total={TOTAL}
                phase={introPhase}
                target={target}
              />
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}
