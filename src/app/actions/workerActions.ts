'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from './auth';

export async function assignWorkerToRequest(requestId: number, workerId: number) {
  const supabase = await createClient();

  const { error: repairError } = await supabase
    .from('repair_details')
    .insert([
      {
        request_detail_id: (await supabase.from('request_details').select('id').eq('service_request_id', requestId).single()).data?.id,
        worker_id: workerId,
        date_begin: new Date().toISOString(),
        is_primary: true,
      },
    ]);

  if (repairError) throw repairError;

  const { error: statusError } = await supabase
    .from('service_requests')
    .update({ status: 2 }) // 2: Assigned
    .eq('id', requestId);

  if (statusError) throw statusError;

  revalidatePath('/admin');
  revalidatePath('/worker');
}

export async function submitWorkerReport(requestId: number, title: string, description: string) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user) throw new Error('Chưa đăng nhập');

  const { data: reqDetail } = await supabase
    .from('request_details')
    .select('id')
    .eq('service_request_id', requestId)
    .single();

  const { error } = await supabase
    .from('reports')
    .insert([
      {
        request_detail_id: reqDetail?.id,
        worker_id: user.id,
        title,
        description,
        report_date: new Date().toISOString(),
      },
    ]);

  if (error) throw error;

  revalidatePath('/worker');
  revalidatePath('/admin');
}

export async function getAllWorkers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'WORKER');

  if (error) throw error;
  return data;
}
