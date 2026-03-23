import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  asChild?: boolean;
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  asChild,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center cursor-pointer justify-center rounded-md px-6 py-3 font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary-black disabled:opacity-50';
  const variants = {
    primary:
      'bg-bronze-gold text-primary-black hover:bg-bronze-gold/80 active:bg-bronze-gold/60',
    secondary:
      'border-2 border-bronze-gold bg-transparent text-bronze-gold hover:bg-bronze-gold/10 active:bg-bronze-gold/20',
  };
  const combined = `${base} ${variants[variant]} ${className}`.trim();

  if (asChild) {
    return <span className={combined}>{children}</span>;
  }
  return (
    <button type="button" className={combined} {...props}>
      {children}
    </button>
  );
}
