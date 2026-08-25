import React from 'react';

interface TaliseaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  theme?: 'dark' | 'light' | 'white';
}

export const TaliseaLogo: React.FC<TaliseaLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  theme = 'dark'
}) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-10 h-10', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-14 h-14', text: 'text-2xl sm:text-3xl', sub: 'text-xs' },
    xl: { icon: 'w-20 h-20', text: 'text-4xl', sub: 'text-sm' }
  };

  const currentSize = sizeMap[size];

  const textColor = theme === 'white' ? 'text-white' : 'text-slate-900';
  const taglineColor = theme === 'white' ? 'text-emerald-200' : 'text-slate-600';
  const dotColor = theme === 'white' ? 'text-cyan-400' : 'text-emerald-600';

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* SVG Infinity Seaweed + Twisted Rope Emblem */}
      <svg 
        viewBox="0 0 160 100" 
        className={`${currentSize.icon} shrink-0`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="leafGrad1" x1="20" y1="10" x2="60" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="leafGrad2" x1="40" y1="15" x2="80" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="ropeGrad" x1="80" y1="30" x2="140" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="transitionGrad" x1="50" y1="70" x2="110" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="50%" stopColor="#0f766e" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>

        {/* Seaweed Leaf 1 (Leftmost blade) */}
        <path 
          d="M32 65 C 24 50, 20 35, 30 20 C 35 32, 42 42, 45 60 C 39 63, 35 64, 32 65 Z" 
          fill="url(#leafGrad1)" 
        />
        
        {/* Seaweed Leaf 2 (Tall Main Center Blade) */}
        <path 
          d="M48 68 C 45 42, 48 18, 62 8 C 65 22, 60 40, 68 62 C 58 66, 52 67, 48 68 Z" 
          fill="url(#leafGrad1)" 
        />

        {/* Seaweed Leaf 3 (Right blade) */}
        <path 
          d="M62 65 C 64 45, 72 30, 84 25 C 80 40, 78 52, 75 66 C 70 65, 65 65, 62 65 Z" 
          fill="url(#leafGrad2)" 
        />

        {/* Bottom Swoop loop transitioning from Seaweed to Rope base */}
        <path 
          d="M 28 60 C 22 75, 40 92, 75 88 C 95 85, 108 72, 115 58 C 120 48, 128 35, 142 40 C 154 48, 150 68, 138 78 C 122 88, 105 76, 96 66 C 76 84, 45 88, 28 60 Z" 
          fill="url(#transitionGrad)" 
        />

        {/* Twisted Marine Rope Ring (Right Loop) */}
        <g stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round">
          {/* Rope strand 1 */}
          <path d="M 112 55 C 114 42, 122 30, 136 32" stroke="#1e3a8a" strokeWidth="7" fill="none" />
          <path d="M 114 48 L 118 43" stroke="#93c5fd" strokeWidth="2" />
          <path d="M 120 38 L 125 35" stroke="#93c5fd" strokeWidth="2" />
          <path d="M 128 32 L 134 31" stroke="#93c5fd" strokeWidth="2" />

          {/* Rope strand top-to-right */}
          <path d="M 136 32 C 148 34, 156 44, 154 58" stroke="#1e40af" strokeWidth="7" fill="none" />
          <path d="M 142 34 L 146 39" stroke="#93c5fd" strokeWidth="2" />
          <path d="M 149 43 L 152 49" stroke="#93c5fd" strokeWidth="2" />
          <path d="M 153 52 L 153 58" stroke="#93c5fd" strokeWidth="2" />

          {/* Rope strand bottom-right to inside */}
          <path d="M 154 58 C 152 72, 140 82, 126 80" stroke="#0f172a" strokeWidth="7" fill="none" />
          <path d="M 151 64 L 146 68" stroke="#93c5fd" strokeWidth="2" />
          <path d="M 143 72 L 137 75" stroke="#93c5fd" strokeWidth="2" />
          <path d="M 134 78 L 127 79" stroke="#93c5fd" strokeWidth="2" />

          {/* Rope loop inner crossover */}
          <path d="M 126 80 C 114 78, 108 68, 112 55" stroke="#1e3a8a" strokeWidth="7" fill="none" />
          <path d="M 122 79 L 117 74" stroke="#93c5fd" strokeWidth="2" />
          <path d="M 114 70 L 111 63" stroke="#93c5fd" strokeWidth="2" />
          <path d="M 110 60 L 112 54" stroke="#93c5fd" strokeWidth="2" />
        </g>
      </svg>

      {/* Typography */}
      <div className="flex flex-col">
        <div className={`font-black tracking-tight leading-none ${currentSize.text} ${textColor}`}>
          TALISEA<span className={dotColor}>.ID</span>
        </div>
        {showTagline && (
          <p className={`font-extrabold uppercase tracking-wider mt-1 ${currentSize.sub} ${taglineColor}`}>
            MENGHUBUNGKAN BENTANGAN TALI UNTUK KESEJAHTERAAN BERSAMA
          </p>
        )}
      </div>
    </div>
  );
};
