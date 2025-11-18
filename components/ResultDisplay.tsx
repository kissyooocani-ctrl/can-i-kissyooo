
import React from 'react';
import { DownloadIcon, ImageIcon, SparklesIcon } from './Icons';
import { ActionButton } from './ActionButton';


interface ResultDisplayProps {
  resultImage: string | null;
  isLoading: boolean;
  error: string | null;
  onDownload: () => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center">
        <div className="relative h-16 w-16">
            <div className="absolute inset-0 border-4 border-brand-primary/30 rounded-full"></div>
            <div className="absolute inset-0 border-t-4 border-brand-light rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-300">Removing background...</p>
        <p className="text-sm text-gray-400">The AI is working its magic!</p>
    </div>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ resultImage, isLoading, error, onDownload }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-base-200/50 border-2 border-dashed border-base-300 rounded-2xl p-6 transition-all duration-300 h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
      <div className="w-full h-full flex flex-col items-center justify-center">
        {isLoading ? (
          <LoadingSpinner />
        ) : resultImage ? (
          <div className="w-full h-full flex flex-col items-center justify-center animate-fade-in">
            <div 
              className="flex-grow w-full h-full p-4 rounded-xl mb-4"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #374151 25%, transparent 25%), 
                  linear-gradient(-45deg, #374151 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, #374151 75%),
                  linear-gradient(-45deg, transparent 75%, #374151 75%)`,
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}
            >
              <img src={resultImage} alt="Result" className="object-contain w-full h-full max-h-[calc(100vh-25rem)]" />
            </div>
            <ActionButton onClick={onDownload}>
              <DownloadIcon />
              Download Image
            </ActionButton>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <SparklesIcon />
            <p className="mt-4 text-lg font-semibold">Your result will appear here</p>
            <p className="text-sm">Upload an image and click "Remove Background"</p>
          </div>
        )}
      </div>
    </div>
  );
};
