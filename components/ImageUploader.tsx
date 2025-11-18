
import React, { useCallback, useState } from 'react';
import { UploadIcon, TrashIcon } from './Icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imagePreview: string | null;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imagePreview, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-base-200/50 border-2 border-dashed border-base-300 rounded-2xl p-6 transition-all duration-300 h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
      <div className="relative w-full h-full flex items-center justify-center">
        {imagePreview ? (
          <div className="w-full h-full relative group animate-fade-in">
            <img src={imagePreview} alt="Original" className="object-contain w-full h-full max-h-[calc(100vh-20rem)] rounded-xl" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
              <button
                onClick={onClear}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 transition-transform transform hover:scale-110"
                aria-label="Remove image"
              >
                <TrashIcon />
              </button>
            </div>
          </div>
        ) : (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            className={`w-full h-full flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-300 rounded-xl ${isDragging ? 'bg-brand-primary/20 border-brand-primary' : 'border-transparent'}`}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/webp"
            />
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
              <UploadIcon />
              <p className="mt-4 text-lg font-semibold text-gray-300">Drag & drop an image here</p>
              <p className="text-sm text-gray-400">or</p>
              <span className="mt-2 font-medium text-brand-light hover:text-white transition-colors duration-300">
                Click to browse files
              </span>
              <p className="text-xs text-gray-500 mt-4">PNG, JPG, WEBP supported</p>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
