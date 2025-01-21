export interface NameGeneratorOptions {
  gender: 'male' | 'female' | 'neutral';
  age: string;
  style: string;
  personality: string[];
  interests: string[];
  additionalInfo: string;
}

export interface GeneratedName {
  name: string;
  pinyin: string;
  description: string;
}

export interface NameGeneratorService {
  generate(options: NameGeneratorOptions): Promise<GeneratedName[]>;
} 