'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createInvoice(requestId: number) {
  const supabase = await createClient();

  // 1. Lấy thông tin hợp đồng
  const { data: contract } = await supabase
    .from('contracts')
    .select('*')
    .eq('service_request_id', requestId)
    .single();

  // 2. Tính toán tổng chi phí (có thể bao gồm vật tư đã duyệt)
  const totalPrice = contract?.total_price || 0;

  // 3. Tạo hóa đơn
  const { data: invoice, error } = await supabase
    .from('invoices')
    .insert([
      {
        service_request_id: requestId,
        contract_id: contract?.id,
        total_cost: totalPrice,
        updated_at: new Date().toISOString()
      }
    ])
    .select()
    .single();

  if (error) throw error;

  // 4. Cập nhật trạng thái yêu cầu thành hoàn thành (3)
  await supabase
    .from('service_requests')
    .update({ status: 3 })
    .eq('id', requestId);

  revalidatePath('/admin');
  revalidatePath('/customer');
  revalidatePath('/worker');

  return invoice;
}

export async function getInvoice(requestId: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('invoices')
    .select('*, contracts(*)')
    .eq('service_request_id', requestId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}
