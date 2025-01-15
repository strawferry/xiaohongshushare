'use client';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaTimes } from 'react-icons/fa';

interface HistoryItem {
  id: number;
  original_text: string;
  translated_text: string;
  caption_translate: string;
  created_at: string;
}

interface TranslationHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (translation: HistoryItem) => void;
}

export default function TranslationHistory({ isOpen, onClose, onSelect }: TranslationHistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/translation-history');
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium">
                    翻译历史记录
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                {loading ? (
                  <div className="py-10 text-center text-gray-500">加载中...</div>
                ) : history.length === 0 ? (
                  <div className="py-10 text-center text-gray-500">暂无翻译历史</div>
                ) : (
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                    {history.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelect(item);
                          onClose();
                        }}
                        className="w-full text-left p-4 rounded-lg border hover:border-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-gray-900 line-clamp-2">{item.original_text}</p>
                          <span className="text-sm text-gray-500 ml-4 whitespace-nowrap">
                            {formatDate(item.created_at)}
                          </span>
                        </div>
                        <p className="text-gray-600 line-clamp-2">{item.translated_text}</p>
                      </button>
                    ))}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 