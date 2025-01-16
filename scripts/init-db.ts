import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config({ path: '.env.local' });

async function initializeDatabase() {
  try {
    console.log('Initializing database...');

    // 检查表是否存在
    const { rows: existingTables } = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'translations'
    `;

    if (existingTables.length > 0) {
      console.log('Dropping existing translations table...');
      await sql`DROP TABLE IF EXISTS translations`;
    }

    // 创建翻译历史表
    console.log('Creating translations table...');
    await sql`
      CREATE TABLE translations (
        id SERIAL PRIMARY KEY,
        original_text TEXT NOT NULL,
        translated_text TEXT NOT NULL,
        caption_translate TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 创建索引
    console.log('Creating indexes...');
    await sql`
      CREATE INDEX idx_translations_created_at ON translations(created_at DESC)
    `;

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// 运行初始化
initializeDatabase()
  .then(() => {
    console.log('Database setup completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database setup failed:', error);
    process.exit(1);
  }); 