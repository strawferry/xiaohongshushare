import { TranslationService } from './types';
import { DeepSeekTranslationService } from './deepseek-service';

export function createTranslationService(): TranslationService {
  return new DeepSeekTranslationService();
} 