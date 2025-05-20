import React from 'react';

type NavigationButtonProps = {
  label: string;
  Icon: React.ReactNode;
  onClick: () => void;
};

const NavigationButton: React.FC<NavigationButtonProps> = ({ label, Icon, onClick }) => (
  <button
    className="absolute top-24 left-12 w-16 h-16 rounded-full transition-all duration-300 scale-100 opacity-100"
    onClick={onClick}
    title={label}
    style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Background glow effect */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-70 blur-xl transform scale-110" />
    </div>

    {/* Main button content */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-full p-1">
      <div className="relative bg-black/80 rounded-full p-4 h-full overflow-hidden flex items-center justify-center">
        <div className="text-white text-lg">{Icon}</div>
      </div>
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 space-y-1">
        <span className="block text-xs text-white/50 font-medium whitespace-nowrap">{label}</span>
      </div>
    </div>
  </button>
);

export default NavigationButton;