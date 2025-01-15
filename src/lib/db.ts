import { db } from './db/config';

export async function saveTranslation(translation: {
  origin: string;
  translate: string;
  captionTranslate: string;
  timestamp: Date;
}) {
  try {
    const client = await db.connect();
    await client.query(
      `INSERT INTO translations (
        original_text,
        translated_text,
        caption_translate,
        created_at
      ) VALUES ($1, $2, $3, $4)`,
      [
        translation.origin,
        translation.translate,
        translation.captionTranslate,
        translation.timestamp
      ]
    );
  } catch (error) {
    console.error('Database error:', error);
  }
}

export async function getTranslationHistory() {
  try {
    const client = await db.connect();
    const { rows } = await client.query(
      `SELECT * FROM translations ORDER BY created_at DESC LIMIT 50`
    );
    return rows;
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}