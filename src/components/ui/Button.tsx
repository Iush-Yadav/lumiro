import Link from 'next/link';

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'subtle';
  size?: 'md' | 'lg';
  type?: 'button' | 'submit';
  full?: boolean;
  disabled?: boolean;
  className?: string;
};

const VARIANTS = {
  primary:
    'bg-ink text-paper shadow-glow-soft hover:bg-ink-2 hover:shadow-glow',
  ghost:
    'border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.04]',
  subtle:
    'border border-ink/10 bg-sand text-ink/80 hover:border-ink/25 hover:text-ink',
};

const SIZES = {
  md: 'px-7 py-3 text-[0.72rem]',
  lg: 'px-9 py-4 text-xs',
};

export default function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'lg',
  type = 'button',
  full,
  disabled,
  className = '',
}: ButtonProps) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase tracking-[0.18em] transition-all duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${full ? 'w-full' : ''} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
