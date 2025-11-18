
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Header } from './components/Header';
import { ActionButton } from './components/ActionButton';
import { QualitySelector } from './components/QualitySelector';
import { removeBackground, Quality } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { MagicWandIcon } from './components/Icons';

const App: React.FC = () => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState<Quality>('high');

  const handleImageUpload = useCallback((file: File) => {
    setOriginalImageFile(file);
    setResultImage(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleRemoveBackground = async () => {
    if (!originalImageFile) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setResultImage(null);
    setError(null);

    try {
      const base64Image = await fileToBase64(originalImageFile);
      const mimeType = originalImageFile.type;
      
      const resultBase64 = await removeBackground(base64Image, mimeType, quality);
      setResultImage(`data:image/png;base64,${resultBase64}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    const originalFileName = originalImageFile?.name.split('.').slice(0, -1).join('.') || 'image';
    link.download = `${originalFileName}_no-bg.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleClear = () => {
    setOriginalImageFile(null);
    setOriginalImagePreview(null);
    setResultImage(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-gray-900 text-white flex flex-col items-center p-4 sm:p-6 md:p-8">
      <Header />
      <main className="flex flex-col items-center w-full max-w-6xl flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8 flex-grow">
          <ImageUploader onImageUpload={handleImageUpload} imagePreview={originalImagePreview} onClear={handleClear} />
          <ResultDisplay resultImage={resultImage} isLoading={isLoading} error={error} onDownload={handleDownload} />
        </div>
        
        {error && (
            <div className="w-full max-w-sm mt-4 p-3 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg text-center animate-fade-in">
                {error}
            </div>
        )}

        {originalImageFile && (
          <div className="mt-8 mb-4 sticky bottom-4 z-10 flex flex-col items-center gap-4">
            <QualitySelector 
              selectedQuality={quality}
              onQualityChange={setQuality}
              disabled={isLoading}
            />
            <ActionButton
              onClick={handleRemoveBackground}
              disabled={isLoading || !originalImageFile}
              isLoading={isLoading}
            >
              <MagicWandIcon />
              {isLoading ? 'Processing...' : 'Remove Background'}
            </ActionButton>
          </div>
        )}
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by Gemini. High quality background removal in seconds.</p>
      </footer>
    </div>
  );
};

export default App;
