export interface TranslationResult {
  origin: string;
  translate: string;
  captionTranslate: string;
}

export interface TranslationService {
  translate(text: string): Promise<TranslationResult>;
} 