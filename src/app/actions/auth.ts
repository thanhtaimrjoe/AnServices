'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: any) {
  const supabase = await createClient();

  // Đăng nhập thủ công bằng cách check bảng profiles
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', formData.username)
    .eq('password', formData.password)
    .single();

  if (error || !profile) {
    return { error: 'Tên đăng nhập hoặc mật khẩu không đúng' };
  }

  if (profile.status !== 1) {
    return { error: 'Tài khoản của bạn đã bị khóa' };
  }

  // Thiết lập Cookie Session đơn giản
  const cookieStore = await cookies();
  const sessionData = JSON.stringify({
    id: profile.id,
    username: profile.username,
    role: profile.role,
    full_name: profile.full_name
  });

  cookieStore.set('as-session', sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 tuần
    path: '/',
  });

  return { success: true, role: profile.role.toLowerCase() };
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete('as-session');
  redirect('/login');
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get('as-session');
  if (!session) return null;
  
  try {
    return JSON.parse(session.value);
  } catch {
    return null;
  }
}
