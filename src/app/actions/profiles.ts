'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getAllProfiles() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateProfileStatus(profileId: number, status: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('profiles')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', profileId);

  if (error) throw error;
  revalidatePath('/admin');
}

export async function deleteProfile(profileId: number) {
  // Lưu ý: Trong thực tế nên dùng service role hoặc disable thay vì xóa cứng
  const supabase = await createClient();
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', profileId);

  if (error) throw error;
  revalidatePath('/admin');
}
