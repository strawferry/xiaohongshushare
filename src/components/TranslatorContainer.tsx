'use client';

import { useState } from 'react';
import { FaVolumeUp, FaHistory, FaCopy, FaUndo, FaSpinner } from 'react-icons/fa';
import { useSpeechSynthesis } from 'react-speech-kit';
import TranslationHistory from './TranslationHistory';
import { TEXT } from '@/constants/text';
import { BilingualText } from '@/components/BilingualText';

interface Translation {
  origin: string;
  translate: string;
  captionTranslate: string;
  timestamp: Date;
}

export default function TranslatorContainer() {
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState<Translation | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const { speak } = useSpeechSynthesis();

  const handleTranslate = async () => {
    if (!inputText.trim() || isTranslating) {
      return;
    }

    try {
      setIsTranslating(true);
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Translation failed');
      }

      const newTranslation = {
        ...data,
        timestamp: new Date(),
      };
      
      setTranslation(newTranslation);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleReset = () => {
    setInputText('');
    setTranslation(null);
  };

  const handleSpeak = (text: string) => {
    speak({ text });
  };

  const handleHistorySelect = (historyItem: any) => {
    setTranslation({
      origin: historyItem.original_text,
      translate: historyItem.translated_text,
      captionTranslate: historyItem.caption_translate,
      timestamp: new Date(historyItem.created_at)
    });
    setInputText(historyItem.original_text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <textarea
          className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
            border-gray-300 dark:border-gray-600 
            placeholder-gray-500 dark:placeholder-gray-400"
          placeholder={`${TEXT.placeholder.zh}\n${TEXT.placeholder.en}`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isTranslating}
        />
        
        <div className="flex justify-between mt-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              disabled={isTranslating}
            >
              <FaHistory className="mr-2" />
              <BilingualText 
                zh={TEXT.history.zh} 
                en={TEXT.history.en}
                className="text-left"
              />
            </button>
            <button
              onClick={handleReset}
              className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              disabled={isTranslating}
            >
              <FaUndo className="mr-2" />
              <BilingualText 
                zh={TEXT.reset.zh} 
                en={TEXT.reset.en}
                className="text-left"
              />
            </button>
          </div>
          <button
            className={`relative px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 
              dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
              min-w-[120px] min-h-[64px]`}
            onClick={handleTranslate}
            disabled={isTranslating || !inputText.trim()}
          >
            {isTranslating ? (
              <div className="flex flex-col items-center justify-center">
                <FaSpinner className="animate-spin mb-1" size={20} />
                <BilingualText 
                  zh="翻译中..."
                  en="Translating..."
                  className="text-center text-white"
                />
              </div>
            ) : (
              <BilingualText 
                zh={TEXT.translate.zh} 
                en={TEXT.translate.en}
                className="text-center text-white"
              />
            )}
          </button>
        </div>
      </div>

      {translation && (
        <div className="space-y-6">
          {/* 整体翻译结果 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <BilingualText 
                zh={TEXT.fullTranslation.zh}
                en={TEXT.fullTranslation.en}
                className="text-xl font-semibold"
              />
              <div className="space-x-4">
                <button
                  onClick={() => handleSpeak(translation.translate)}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <FaVolumeUp size={20} />
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(translation.translate)}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <FaCopy size={20} />
                </button>
              </div>
            </div>
            <div className="space-y-4 text-gray-900 dark:text-gray-100">
              {translation.translate.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>

          {/* 双语对照翻译结果 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <BilingualText 
                zh={TEXT.bilingualComparison.zh}
                en={TEXT.bilingualComparison.en}
                className="text-xl font-semibold"
              />
              <div className="space-x-4">
                <button
                  onClick={() => handleSpeak(translation.captionTranslate)}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <FaVolumeUp size={20} />
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(translation.captionTranslate)}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <FaCopy size={20} />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {translation.captionTranslate.split('\n').map((line, index) => (
                <p 
                  key={index} 
                  className={
                    index % 2 === 0 
                      ? "text-gray-900 dark:text-gray-100" 
                      : "text-blue-700 dark:text-blue-400"
                  }
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      <TranslationHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelect={handleHistorySelect}
      />
    </div>
  );
} 