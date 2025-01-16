export interface HistoryItem {
  id: number;
  original_text: string;
  translated_text: string;
  caption_translate: string;
  created_at: string;
}

const LOCAL_STORAGE_KEY = 'translation_history';
const MAX_LOCAL_HISTORY = 100;

export class HistoryManager {
  private static generateId(): number {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  static getLocalHistory(): HistoryItem[] {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get local history:', error);
      return [];
    }
  }

  static addToLocalHistory(item: Omit<HistoryItem, 'id' | 'created_at'>) {
    try {
      const history = this.getLocalHistory();
      const newItem: HistoryItem = {
        ...item,
        id: this.generateId(),
        created_at: new Date().toISOString()
      };

      const newHistory = [newItem, ...history].slice(0, MAX_LOCAL_HISTORY);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newHistory));
      
      return newItem;
    } catch (error) {
      console.error('Failed to save to local history:', error);
      return null;
    }
  }

  static deleteHistoryItem(id: number) {
    try {
      const history = this.getLocalHistory();
      const newHistory = history.filter(item => item.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newHistory));
      return true;
    } catch (error) {
      console.error('Failed to delete history item:', error);
      return false;
    }
  }

  static clearLocalHistory() {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear local history:', error);
      return false;
    }
  }
} 