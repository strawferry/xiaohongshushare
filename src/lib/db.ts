import { sql } from '@vercel/postgres';

export async function saveTranslation(translation: {
  original: string;
  translatedParallel: string;
  translatedComplete: string;
  timestamp: Date;
}) {
  try {
    await sql`
      INSERT INTO translations (
        original_text,
        translated_parallel,
        translated_complete,
        created_at
      ) VALUES (
        ${translation.original},
        ${translation.translatedParallel},
        ${translation.translatedComplete},
        ${translation.timestamp}
      )
    `;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function getTranslationHistory() {
  try {
    const { rows } = await sql`
      SELECT * FROM translations
      ORDER BY created_at DESC
      LIMIT 50
    `;
    return rows;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
} 