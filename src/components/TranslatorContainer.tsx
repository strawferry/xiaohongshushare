'use client';

import { useState } from 'react';
import { FaVolumeUp, FaHistory, FaCopy } from 'react-icons/fa';
import { useSpeechSynthesis } from 'react-speech-kit';
import { saveTranslation } from '@/lib/db';

interface Translation {
  original: string;
  translatedParallel: string;
  translatedComplete: string;
  timestamp: Date;
}

export default function TranslatorContainer() {
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState<Translation | null>(null);
  const { speak } = useSpeechSynthesis();

  const handleTranslate = async () => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      
      const data = await response.json();
      const newTranslation = {
        original: inputText,
        translatedParallel: data.parallelTranslation,
        translatedComplete: data.completeTranslation,
        timestamp: new Date(),
      };
      
      setTranslation(newTranslation);
      
      // 保存到历史记录
      await saveTranslation(newTranslation);
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  const handleSpeak = (text: string) => {
    speak({ text });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <textarea
          className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="请输入要翻译的文本..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        
        <div className="flex justify-end mt-4">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleTranslate}
          >
            翻译
          </button>
        </div>
      </div>

      {translation && (
        <div className="space-y-6">
          {/* 整体翻译结果 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">整体翻译</h2>
              <div className="space-x-4">
                <button
                  onClick={() => handleSpeak(translation.translatedComplete)}
                  className="text-gray-600 hover:text-blue-500"
                >
                  <FaVolumeUp size={20} />
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(translation.translatedComplete)}
                  className="text-gray-600 hover:text-blue-500"
                >
                  <FaCopy size={20} />
                </button>
              </div>
            </div>
            <p className="text-blue-600">{translation.translatedComplete}</p>
          </div>

          {/* 双语对照翻译结果 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">双语对照</h2>
              <div className="space-x-4">
                <button
                  onClick={() => handleSpeak(translation.translatedParallel)}
                  className="text-gray-600 hover:text-blue-500"
                >
                  <FaVolumeUp size={20} />
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(translation.translatedParallel)}
                  className="text-gray-600 hover:text-blue-500"
                >
                  <FaCopy size={20} />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {translation.original.split('\n').map((line, index) => (
                <div key={index} className="space-y-2">
                  <p className="text-gray-700">{line}</p>
                  <p className="text-blue-600">
                    {translation.translatedParallel.split('\n')[index]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 