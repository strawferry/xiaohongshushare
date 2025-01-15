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

  public async getClient() {
    if (!this.isConnected) {
      try {
        await this.client.connect();
        this.isConnected = true;
        console.log('Database connected successfully');
      } catch (error) {
        console.error('Failed to connect to database:', error);
        // 如果连接失败，重置连接状态
        this.isConnected = false;
        throw error;
      }
    }
    return this.client;
  }

  public async query(sql: string, params?: any[]) {
    const client = await this.getClient();
    try {
      return await client.query(sql, params);
    } catch (error) {
      console.error('Database query error:', error);
      // 如果查询失败，重置连接状态以便下次重新连接
      this.isConnected = false;
      throw error;
    }
  }
}

export const db = Database.getInstance(); 