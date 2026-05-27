'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from './auth';

export async function getMaterials() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('materials').select('*');
  if (error) throw error;
  return data;
}

export async function requestMaterials(requestId: number, materials: { material_id: number, quantity: number, note?: string }[]) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user) throw new Error('Chưa đăng nhập');

  const { data: reqDetail } = await supabase
    .from('request_details')
    .select('id')
    .eq('service_request_id', requestId)
    .single();

  const inserts = materials.map(m => ({
    material_id: m.material_id,
    request_detail_id: reqDetail?.id,
    worker_id: user.id,
    quantity: m.quantity,
    status: 1, // 1: Pending approval
    note: m.note
  }));

  const { error } = await supabase.from('used_materials').insert(inserts);
  if (error) throw error;

  revalidatePath('/worker');
  revalidatePath('/admin');
}

export async function getUsedMaterials(requestId: number) {
  const supabase = await createClient();
  const { data: reqDetail } = await supabase
    .from('request_details')
    .select('id')
    .eq('service_request_id', requestId)
    .single();

  const { data, error } = await supabase
    .from('used_materials')
    .select('*, materials(*)')
    .eq('request_detail_id', reqDetail?.id);

  if (error) throw error;
  return data;
}

export async function approveMaterial(usedMaterialId: number, status: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('used_materials')
    .update({ status })
    .eq('id', usedMaterialId);

  if (error) throw error;
  revalidatePath('/admin');
  revalidatePath('/worker');
}
