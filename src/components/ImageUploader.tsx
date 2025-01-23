'use client';

import { useState, useCallback } from 'react';
import { BilingualText } from './BilingualText';
import { FiUpload } from 'react-icons/fi';
import { imageAnalysisDB } from '@/lib/indexedDB';

interface ImageUploaderProps {
  onUpload: (imageUrl: string) => void;
  isUploading?: boolean;
}

export default function ImageUploader({ onUpload, isUploading }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const compressImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const maxWidth = 1200;
      const maxHeight = 1200;
      const maxSizeMB = 2;
      const quality = 0.8;

      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
        img.onload = () => {
          // 计算新的尺寸
          let width = img.width;
          let height = img.height;
          
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }

          // 创建 canvas 进行压缩
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          // 直接返回 base64 字符串
          const base64String = canvas.toDataURL('image/jpeg', quality);
          
          // 如果数据太大，继续压缩
          if (base64String.length > maxSizeMB * 1024 * 1024) {
            resolve(canvas.toDataURL('image/jpeg', quality * 0.8));
          } else {
            resolve(base64String);
          }
        };
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleAnalyzeImage = async (imageUrl: string) => {
    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      // 保存到 IndexedDB
      try {
        await imageAnalysisDB.addAnalysis({
          imageUrl,
          result,
          timestamp: Date.now()
        });
      } catch (error) {
        console.error('Failed to save to IndexedDB:', error);
      }

      onUpload(imageUrl);
      return result;
    } catch (error) {
      console.error('Analysis failed:', error);
      throw error;
    }
  };

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件');
      return;
    }

    try {
      const base64Image = await compressImage(file);
      setPreviewUrl(base64Image); // 直接使用 base64 作为预览
      await handleAnalyzeImage(base64Image);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('图片处理失败，请重试');
    }
  }, [onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-8 text-center
        ${dragActive ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30' : 
          'border-gray-300 dark:border-gray-700'}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-96 mx-auto rounded-lg"
          />
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <div className="loading-spinner" />
            </div>
          )}
        </div>
      ) : (
        <>
          <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <BilingualText
              zh="拖放图片到这里，或者"
              en="Drop image here, or"
            />
            <label className="mx-2 text-primary-500 hover:text-primary-600 cursor-pointer">
              <BilingualText
                zh="点击上传"
                en="browse"
              />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleChange}
                disabled={isUploading}
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
} 