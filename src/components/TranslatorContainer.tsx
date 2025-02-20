'use client';

import { useState } from 'react';
import { FaVolumeUp, FaHistory, FaCopy, FaUndo, FaSpinner } from 'react-icons/fa';
import { useSpeechSynthesis } from 'react-speech-kit';
import TranslationHistory from './TranslationHistory';
import { TEXT } from '@/constants/text';
import { BilingualText } from '@/components/BilingualText';
import { HistoryManager } from '@/lib/historyManager';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useClarity } from '@/hooks/useClarity';

const MAX_CHARS = 1000;

interface Translation {
  origin: string;
  translate: string;
  captionTranslate: string;
  timestamp: Date;
}

interface HistorySelectItem {
  original_text: string;
  translated_text: string;
  caption_translate: string;
  created_at: string;
}

export default function TranslatorContainer() {
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState<Translation | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const { speak } = useSpeechSynthesis();
  const { trackEvent: trackGAEvent } = useAnalytics();
  const { trackEvent: trackClarityEvent } = useClarity();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= MAX_CHARS) {
      setInputText(newText);
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim() || isTranslating) {
      return;
    }

    const startTime = Date.now();

    try {
      setIsTranslating(true);
      
      // 跟踪翻译开始
      trackGAEvent('translation_start', {
        text_length: inputText.length
      });
      trackClarityEvent('translation_start', {
        text_length: inputText.length
      });

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        // 跟踪翻译错误
        trackGAEvent('translation_error', {
          error: data.error
        });
        trackClarityEvent('translation_error', {
          error: data.error
        });
        throw new Error(data.error || 'Translation failed');
      }

      const newTranslation = {
        ...data,
        timestamp: new Date(),
      };
      
      setTranslation(newTranslation);

      const responseTime = Date.now() - startTime;

      // 跟踪翻译成功
      trackGAEvent('translation_success', {
        text_length: inputText.length,
        response_time: responseTime
      });
      trackClarityEvent('translation_success', {
        text_length: inputText.length,
        response_time: responseTime
      });

      // 保存到本地历史
      HistoryManager.addToLocalHistory({
        original_text: newTranslation.origin,
        translated_text: newTranslation.translate,
        caption_translate: newTranslation.captionTranslate
      });

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

  const handleHistorySelect = (historyItem: HistorySelectItem) => {
    setTranslation({
      origin: historyItem.original_text,
      translate: historyItem.translated_text,
      captionTranslate: historyItem.caption_translate,
      timestamp: new Date(historyItem.created_at)
    });
    setInputText(historyItem.original_text);
  };

  const charCount = inputText.length;
  const isNearLimit = charCount > MAX_CHARS * 0.88;

  return (
    <div className="max-w-4xl mx-auto space-y-2 sm:space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-6">
        <div className="relative">
          <textarea
            className="w-full h-24 sm:h-40 p-2 sm:p-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
              border-gray-300 dark:border-gray-600 
              placeholder-gray-500 dark:placeholder-gray-400"
            placeholder={`${TEXT.placeholder.zh}\n${TEXT.placeholder.en}`}
            value={inputText}
            onChange={handleInputChange}
            disabled={isTranslating}
          />
          
          {/* 字符计数器 */}
          <div className="absolute bottom-3 right-3 flex items-center justify-between text-sm mt-2">
            <div className="text-gray-500 dark:text-gray-400">
              {isNearLimit && charCount < MAX_CHARS && 
                <span>接近字数限制</span>
              }
              {charCount >= MAX_CHARS &&
                <span className="text-red-500 dark:text-red-400">已达到最大字数限制</span>
              }
            </div>
            <div 
              className={`px-2 py-0.5 rounded
                ${isNearLimit 
                  ? 'text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20' 
                  : 'text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800'
                }`}
            >
              {charCount}/{MAX_CHARS} 字
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400"
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
              className="flex items-center text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400"
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
            className={`relative px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 
              dark:bg-primary-600 dark:hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed
              min-w-[120px] min-h-[64px]`}
            onClick={handleTranslate}
            disabled={isTranslating || !inputText.trim()}
          >
            {isTranslating ? (
              <div className="flex flex-col items-center justify-center text-white">
                <FaSpinner className="animate-spin mb-1" size={20} />
                <BilingualText 
                  zh={TEXT.translating.zh}
                  en={TEXT.translating.en}
                  cnColor="text-white"
                  enColor="text-white"
                  className="text-center"
                />
              </div>
            ) : (
              <BilingualText 
                zh={TEXT.translate.zh} 
                en={TEXT.translate.en}
                cnColor="text-white"
                enColor="text-white"
                className="text-center"
              />
            )}
          </button>
        </div>
      </div>

      {translation && (
        <div className="space-y-2 sm:space-y-3">
          {/* 整体翻译结果 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-6">
            <div className="flex justify-between items-center mb-2 sm:mb-4">
              <BilingualText 
                zh={TEXT.fullTranslation.zh}
                en={TEXT.fullTranslation.en}
                className="text-xl font-semibold"
              />
              <div className="space-x-4">
                <button
                  onClick={() => handleSpeak(translation.translate)}
                  className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400"
                >
                  <FaVolumeUp size={20} />
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(translation.translate)}
                  className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400"
                >
                  <FaCopy size={20} />
                </button>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3 text-gray-900 dark:text-gray-100">
              {translation.translate.split('\n').filter(line => line.trim() !== '').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>

          {/* 双语对照翻译结果 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-6">
            <div className="flex justify-between items-center mb-2 sm:mb-4">
              <BilingualText 
                zh={TEXT.bilingualComparison.zh}
                en={TEXT.bilingualComparison.en}
                className="text-xl font-semibold"
              />
              <div className="space-x-4">
                <button
                  onClick={() => handleSpeak(translation.captionTranslate)}
                  className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400"
                >
                  <FaVolumeUp size={20} />
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(translation.captionTranslate)}
                  className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400"
                >
                  <FaCopy size={20} />
                </button>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {translation.captionTranslate.split('\n').filter(line => line.trim() !== '').map((line, index) => (
                <p 
                  key={index} 
                  className={
                    index % 2 === 0 
                      ? "text-gray-900 dark:text-gray-100" 
                      : "text-primary-600 dark:text-primary-400"
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