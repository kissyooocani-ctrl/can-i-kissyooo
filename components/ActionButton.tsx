
import React from 'react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ children, isLoading, disabled, ...props }) => {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-brand-light/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </button>
  );
};
