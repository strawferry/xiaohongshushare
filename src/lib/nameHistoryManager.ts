import { NameGeneratorOptions } from './name-generator/types';

export interface NameHistoryItem {
  id: number;
  timestamp: number;
  options: NameGeneratorOptions;
  results: {
    name: string;
    pinyin: string;
    description: string;
  }[];
}

class NameHistoryManager {
  private static readonly STORAGE_KEY = 'name_history';
  private static readonly MAX_HISTORY = 20;

  static saveHistory(options: NameGeneratorOptions, results: any[]): void {
    try {
      const history = this.getHistory();
      const newItem: NameHistoryItem = {
        id: Date.now(),
        timestamp: Date.now(),
        options,
        results,
      };

      history.unshift(newItem);
      
      // 保持历史记录不超过最大数量
      if (history.length > this.MAX_HISTORY) {
        history.pop();
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save name history:', error);
    }
  }

  static getHistory(): NameHistoryItem[] {
    try {
      const history = localStorage.getItem(this.STORAGE_KEY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Failed to get name history:', error);
      return [];
    }
  }

  static deleteHistory(id: number): void {
    try {
      const history = this.getHistory();
      const newHistory = history.filter(item => item.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Failed to delete history item:', error);
    }
  }

  static clearHistory(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  }

  static formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleString();
  }
}

export default NameHistoryManager; 