import { db } from './config';

export async function createTables() {
  try {
    // 先检查表是否存在
    const { rows: existingTables } = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'translations'
    `);

    if (existingTables.length === 0) {
      // 创建翻译历史表
      await db.query(`
        CREATE TABLE translations (
          id SERIAL PRIMARY KEY,
          original_text TEXT NOT NULL,
          translated_text TEXT NOT NULL,
          caption_translate TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } else {
      console.log('Translations table already exists');
    }
  } catch (error) {
    console.error('Error creating database tables:', error);
    throw error;
  }
} 