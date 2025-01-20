import { NameGeneratorService } from './types';
import { DeepSeekNameGeneratorService } from './deepseek-service';

export function createNameGeneratorService(): NameGeneratorService {
  return new DeepSeekNameGeneratorService();
} 