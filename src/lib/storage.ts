import { createClient } from '@supabase/supabase-js';
import { generateId } from './utils';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const BUCKET_NAME = 'math-images';

export function isStorageAvailable(): boolean {
  return !!supabase;
}

export async function uploadImage(
  blob: Blob,
  folder: 'posts' | 'avatars' | 'answers' = 'posts'
): Promise<string> {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const fileName = `${folder}/${generateId()}.jpg`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, blob, {
      contentType: 'image/jpeg',
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
  return data.publicUrl;
}

export async function deleteImage(url: string): Promise<void> {
  if (!supabase) return;
  const path = url.split(`${BUCKET_NAME}/`).pop();
  if (!path) return;
  await supabase.storage.from(BUCKET_NAME).remove([path]);
}
