import React from 'react';

export const AnimatedButton = React.memo(({ onClick, children, showAnimation }: { 
  onClick: () => void;
  children: React.ReactNode;
  showAnimation: boolean;
}) => {
  return (
    <button 
      onClick={onClick} 
      className="relative group"
    >
      <div className={`absolute inset-0 rounded-lg ${showAnimation ? 'before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-pink-500 before:animate-gradientSpin after:absolute after:inset-[1px] after:rounded-[7px] after:bg-black/95' : ''}`} />
      <div className="relative p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
        {children}
      </div>
    </button>
  );
});
