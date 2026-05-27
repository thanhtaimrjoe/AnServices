'use client';

import React from 'react';
import { Form, Input, Button, Card, Tabs, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/actions/auth';
import { createTestAccounts } from '@/app/actions/seed';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSeed = async () => {
    const hide = message.loading('Đang khởi tạo dữ liệu và tài khoản mẫu...', 0);
    try {
      const result = await createTestAccounts();
      console.log('Seed Result:', result);
      if (result.message) {
        message.success(result.message);
      }
    } catch (err) {
      message.error('Lỗi khi khởi tạo dữ liệu');
    } finally {
      hide();
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const result = await login(values);
      if (result?.error) {
        message.error('Đăng nhập thất bại: ' + result.error);
      } else if (result?.success) {
        message.success('Đăng nhập thành công!');
        router.push(`/${result.role}`);
        router.refresh();
      }
    } catch (err: any) {
      message.error('Có lỗi xảy ra: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loginForm = (role: string) => (
    <Form
      name={`login_${role}`}
      initialValues={{ remember: true, role }}
      onFinish={onFinish}
      layout="vertical"
      size="large"
    >
      <Form.Item name="role" hidden>
        <Input />
      </Form.Item>
      
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email đăng nhập" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">AnServices</h1>
        <p className="text-gray-500 italic">Hệ thống dịch vụ sửa chữa nhà cửa chuyên nghiệp</p>
      </div>

      <Card className="w-full max-w-md shadow-xl border-none">
        <Tabs
          defaultActiveKey="CUSTOMER"
          centered
          items={[
            {
              key: 'CUSTOMER',
              label: 'Khách hàng',
              children: loginForm('CUSTOMER'),
            },
            {
              key: 'WORKER',
              label: 'Thợ sửa chữa',
              children: loginForm('WORKER'),
            },
            {
              key: 'ADMIN',
              label: 'Quản trị viên',
              children: loginForm('ADMIN'),
            },
          ]}
        />
      </Card>
      
      <div className="mt-8 text-gray-400 text-sm flex flex-col items-center gap-2">
        <div>© 2026 AnServices - Remake with AI Technology</div>
        <Button size="small" type="link" onClick={handleSeed}>Khởi tạo tài khoản mẫu</Button>
      </div>
    </div>
  );
}
