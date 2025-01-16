import { db } from './db/config';

export async function saveTranslation(translation: {
  origin: string;
  translate: string;
  captionTranslate: string;
  timestamp: Date;
}) {
  try {
    await db.query(
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
    console.error('Failed to save translation:', error);
    throw error;
  }
}

export async function getTranslationHistory() {
  try {
    const { rows } = await db.query(
      `SELECT * FROM translations ORDER BY created_at DESC LIMIT 50`
    );
    return rows;
  } catch (error) {
    console.error('Failed to get translation history:', error);
    return [];
  }
}