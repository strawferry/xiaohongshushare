interface BilingualTextProps {
  zh: string;
  en: string;
  className?: string;
  cnColor?: string;
  enColor?: string;
}

export function BilingualText({ zh, en, className = '', cnColor = 'text-gray-900 dark:text-gray-100', enColor = 'text-gray-500 dark:text-gray-400' }: BilingualTextProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className={cnColor}>{zh}</span>
      <span className={`${enColor} text-sm`}>{en}</span>
    </div>
  );
} 