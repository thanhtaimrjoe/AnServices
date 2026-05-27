'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { ServiceRequest } from '@/types';
import { getCurrentUser } from './auth';

export async function createServiceRequest(formData: any) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user) throw new Error('Chưa đăng nhập');

  const { data, error } = await supabase
    .from('service_requests')
    .insert([
      {
        customer_id: user.id,
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_address: formData.customer_address,
        description: formData.description,
        status: 1, // 1: Pending
        package_type: formData.package_type,
      },
    ])
    .select();

  if (error) throw error;

  revalidatePath('/customer');
  revalidatePath('/admin');
  return data[0];
}

export async function getServiceRequests(role: 'ADMIN' | 'WORKER' | 'CUSTOMER') {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user) return [];

  let query = supabase.from('service_requests').select(`
    *,
    request_details (
      *,
      services (*)
    )
  `);

  if (role === 'CUSTOMER') {
    query = query.eq('customer_id', user.id);
  } else if (role === 'WORKER') {
    // Logic for worker - filter by assigned repair_details
    const { data: assignedReqs } = await supabase
      .from('repair_details')
      .select('request_detail_id')
      .eq('worker_id', user.id);
    
    if (assignedReqs && assignedReqs.length > 0) {
      const { data: details, error: detailsErr } = await supabase
        .from('request_details')
        .select('service_request_id')
        .in('id', assignedReqs.map(r => r.request_detail_id));
      
      if (detailsErr) {
        console.error('Details Error:', detailsErr);
        return [];
      }

      if (details && details.length > 0) {
        query = query.in('id', details.map(d => d.service_request_id));
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function updateRequestStatus(requestId: number, status: number) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('service_requests')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', requestId);

  if (error) throw error;

  revalidatePath('/customer');
  revalidatePath('/admin');
  revalidatePath('/worker');
}
