
import React from 'react';
import { ScissorIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center w-full max-w-2xl mx-auto mb-6">
      <div className="inline-flex items-center justify-center bg-gradient-to-r from-brand-primary to-brand-secondary p-3 rounded-full mb-4 shadow-lg">
        <ScissorIcon />
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
        AI Background Remover
      </h1>
      <p className="mt-4 text-lg text-gray-400">
        Instantly remove backgrounds with the power of AI. Upload your image to get a transparent PNG in seconds.
      </p>
    </header>
  );
};
