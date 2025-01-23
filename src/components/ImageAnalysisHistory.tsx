'use client';

import { useEffect, useState } from 'react';
import { ImageAnalysisHistory, imageAnalysisDB } from '@/lib/indexedDB';
import { format } from 'date-fns';
import { BilingualText } from './BilingualText';
import { FaHistory, FaTrash, FaTimes } from 'react-icons/fa';

interface ImageAnalysisHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string, result: any) => void;
}

export default function ImageAnalysisHistoryPanel({ 
  isOpen, 
  onClose, 
  onSelect 
}: ImageAnalysisHistoryPanelProps) {
  const [history, setHistory] = useState<ImageAnalysisHistory[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  const loadHistory = async () => {
    try {
      const results = await imageAnalysisDB.getHistory();
      setHistory(results);
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await imageAnalysisDB.deleteAnalysis(id);
      await loadHistory();
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handleClearAll = async () => {
    if (confirm('确定要清空所有历史记录吗？\nAre you sure to clear all history?')) {
      try {
        await imageAnalysisDB.clearHistory();
        setHistory([]);
      } catch (error) {
        console.error('Failed to clear history:', error);
      }
    }
  };

  const handleSelect = (item: ImageAnalysisHistory) => {
    onSelect(item.imageUrl, item.result);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] m-4">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <FaHistory className="text-primary-500" />
                <span>
                  <BilingualText zh="历史记录" en="History" />
                </span>
                <span className="text-sm text-gray-500">
                  ({history.length})
                </span>
              </h2>
              <div className="flex items-center space-x-4">
                {history.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
              <div className="space-y-4">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => handleSelect(item)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-4">
                        <img
                          src={item.imageUrl}
                          alt="Analysis"
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="whitespace-pre-line text-sm line-clamp-3">
                            {item.result.description}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {item.result.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                            {item.result.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{item.result.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end ml-4">
                        <span className="text-xs text-gray-500">
                          {format(item.timestamp, 'yyyy-MM-dd HH:mm')}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id!);
                          }}
                          className="mt-2 text-red-500 hover:text-red-600"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {history.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <BilingualText
                      zh="暂无历史记录"
                      en="No history records"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 