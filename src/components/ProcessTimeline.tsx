import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export interface ProcessStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  duration: string;
  image: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
  defaultStep?: string;
}

export function ProcessTimeline({ steps, defaultStep }: ProcessTimelineProps) {
  const [activeStep, setActiveStep] = useState(defaultStep ?? steps[0]?.id);

  const activeStepData = steps.find((step) => step.id === activeStep);
  const activeIndex = steps.findIndex((step) => step.id === activeStep);

  if (steps.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 sm:p-8 font-sans bg-white border border-white/10 shadow-2xl rounded-2xl">
      <TimelineNav
        steps={steps}
        activeStep={activeStep}
        onStepClick={setActiveStep}
      />

      <AnimatePresence mode="wait">
        {activeStepData && (
          <motion.div
            key={activeStepData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid md:grid-cols-2 gap-12"
          >
            <TimelineContent step={activeStepData} />
            <TimelinePhoneMockup image={activeStepData.image} alt={activeStepData.title} />
          </motion.div>
        )}
      </AnimatePresence>

      <BottomTimeline
        steps={steps}
        activeIndex={activeIndex}
        onStepClick={setActiveStep}
      />
    </div>
  );
}

function TimelineNav({
  steps,
  activeStep,
  onStepClick,
}: {
  steps: ProcessStep[];
  activeStep: string;
  onStepClick: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-army-green/20 font-heading text-lg font-bold text-army-green">
          CL
        </div>
        <span className="font-heading text-xl font-bold text-white">
          How it works
        </span>
      </div>
      <div className="hidden md:flex items-center gap-2 p-1 bg-army-green rounded-full border border-white/10">
        {steps.map((step) => (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepClick(step.id)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-gold focus-visible:ring-offset-2 focus-visible:ring-offset-army-green',
              activeStep === step.id
                ? 'bg-text-muted text-white shadow-sm'
                : 'text-text-muted hover:bg-white/5 hover:text-white'
            )}
          >
            {step.id}
          </button>
        ))}
      </div>
    </div>
  );
}

function TimelineContent({ step }: { step: ProcessStep }) {
  return (
    <div>
      <span className="text-sm font-bold text-metallic-brown">{step.id}</span>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold mt-2 text-army-green">
        {step.title}
      </h2>
      <p className="mt-1 text-metallic-brown/90">{step.subtitle}</p>
      <p className="mt-4 text-text-muted leading-relaxed">{step.description}</p>
      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        {step.details.map((detail, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bronze-gold/20 text-bronze-gold text-xs">
              ✓
            </div>
            <span className="text-sm text-army-green">{detail}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-3 p-3 bg-army-green rounded-lg border border-white/10">
        <span className="text-[#c9a962]" aria-hidden="true">⏳</span>
        <span className="text-sm font-semibold text-text-muted">
          Typical duration: {step.duration}
        </span>
      </div>
    </div>
  );
}

function TimelinePhoneMockup({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-56 sm:w-64 h-[448px] sm:h-[512px] bg-army-green rounded-[40px] p-3 sm:p-4 border-4 border-bronze-gold/30 shadow-2xl">
        <div className="w-full h-full rounded-[24px] overflow-hidden bg-dark-grey">
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function BottomTimeline({
  steps,
  activeIndex,
  onStepClick,
}: {
  steps: ProcessStep[];
  activeIndex: number;
  onStepClick: (id: string) => void;
}) {
  const progressPercent = steps.length <= 1 ? 100 : (activeIndex / (steps.length - 1)) * 100;

  return (
    <div className="mt-16">
      <div className="relative w-full h-1 bg-army-green rounded-full border border-white/5">
        <motion.div
          className="absolute h-1 bg-bronze-gold rounded-full"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-4 h-4 -top-1.5 rounded-full bg-bronze-gold shadow-[0_0_0_4px_rgba(201,169,98,0.2)]"
          initial={false}
          animate={{ left: `calc(${progressPercent}% - 8px)` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
      <div className="mt-4 flex justify-between gap-2">
        {steps.map((step, i) => (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepClick(step.id)}
            className="text-center min-w-0 flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-gold focus-visible:ring-offset-2 focus-visible:ring-offset-army-green rounded"
          >
            <span
              className={cn(
                'text-sm font-semibold transition-colors',
                i <= activeIndex ? 'text-bronze-gold' : 'text-text-muted'
              )}
            >
              {step.id}
            </span>
            <p
              className={cn(
                'text-xs mt-1 transition-colors truncate',
                i <= activeIndex ? 'text-[#e5e5e5]' : 'text-[#6b6b6b]'
              )}
            >
              {step.title.split(' ')[0]}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
