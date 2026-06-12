import React from 'react';

export const Logo: React.FC<{ className?: string, showText?: boolean }> = ({ className = "h-8 w-8", showText = true }) => {
  return (
    <div className="flex items-center gap-2">
      <div className={`relative flex items-center justify-center ${className}`}>
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/c9e456bd-1693-457c-98ec-59c62eb1695a/e-tech-all-tech-premium-logo-01efe0bf-1781243377148.webp" 
          alt="E Tech All Tech Logo" 
          className="w-full h-full object-contain rounded-md"
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-tight tracking-tight uppercase">
            E Tech <span className="text-primary">All Tech</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-70">
            Repair & Solutions
          </span>
        </div>
      )}
    </div>
  );
};
