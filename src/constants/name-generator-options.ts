import { BilingualLabel } from '@/types/common';

export interface OptionItem {
  value: string;
  label: BilingualLabel;
}

export const nameGeneratorOptions = {
  ageRanges: [
    { value: '0-17', label: { zh: '0-17岁', en: '0-17 years' } },
    { value: '18-30', label: { zh: '18-30岁', en: '18-30 years' } },
    { value: '31-50', label: { zh: '31-50岁', en: '31-50 years' } },
    { value: '50+', label: { zh: '50岁以上', en: '50+ years' } },
  ],

  styles: [
    { value: 'traditional', label: { zh: '传统典雅', en: 'Traditional & Elegant' } },
    { value: 'modern', label: { zh: '现代时尚', en: 'Modern & Fashionable' } },
    { value: 'literary', label: { zh: '文艺诗意', en: 'Literary & Poetic' } },
    { value: 'simple', label: { zh: '简约大方', en: 'Simple & Graceful' } },
  ],

  personalities: [
    { value: 'confident', label: { zh: '自信', en: 'Confident' } },
    { value: 'gentle', label: { zh: '温和', en: 'Gentle' } },
    { value: 'creative', label: { zh: '创意', en: 'Creative' } },
    { value: 'strong', label: { zh: '坚强', en: 'Strong' } },
    { value: 'wise', label: { zh: '智慧', en: 'Wise' } },
    { value: 'cheerful', label: { zh: '开朗', en: 'Cheerful' } },
  ],

  interests: [
    { value: 'art', label: { zh: '艺术', en: 'Art' } },
    { value: 'science', label: { zh: '科学', en: 'Science' } },
    { value: 'nature', label: { zh: '自然', en: 'Nature' } },
    { value: 'music', label: { zh: '音乐', en: 'Music' } },
    { value: 'sports', label: { zh: '运动', en: 'Sports' } },
    { value: 'literature', label: { zh: '文学', en: 'Literature' } },
  ],
} as const; 