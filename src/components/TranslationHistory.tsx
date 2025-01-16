'use client';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaTimes, FaTrash, FaTrashAlt } from 'react-icons/fa';
import { BilingualText } from './BilingualText';
import { TEXT } from '@/constants/text';
import { HistoryManager, HistoryItem } from '@/lib/historyManager';

interface TranslationHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (translation: HistoryItem) => void;
}

export default function TranslationHistory({ isOpen, onClose, onSelect }: TranslationHistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = () => {
    const localHistory = HistoryManager.getLocalHistory();
    setHistory(localHistory);
  };

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // 阻止事件冒泡
    if (window.confirm(`${TEXT.history_record.deleteConfirm.zh}
${TEXT.history_record.deleteConfirm.en}`)) {
      HistoryManager.deleteHistoryItem(id);
      fetchHistory();
    }
  };

  const handleClearAll = () => {
    if (window.confirm(`${TEXT.history_record.clearConfirm.zh}
${TEXT.history_record.clearConfirm.en}`)) {
      HistoryManager.clearLocalHistory();
      fetchHistory();
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
            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title as="h3">
                  <BilingualText
                    zh={TEXT.history_record.title.zh}
                    en={TEXT.history_record.title.en}
                    className="text-lg font-medium"
                  />
                </Dialog.Title>
                <div className="flex items-center space-x-4">
                  {history.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="flex items-center px-3 py-1 text-sm rounded-md
                        text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <FaTrashAlt className="mr-1" size={14} />
                      <BilingualText
                        zh={TEXT.history_record.clearAll.zh}
                        en={TEXT.history_record.clearAll.en}
                        className="text-left"
                      />
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {history.length === 0 ? (
                  <div className="py-10 text-center">
                    <BilingualText
                      zh={TEXT.history_record.empty.zh}
                      en={TEXT.history_record.empty.en}
                      className="text-gray-500 dark:text-gray-400"
                    />
                  </div>
                ) : (
                  history.map((item) => (
                    <div
                      key={item.id}
                      className="group relative border rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                    >
                      <button
                        onClick={() => {
                          onSelect(item);
                          onClose();
                        }}
                        className="w-full text-left p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-gray-900 dark:text-gray-100 line-clamp-2">{item.original_text}</p>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-4 whitespace-nowrap">
                            {formatDate(item.created_at)}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{item.translated_text}</p>
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="absolute right-0 top-0 p-2 rounded-md
                          text-red-600 dark:text-red-400
                          opacity-30 group-hover:opacity-100
                          hover:bg-red-50 dark:hover:bg-red-900/20
                          transition-opacity"
                        title={TEXT.history_record.delete.zh}
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 