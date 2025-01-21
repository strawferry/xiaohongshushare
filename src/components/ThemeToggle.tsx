'use client';

import { FaSun, FaMoon, FaDesktop, FaChevronDown } from 'react-icons/fa';
import { useTheme } from '@/contexts/ThemeContext';
import { TEXT } from '@/constants/text';
import DropdownMenu from './DropdownMenu';

const themes = [
  { id: 'light', icon: FaSun, text: TEXT.themes.light },
  { id: 'dark', icon: FaMoon, text: TEXT.themes.dark },
  { id: 'system', icon: FaDesktop, text: TEXT.themes.system },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const currentTheme = themes.find(t => t.id === theme);
  const Icon = currentTheme?.icon || FaSun;

  const menuItems = themes.map(item => ({
    id: item.id,
    title: item.text,
    icon: <item.icon size={18} />,
    onClick: () => setTheme(item.id)
  }));

  return (
    <div className="fixed z-50 top-[80px] left-2">
      <DropdownMenu
        label={{ zh: "", en: "" }}
        items={menuItems}
        icon={<Icon size={20} />}
        position="left"
      />
    </div>
  );
} 