import { createPool, sql } from '@vercel/postgres';

class Database {
  private static instance: Database;
  private pool;

  private constructor() {
    this.pool = createPool();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async query(sqlQuery: string, params?: unknown[]) {
    try {
      return await sql.query(sqlQuery, params);
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }
}

export const db = Database.getInstance(); 