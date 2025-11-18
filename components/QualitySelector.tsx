import React from 'react';
import { Quality } from '../services/geminiService';

interface QualitySelectorProps {
  selectedQuality: Quality;
  onQualityChange: (quality: Quality) => void;
  disabled: boolean;
}

const qualityOptions: { id: Quality; label: string, description: string }[] = [
  { id: 'medium', label: 'Medium', description: 'Faster processing' },
  { id: 'high', label: 'High', description: 'Best balance' },
  { id: 'ultra', label: 'Ultra', description: 'Maximum detail' },
  { id: 'original', label: 'Original', description: 'Max quality / Large file' },
];

export const QualitySelector: React.FC<QualitySelectorProps> = ({ selectedQuality, onQualityChange, disabled }) => {
  return (
    <div className="w-full max-w-sm animate-fade-in">
        <label className="block text-center text-sm font-medium text-gray-400 mb-2">Select Output Quality</label>
        <div className="flex justify-center bg-base-200 rounded-full p-1 shadow-inner">
        {qualityOptions.map((option) => (
            <button
            key={option.id}
            onClick={() => onQualityChange(option.id)}
            disabled={disabled}
            className={`w-full text-center px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-light/50
                ${selectedQuality === option.id 
                    ? 'bg-brand-primary text-white shadow' 
                    : 'text-gray-300 hover:bg-base-300'
                }
                ${disabled ? 'cursor-not-allowed opacity-60' : ''}
            `}
            aria-pressed={selectedQuality === option.id}
            >
            <span className="block">{option.label}</span>
            <span className="block text-xs opacity-70">{option.description}</span>
            </button>
        ))}
        </div>
    </div>
  );
};
