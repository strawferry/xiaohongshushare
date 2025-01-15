interface BilingualTextProps {
  zh: string;
  en: string;
  className?: string;
}

export function BilingualText({ zh, en, className = '' }: BilingualTextProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-gray-900 dark:text-gray-100">{zh}</span>
      <span className="text-gray-500 dark:text-gray-400 text-sm">{en}</span>
    </div>
  );
} 