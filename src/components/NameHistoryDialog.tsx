'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaTimes } from 'react-icons/fa';
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
  const history = NameHistoryManager.getHistory();

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
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <FaTimes size={20} />
                  </button>
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
                          dark:hover:bg-gray-700 cursor-pointer transition-colors"
                        onClick={() => {
                          onSelect(item);
                          onClose();
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">
                            {item.results.map(r => r.name).join(' · ')}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {NameHistoryManager.formatDate(item.timestamp)}
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
      </Dialog>
    </Transition>
  );
} 