import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export interface FAQItemData {
  question: string;
  answer: string;
}

export interface FAQTabsProps {
  title?: string;
  subtitle?: string;
  categories: Record<string, string>;
  faqData: Record<string, FAQItemData[]>;
  className?: string;
}

export function FAQTabs({
  title = 'FAQs',
  subtitle = 'Frequently Asked Questions',
  categories,
  faqData,
  className,
  ...props
}: FAQTabsProps & React.HTMLAttributes<HTMLElement>) {
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);

  return (
    <section
      className={cn(
        'relative overflow-hidden px-4 py-12 text-army-green',
        className
      )}
      {...props}
    >
      <FAQHeader title={title} subtitle={subtitle} />
      <FAQTabsList
        categories={categories}
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />
      <FAQList faqData={faqData} selected={selectedCategory} />
    </section>
  );
}

function FAQHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center">
      <span className="mt-20 bg-linear-to-r from-bronze-gold to-bronze-gold/60 bg-clip-text font-medium text-transparent">
        {subtitle}
      </span>
      <h2 className="mt-20 mb-8 font-heading text-5xl font-bold text-army-green">
        {title}
      </h2>
      <span
        className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-linear-to-r from-bronze-gold/10 to-bronze-gold/5 blur-3xl"
        aria-hidden
      />
    </div>
  );
}

function FAQTabsList({
  categories,
  selected,
  setSelected,
}: {
  categories: Record<string, string>;
  selected: string;
  setSelected: (key: string) => void;
}) {
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
      {Object.entries(categories).map(([key, label]) => (
        <button
          key={key}
          type="button"
          onClick={() => setSelected(key)}
          className={cn(
            'relative overflow-hidden whitespace-nowrap rounded-md border px-3 py-1.5 text-sm font-medium transition-colors duration-500',
            selected === key
              ? 'border-bronze-gold text-primary-black'
              : 'border-white/20 bg-transparent text-text-muted hover:text-bronze-gold'
          )}
        >
          <span className="relative z-10">{label}</span>
          <AnimatePresence>
            {selected === key && (
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.5, ease: 'backIn' }}
                className="absolute inset-0 z-0 bg-linear-to-r from-bronze-gold to-bronze-gold/80"
              />
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
}

function FAQList({
  faqData,
  selected,
}: {
  faqData: Record<string, FAQItemData[]>;
  selected: string;
}) {
  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <AnimatePresence mode="wait">
        {Object.entries(faqData).map(([category, questions]) => {
          if (selected === category) {
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: 'backIn' }}
                className="space-y-4"
              >
                {questions.map((faq, index) => (
                  <FAQItem key={`${category}-${index}`} {...faq} />
                ))}
              </motion.div>
            );
          }
          return null;
        })}
      </AnimatePresence>
    </div>
  );
}

function FAQItem({ question, answer }: FAQItemData) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      className={cn(
        'rounded-xl border transition-colors',
        isOpen ? 'border-bronze-gold/30 bg-dark-grey' : 'border-white/10 bg-dark-grey'
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
      >
        <span
          className={cn(
            'text-lg font-medium transition-colors',
            isOpen ? 'text-white' : 'text-text-muted'
          )}
        >
          {question}
        </span>
        <motion.span
          variants={{
            open: { rotate: '45deg' },
            closed: { rotate: '0deg' },
          }}
          transition={{ duration: 0.2 }}
        >
          <Plus
            className={cn(
              'h-5 w-5 shrink-0 transition-colors',
              isOpen ? 'text-bronze-gold' : 'text-text-muted'
            )}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          marginBottom: isOpen ? 16 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden px-4"
      >
        <p className="pb-4 text-text-muted">{answer}</p>
      </motion.div>
    </motion.div>
  );
}
