'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Services
export async function getServices() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .select('*, type_jobs(*), type_services(*)');
  
  if (error) {
    console.error('Error fetching services:', error);
    // Fallback if joins fail
    const { data: simpleData } = await supabase.from('services').select('*');
    return simpleData || [];
  }
  return data;
}

export async function upsertService(service: any) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('services')
    .upsert(service);
  if (error) throw error;
  revalidatePath('/admin/catalog');
}

// Materials
export async function getMaterials() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('materials').select('*');
  if (error) throw error;
  return data;
}

export async function upsertMaterial(material: any) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('materials')
    .upsert(material);
  if (error) throw error;
  revalidatePath('/admin/catalog');
}

// Master Data
export async function getTypeJobs() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('type_jobs').select('*');
  if (error) throw error;
  return data;
}

export async function getTypeServices() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('type_services').select('*');
  if (error) throw error;
  return data;
}
