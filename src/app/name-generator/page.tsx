'use client';

import { useState } from 'react';
import { BilingualText } from '@/components/BilingualText';
import { FaSpinner, FaCopy, FaVolumeUp, FaHistory, FaUndo } from 'react-icons/fa';
import { useSpeechSynthesis } from 'react-speech-kit';
import Toast from '@/components/Toast';
import { nameGeneratorOptions } from '@/constants/name-generator-options';
import NameHistoryManager, { NameHistoryItem } from '@/lib/nameHistoryManager';
import NameHistoryDialog from '@/components/NameHistoryDialog';

interface NameResult {
  name: string;
  pinyin: string;
  description: string;
}

interface FormData {
  gender: 'male' | 'female' | 'neutral';
  age: string;
  style: string;
  personality: string[];
  interests: string[];
  additionalInfo: string;
}

export default function NameGeneratorPage() {
  const [formData, setFormData] = useState<FormData>({
    gender: 'neutral',
    age: '18-30',
    style: 'modern',
    personality: [],
    interests: [],
    additionalInfo: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<NameResult[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { speak } = useSpeechSynthesis();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch('/api/generate-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate names');
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setResults(data);
        NameHistoryManager.saveHistory(formData, data);
      } else {
        setError('未能生成名字，请重试 / Failed to generate names, please try again');
      }
    } catch (error) {
      console.error('Error generating names:', error);
      setError('生成名字时出错 / Error generating names');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast('复制成功 / Copied successfully');
    } catch (error) {
      console.error('Failed to copy:', error);
      setToast('复制失败 / Copy failed');
    }
  };

  const handleSpeak = (text: string) => {
    speak({ text });
  };

  const handleHistorySelect = (item: NameHistoryItem) => {
    setFormData(item.options);
    setResults(item.results);
  };

  const handleReset = () => {
    setFormData({
      gender: 'neutral',
      age: '18-30',
      style: 'modern',
      personality: [],
      interests: [],
      additionalInfo: '',
    });
    setResults([]);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h1 className="text-2xl font-bold text-center mb-6">
            <BilingualText
              zh="中文起名生成器"
              en="Chinese Name Generator"
            />
          </h1>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* 基本选项行 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 性别选择 */}
              <div>
                <label className="block mb-0.5 text-sm">
                  <BilingualText
                    zh="性别"
                    en="Gender"
                    className="text-xs font-medium"
                  />
                </label>
                <div className="flex gap-3">
                  <label className="inline-flex items-center text-sm">
                    <input
                      type="radio"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' | 'neutral' })}
                      className="mr-2"
                    />
                    <BilingualText zh="男" en="Male" />
                  </label>
                  <label className="inline-flex items-center text-sm">
                    <input
                      type="radio"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' | 'neutral' })}
                      className="mr-2"
                    />
                    <BilingualText zh="女" en="Female" />
                  </label>
                  <label className="inline-flex items-center text-sm">
                    <input
                      type="radio"
                      value="neutral"
                      checked={formData.gender === 'neutral'}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' | 'neutral' })}
                      className="mr-2"
                    />
                    <BilingualText zh="中性" en="Neutral" />
                  </label>
                </div>
              </div>

              {/* 年龄范围 */}
              <div>
                <label className="block mb-0.5 text-sm">
                  <BilingualText
                    zh="年龄范围"
                    en="Age Range"
                    className="text-xs font-medium"
                  />
                </label>
                <select
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full py-1 px-2 rounded-md border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  {nameGeneratorOptions.ageRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label.zh} / {range.label.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* 名字风格 */}
              <div>
                <label className="block mb-0.5 text-sm">
                  <BilingualText
                    zh="名字风格"
                    en="Name Style"
                    className="text-xs font-medium"
                  />
                </label>
                <select
                  value={formData.style}
                  onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                  className="w-full py-1 px-2 rounded-md border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  {nameGeneratorOptions.styles.map((style) => (
                    <option key={style.value} value={style.value}>
                      {style.label.zh} / {style.label.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 性格特征和兴趣爱好 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* 性格特征 */}
              <div>
                <label className="block mb-0.5 text-sm">
                  <BilingualText
                    zh="性格特征（可多选）"
                    en="Personality Traits (Multiple)"
                    className="text-xs font-medium"
                  />
                </label>
                <div className="grid grid-cols-2 gap-1.5 text-sm">
                  {nameGeneratorOptions.personalities.map((trait) => (
                    <label key={trait.value} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value={trait.value}
                        checked={formData.personality.includes(trait.value)}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData({
                            ...formData,
                            personality: e.target.checked
                              ? [...formData.personality, value]
                              : formData.personality.filter((v) => v !== value),
                          });
                        }}
                        className="mr-2"
                      />
                      <span>{trait.label.zh} / {trait.label.en}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 兴趣爱好 */}
              <div>
                <label className="block mb-0.5 text-sm">
                  <BilingualText
                    zh="兴趣爱好（可多选）"
                    en="Interests (Multiple)"
                    className="text-xs font-medium"
                  />
                </label>
                <div className="grid grid-cols-2 gap-1.5 text-sm">
                  {nameGeneratorOptions.interests.map((interest) => (
                    <label key={interest.value} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value={interest.value}
                        checked={formData.interests.includes(interest.value)}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData({
                            ...formData,
                            interests: e.target.checked
                              ? [...formData.interests, value]
                              : formData.interests.filter((v) => v !== value),
                          });
                        }}
                        className="mr-2"
                      />
                      <span>{interest.label.zh} / {interest.label.en}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 补充信息 */}
            <div>
              <label className="block mb-0.5 text-sm">
                <BilingualText
                  zh="补充信息（可选）"
                  en="Additional Information (Optional)"
                  className="text-xs font-medium"
                />
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                className="w-full py-1 px-2 rounded-md border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                rows={2}
                placeholder="请输入任何其他想要考虑的因素... / Please enter any other factors you want to consider..."
              />
            </div>

            {/* 提交按钮 */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsHistoryOpen(true)}
                  className="px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                    dark:hover:bg-gray-700 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <FaHistory size={14} />
                  <BilingualText zh="历史" en="History" />
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                    dark:hover:bg-gray-700 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <FaUndo size={14} />
                  <BilingualText zh="重置" en="Reset" />
                </button>
              </div>
              <button
                type="submit"
                disabled={isGenerating}
                className="px-6 py-1.5 bg-primary-500 text-white rounded-md hover:bg-primary-600 
                  dark:bg-primary-600 dark:hover:bg-primary-700 disabled:opacity-50"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    <BilingualText zh="生成中..." en="Generating..." />
                  </div>
                ) : (
                  <BilingualText zh="生成名字" en="Generate Names" />
                )}
              </button>
            </div>
          </form>

          {/* 错误提示 */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* 结果展示 */}
          {!error && results.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4">
                <BilingualText zh="推荐名字" en="Recommended Names" />
              </h2>
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold flex items-center gap-4">
                        <span>{result.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                          {result.pinyin}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleCopy(`${result.name} (${result.pinyin})`)}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                            title="复制名字 / Copy name"
                          >
                            <FaCopy size={16} />
                          </button>
                          <button
                            onClick={() => handleSpeak(result.name)}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                            title="播放发音 / Play pronunciation"
                          >
                            <FaVolumeUp size={16} />
                          </button>
                        </div>
                      </h3>
                    </div>
                    <div className="relative group">
                      <div className="text-gray-600 dark:text-gray-300 space-y-2">
                        {result.description.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                          <p key={i} className={
                            i % 2 === 0 
                              ? "text-gray-900 dark:text-gray-100" 
                              : "text-gray-600 dark:text-gray-400"
                          }>
                            {line}
                          </p>
                        ))}
                      </div>
                      <div className="absolute right-0 top-0 hidden group-hover:flex items-center space-x-2">
                        <button
                          onClick={() => handleCopy(result.description)}
                          className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 bg-gray-50 dark:bg-gray-700"
                          title="复制解释 / Copy description"
                        >
                          <FaCopy size={16} />
                        </button>
                        <button
                          onClick={() => handleSpeak(result.description)}
                          className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 bg-gray-50 dark:bg-gray-700"
                          title="播放解释 / Play description"
                        >
                          <FaVolumeUp size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {toast && (
        <Toast 
          message={toast} 
          onClose={() => setToast(null)}
        />
      )}
      <NameHistoryDialog
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelect={handleHistorySelect}
      />
    </div>
  );
} 