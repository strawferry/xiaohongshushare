'use client';

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaTimes, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import { BilingualText } from './BilingualText';
import NameHistoryManager, { NameHistoryItem } from '@/lib/nameHistoryManager';
import { nameGeneratorOptions } from '@/constants/name-generator-options';

interface NameHistoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: NameHistoryItem) => void;
}

export default function NameHistoryDialog({
  isOpen,
  onClose,
  onSelect,
}: NameHistoryDialogProps) {
  const [history, setHistory] = useState<NameHistoryItem[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setHistory(NameHistoryManager.getHistory());
    }
  }, [isOpen]);

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setItemToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete === -1) {
      // 清空所有记录
      NameHistoryManager.clearHistory();
      setHistory([]);
    } else if (itemToDelete !== null) {
      // 删除单条记录
      NameHistoryManager.deleteHistory(itemToDelete);
      setHistory(history.filter(item => item.id !== itemToDelete));
    }
    setShowConfirm(false);
    setItemToDelete(null);
  };

  const formatOptions = (item: NameHistoryItem) => {
    const parts = [];
    
    // 性别
    parts.push(item.options.gender === 'male' ? '男 / Male' : '女 / Female');
    
    // 年龄
    const ageRange = nameGeneratorOptions.ageRanges.find(r => r.value === item.options.age);
    if (ageRange) {
      parts.push(`${ageRange.label.zh} / ${ageRange.label.en}`);
    }
    
    // 风格
    const style = nameGeneratorOptions.styles.find(s => s.value === item.options.style);
    if (style) {
      parts.push(`${style.label.zh} / ${style.label.en}`);
    }

    return parts.join(' · ');
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-lg font-medium">
                    <BilingualText
                      zh="历史记录"
                      en="History"
                    />
                  </Dialog.Title>
                  <div className="flex items-center gap-2">
                    {history.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setItemToDelete(-1);
                          setShowConfirm(true);
                        }}
                        className="text-red-500 hover:text-red-600 dark:text-red-400 
                          dark:hover:text-red-300 text-sm flex items-center gap-1"
                      >
                        <FaTrash size={14} />
                        <BilingualText
                          zh="清空"
                          en="Clear All"
                        />
                      </button>
                    )}
                    <button
                      onClick={onClose}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <FaTimes size={20} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      <BilingualText
                        zh="暂无历史记录"
                        en="No history records"
                      />
                    </div>
                  ) : (
                    history.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 
                          dark:hover:bg-gray-700 cursor-pointer transition-colors group"
                        onClick={() => {
                          onSelect(item);
                          onClose();
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">
                            {item.results.map(r => r.name).join(' · ')}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {NameHistoryManager.formatDate(item.timestamp)}
                            </div>
                            <button
                              onClick={(e) => handleDelete(item.id, e)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity
                                text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                              title="删除 / Delete"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {formatOptions(item)}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>

        {/* 确认删除对话框 */}
        <Transition appear show={showConfirm} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-[60]"
            onClose={() => setShowConfirm(false)}
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-4 text-yellow-500">
                    <FaExclamationTriangle size={24} />
                    <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      <BilingualText
                        zh={itemToDelete === -1 ? "确认清空" : "确认删除"}
                        en={itemToDelete === -1 ? "Confirm Clear" : "Confirm Delete"}
                      />
                    </Dialog.Title>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    <BilingualText
                      zh={itemToDelete === -1 
                        ? "确定要清空所有历史记录吗？此操作不可恢复。" 
                        : "确定要删除这条历史记录吗？此操作不可恢复。"}
                      en={itemToDelete === -1
                        ? "Are you sure you want to clear all history records? This action cannot be undone."
                        : "Are you sure you want to delete this history record? This action cannot be undone."}
                    />
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                        dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                      <BilingualText zh="取消" en="Cancel" />
                    </button>
                    <button
                      onClick={handleConfirmDelete}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 
                        transition-colors"
                    >
                      <BilingualText zh="确认" en="Confirm" />
                    </button>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        </Transition>
      </Dialog>
    </Transition>
  );
} 