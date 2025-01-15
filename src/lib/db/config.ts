import { createClient } from '@vercel/postgres';

class Database {
  private static instance: Database;
  private client: ReturnType<typeof createClient>;
  private isConnected: boolean = false;

  private constructor() {
    this.client = createClient({
      connectionString: process.env.POSTGRES_URL
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect() {
    if (!this.isConnected) {
      try {
        await this.client.connect();
        this.isConnected = true;
        console.log('Database connected successfully');
      } catch (error) {
        console.error('Failed to connect to database:', error);
        throw error;
      }
    }
    return this.client;
  }
}

// 导出数据库实例
export const db = Database.getInstance(); 