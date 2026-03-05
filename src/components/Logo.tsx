interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'h-24',
    md: 'h-14',
    lg: 'h-20',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/Padula_Innenausbau_Logo_Weiss.png"
        alt="Padula Innenausbau GmbH"
        className={`${sizes[size]} w-auto object-contain`}
      />
    </div>
  );
}
