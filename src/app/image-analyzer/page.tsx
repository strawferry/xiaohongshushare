'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import ImageAnalysisResult from '@/components/ImageAnalysisResult';
import ImageAnalysisHistoryPanel from '@/components/ImageAnalysisHistory';
import { BilingualText } from '@/components/BilingualText';
import { FaUpload, FaHistory } from 'react-icons/fa';

export default function ImageAnalyzerPage() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleUpload = async (imageUrl: string) => {
    setCurrentImage(imageUrl);
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });
      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setCurrentImage(null);
    setAnalysisResult(null);
  };

  const handleHistorySelect = (imageUrl: string, result: any) => {
    setCurrentImage(imageUrl);
    setAnalysisResult(result);
    setShowHistory(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">
            <BilingualText
              zh="AI 图像分析"
              en="AI Image Analysis"
            />
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            <BilingualText
              zh="上传图片，AI 将分析内容并生成描述和标签"
              en="Upload an image, AI will analyze and generate descriptions and tags"
            />
          </p>
        </div>

        {!currentImage ? (
          <ImageUploader
            onUpload={handleUpload}
            isUploading={isAnalyzing}
          />
        ) : (
          <ImageAnalysisResult
            imageUrl={currentImage}
            result={analysisResult}
            isLoading={isAnalyzing}
            onReset={handleReset}
          />
        )}
        <div className="flex justify-between space-x-4">
          <button
            onClick={() => setShowHistory(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FaHistory className="text-primary-500" />
            <span>
              <BilingualText
                zh="历史记录"
                en="History"
              />
            </span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FaUpload className="text-primary-500" />
            <span>
              <BilingualText
                zh="重新上传"
                en="Upload New"
              />
            </span>
          </button>
        </div>

        <ImageAnalysisHistoryPanel 
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
          onSelect={handleHistorySelect}
        />
      </div>
    </div>
  );
} 