'use server';

import { createClient } from '@/lib/supabase/server';

export async function createTestAccounts() {
  const supabase = await createClient();
  const results: any[] = [];

  try {
    // 1. Seed TypeJobs
    const typeJobs = [
      { id: 1, name: 'Thợ nhôm - kính' },
      { id: 2, name: 'Thợ cơ khí' },
      { id: 3, name: 'Thợ sơn' },
      { id: 4, name: 'Thợ xây' },
      { id: 5, name: 'Thợ điện - nước' },
      { id: 6, name: 'Thợ điện lạnh' },
      { id: 7, name: 'Thợ thạch cao' },
    ];
    const { error: tjErr } = await supabase.from('type_jobs').upsert(typeJobs, { onConflict: 'id' });
    results.push({ step: 'TypeJobs', status: tjErr ? 'Error' : 'Success', message: tjErr?.message });

    // 2. Seed TypeServices
    const typeServices = [
      { id: 1, description: 'Dịch vụ xác nhận HÀI LÒNG tự động sau 1 ngày', value: 1 },
      { id: 2, description: 'Dịch vụ xác nhận HÀI LÒNG tự động sau 7 ngày', value: 8 },
      { id: 3, description: 'Dịch vụ xác nhận HÀI LÒNG tự động sau 14 ngày', value: 15 },
    ];
    const { error: tsErr } = await supabase.from('type_services').upsert(typeServices, { onConflict: 'id' });
    results.push({ step: 'TypeServices', status: tsErr ? 'Error' : 'Success', message: tsErr?.message });

    // 3. Seed Materials
    const materials = [
      { id: 1, name: 'Gạch bê tông', unit: 'viên' },
      { id: 2, name: 'Gạch block xây tường', unit: 'viên' },
      { id: 3, name: 'Gạch bông', unit: 'viên' },
      { id: 4, name: 'Gạch men', unit: 'viên' },
      { id: 5, name: 'Gạch lát nền', unit: 'viên' },
      { id: 7, name: 'Dây điện đơn', unit: 'm' },
      { id: 14, name: 'Xi măng PC30', unit: 'kg' },
      { id: 20, name: 'Sơn nước', unit: 'kg' },
      { id: 27, name: 'Cát đen', unit: 'kg' },
      { id: 35, name: 'Ống nhựa phi 21', unit: 'm' },
      { id: 40, name: 'Keo chống thấm', unit: 'tuýp' },
      { id: 43, name: 'Đinh rút nhôm', unit: 'hộp' },
      { id: 47, name: 'Bản lề cửa sắt', unit: 'cái' },
    ];
    const { error: matErr } = await supabase.from('materials').upsert(materials, { onConflict: 'id' });
    results.push({ step: 'Materials', status: matErr ? 'Error' : 'Success', message: matErr?.message });

    // 4. Seed Services with Icons
    const services = [
      { id: 1, name: 'Đục nền gạch cũ', description: '40.000-60.000/m2', type_job_id: 4, type_service_id: 1, image_url: 'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fbrick-wall.png?alt=media&token=287c4a63-12e5-42df-8843-01a75a2e9c4e' },
      { id: 2, name: 'Tháo dỡ mái tôn', description: '40.000-65.000/m2', type_job_id: 4, type_service_id: 3, image_url: 'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Froof.png?alt=media&token=dcd1a8e0-2dbe-4a01-80f8-cc14b4ab501b' },
      { id: 3, name: 'Hệ thống điện âm tường', description: 'Báo giá sau khi khảo sát', type_job_id: 5, type_service_id: 1, image_url: 'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Felectrical-energy.png?alt=media&token=6a9c146b-db43-4f85-9f42-4fe0cf8ff774' },
      { id: 4, name: 'Hệ thống nước âm tường', description: 'Báo giá sau khi khảo sát', type_job_id: 5, type_service_id: 1, image_url: 'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fpipe.png?alt=media&token=a22a0770-2882-4380-8594-c6bf5ac19c74' },
      { id: 5, name: 'Lắp kính cường lực 12ly', description: 'Báo giá sau khi khảo sát', type_job_id: 1, type_service_id: 1, image_url: 'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fglass.png?alt=media&token=1029d2c4-4ece-444f-92d2-edd8bf23fb73' },
      { id: 10, name: 'Làm trần thạch cao nổi', description: '130.000 – 260.000 /m2', type_job_id: 7, type_service_id: 2, image_url: 'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2F3501444.png?alt=media&token=fe54b84d-eaa8-43f0-b603-8586afe2f452' },
      { id: 11, name: 'Thi công sơn', description: '30.000 - 80.000/m2', type_job_id: 3, type_service_id: 1, image_url: 'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fpaint.png?alt=media&token=59a9ccfa-eca4-46b1-b233-6c1eb4ce6df2' },
      { id: 13, name: 'Gia công cửa sắt', description: '300.000 - 900.000/m2', type_job_id: 2, type_service_id: 1, image_url: 'https://firebasestorage.googleapis.com/v0/b/anservice-f4076.appspot.com/o/Services%2Fsingle-door.png?alt=media&token=4bb6c698-2114-4df0-87d1-034929fcaa55' },
    ];
    const { error: srvErr } = await supabase.from('services').upsert(services, { onConflict: 'id' });
    results.push({ step: 'Services', status: srvErr ? 'Error' : 'Success', message: srvErr?.message });

    // 5. Seed Test Accounts
    const accounts = [
      { username: 'customer01', password: 'Abc@123', role: 'CUSTOMER', full_name: 'Khách hàng 01' },
      { username: 'worker01', password: 'Abc@123', role: 'WORKER', full_name: 'Thợ sửa chữa 01', type_job_id: 5 }, // Thợ điện nước
      { username: 'staff01', password: 'Abc@123', role: 'ADMIN', full_name: 'Quản trị viên 01' },
    ];

    for (const account of accounts) {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          username: account.username,
          password: account.password,
          full_name: account.full_name,
          role: account.role as any,
          status: 1,
          type_job_id: account.type_job_id
        }, { onConflict: 'username' });

      results.push({ step: `User:${account.username}`, status: error ? 'Error' : 'Success', message: error?.message });
    }

    return { results, message: 'Quá trình migrate hoàn tất!' };
  } catch (err: any) {
    return { results, message: 'Lỗi nghiêm trọng: ' + err.message };
  }
}
