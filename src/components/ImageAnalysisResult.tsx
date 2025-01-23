'use client';

import { useState } from 'react';
import { BilingualText } from './BilingualText';
import { FaUpload, FaTimes } from 'react-icons/fa';

interface ImageAnalysisResultProps {
  imageUrl: string;
  result: {
    description: string;
    tags: string[];
    isNSFW: boolean;
  } | null;
  isLoading?: boolean;
  onReset?: () => void;
}

export default function ImageAnalysisResult({
  imageUrl,
  result,
  isLoading,
  onReset
}: ImageAnalysisResultProps) {
  const [showPreview, setShowPreview] = useState(false);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="loading-spinner mx-auto" />
        <p className="mt-4 text-gray-600">
          <BilingualText
            zh="正在分析图片..."
            en="Analyzing image..."
          />
        </p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 relative">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt="Analyzed"
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => setShowPreview(true)}
              />
            </div>
            {onReset && (
              <button
                onClick={onReset}
                className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                title="重新上传"
              >
                <FaUpload />
              </button>
            )}
          </div>
          
          <div className="w-full md:w-2/3 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">
                <BilingualText
                  zh="图片描述"
                  en="Description"
                />
              </h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {result.description}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                <BilingualText
                  zh="相关标签"
                  en="Tags"
                />
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPreview && (
        <div 
          className="fixed inset-0 bg-black flex items-center justify-center z-50 mt-0-important"
          onClick={() => setShowPreview(false)}
        >
          <button
            onClick={() => setShowPreview(false)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white z-10"
          >
            <FaTimes className="w-6 h-6" />
          </button>
          <div className="w-full h-full flex items-center justify-center mt-0-important">
            <img
              src={imageUrl}
              alt="Preview"
              className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain cursor-zoom-out select-none"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </div>
        </div>
      )}
    </>
  );
} 