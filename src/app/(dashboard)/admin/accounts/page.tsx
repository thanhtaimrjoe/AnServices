'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  DashboardOutlined, 
  TeamOutlined, 
  ToolOutlined, 
  SolutionOutlined,
  SettingOutlined,
  UserOutlined,
  LockOutlined,
  UnlockOutlined
} from '@ant-design/icons';
import { Table, Tag, Button, Space, message, Card, Avatar } from 'antd';
import { useState, useEffect } from 'react';
import { getAllProfiles, updateProfileStatus } from '@/app/actions/profiles';
import dayjs from 'dayjs';

export default function AccountsPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const menuItems = [
    { key: '1', icon: <DashboardOutlined />, label: 'Tổng quan' },
    { key: '2', icon: <TeamOutlined />, label: 'Quản lý người dùng' },
    { key: '3', icon: <SolutionOutlined />, label: 'Quản lý yêu cầu' },
    { key: '4', icon: <ToolOutlined />, label: 'Dịch vụ & Vật tư' },
    { key: '5', icon: <SettingOutlined />, label: 'Cài đặt hệ thống' },
  ];

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const data = await getAllProfiles();
      setProfiles(data);
    } catch (error) {
      message.error('Lỗi khi tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: number) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      await updateProfileStatus(id, newStatus);
      message.success('Cập nhật trạng thái thành công');
      fetchProfiles();
    } catch (error) {
      message.error('Lỗi khi cập nhật trạng thái');
    }
  };

  const columns = [
    {
      title: 'Người dùng',
      key: 'user',
      render: (record: any) => (
        <Space>
          <Avatar icon={<UserOutlined />} src={record.avatar_url} />
          <div>
            <div className="font-medium">{record.full_name || 'Chưa đặt tên'}</div>
            <div className="text-xs text-gray-400">{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
      key: 'phone_number',
      render: (phone: string) => phone || <span className="text-gray-300 italic">Chưa có</span>,
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const colors = { ADMIN: 'magenta', WORKER: 'cyan', CUSTOMER: 'blue' };
        return <Tag color={colors[role as keyof typeof colors]}>{role}</Tag>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => (
        <Tag color={status === 1 ? 'green' : 'red'}>
          {status === 1 ? 'Hoạt động' : 'Đã khóa'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button 
            size="small" 
            danger={record.status === 1}
            icon={record.status === 1 ? <LockOutlined /> : <UnlockOutlined />}
            onClick={() => handleToggleStatus(record.id, record.status)}
          >
            {record.status === 1 ? 'Khóa' : 'Mở khóa'}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout role="ADMIN" menuItems={menuItems}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Quản lý Tài khoản</h2>
      </div>

      <Card className="shadow-sm">
        <Table 
          columns={columns} 
          dataSource={profiles} 
          rowKey="id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </DashboardLayout>
  );
}
