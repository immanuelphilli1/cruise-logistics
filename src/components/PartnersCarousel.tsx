import { useState } from 'react';

export interface Partner {
  name: string;
  /** Logo image URL (use Vite import in the parent to get the correct URL for src/assets images) */
  logoUrl?: string;
}

function PartnerLogo({ partner }: { partner: Partner }) {
  const [failed, setFailed] = useState(false);
  const src = partner.logoUrl ?? null;

  if (failed || !src) {
    return (
      <div
        className="flex h-16 w-32 shrink-0 items-center justify-center rounded-lg bg-dark-grey border border-white/10 text-metallic-brown font-heading text-sm font-semibold"
        title={partner.name}
      >
        {partner.name.split(/\s/).map((w) => w[0]).join('')}
      </div>
    );
  }

  return (
    <div
      className="flex h-20 md:h-48 w-20 md:w-48 overflow-hidden shrink-0 items-center justify-center rounded-2xl bg-primary-black border border-white"
      title={partner.name}
    >
      <img
        src={src}
        alt={`${partner.name} logo`}
        className="max-h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

interface PartnersCarouselProps {
  partners: Partner[];
}

export function PartnersCarousel({ partners }: PartnersCarouselProps) {
  const duplicated = [...partners, ...partners];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex animate-partners-scroll gap-8 lg:gap-14 py-4">
        {duplicated.map((partner, i) => (
          <PartnerLogo key={`${partner.name}-${i}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}
