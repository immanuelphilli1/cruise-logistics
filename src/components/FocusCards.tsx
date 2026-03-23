import React, { useState } from 'react';

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export interface FocusCardItem {
  title: string;
  src: string;
  pricePerDay?: number;
}

interface CardProps {
  card: FocusCardItem;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  onBook?: (card: FocusCardItem) => void;
}

const Card = React.memo(({ card, index, hovered, setHovered, onBook }: CardProps) => (
  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={cn(
      'rounded-xl relative bg-neutral-100 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out',
      hovered !== null && hovered !== index && 'blur-sm scale-[0.98]'
    )}
  >
    <img
      src={card.src}
      alt={card.title}
      className="absolute inset-0 h-full w-full object-cover object-center"
    />
    {/* Name + amount always visible at bottom */}
    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/50 to-transparent pt-12 pb-4 px-4">
      <div className="text-xl md:text-2xl font-semibold text-white">
        {card.title}
      </div>
      {card.pricePerDay != null && (
        <div className="mt-1 text-sm md:text-base text-white/90">
          GH¢{card.pricePerDay} <span className="text-white/70">/ day</span>
        </div>
      )}
    </div>
    {/* On hover: Book button */}
    <div
      className={cn(
        'absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300',
        hovered === index ? 'opacity-100' : 'opacity-0'
      )}
    >
      {hovered === index && onBook && (
        <button
          type="button"
          onClick={() => onBook(card)}
          className="rounded-lg bg-bronze-gold px-8 py-3 font-semibold text-primary-black shadow-lg hover:bg-bronze-gold/90 focus:outline-none focus:ring-2 focus:ring-bronze-gold focus:ring-offset-2 transition-colors"
        >
          Book
        </button>
      )}
    </div>
  </div>
));

Card.displayName = 'Card';

interface FocusCardsProps {
  cards: FocusCardItem[];
  onBook?: (card: FocusCardItem) => void;
}

export function FocusCards({ cards, onBook }: FocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={`${card.title}-${index}`}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          onBook={onBook}
        />
      ))}
    </div>
  );
}
