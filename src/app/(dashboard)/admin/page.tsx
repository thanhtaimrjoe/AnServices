'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  DashboardOutlined, 
  TeamOutlined, 
  ToolOutlined, 
  SolutionOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { Table, Tag, Button, Space, message, Card } from 'antd';
import { useState, useEffect } from 'react';
import { getServiceRequests, updateRequestStatus } from '@/app/actions/serviceRequests';
import dayjs from 'dayjs';

export default function AdminDashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const menuItems = [
    { key: '1', icon: <DashboardOutlined />, label: 'Tổng quan', path: '/admin' },
    { key: '2', icon: <TeamOutlined />, label: 'Quản lý người dùng', path: '/admin/accounts' },
    { key: '3', icon: <SolutionOutlined />, label: 'Quản lý yêu cầu', path: '/admin' },
    { key: '4', icon: <ToolOutlined />, label: 'Dịch vụ & Vật tư', path: '/admin/catalog' },
    { key: '5', icon: <SettingOutlined />, label: 'Cài đặt hệ thống', path: '/admin' },
  ];

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await getServiceRequests('ADMIN');
      setRequests(data);
    } catch (error) {
      console.error('Error:', error);
      message.error('Không thể tải danh sách yêu cầu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id: number, status: number) => {
    try {
      await updateRequestStatus(id, status);
      message.success('Cập nhật trạng thái thành công');
      fetchRequests();
    } catch (error) {
      message.error('Lỗi khi cập nhật trạng thái');
    }
  };

  const columns = [
    {
      title: 'Mã số',
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => <span className="font-mono font-bold">REQ-{id.toString().padStart(4, '0')}</span>,
    },
    {
      title: 'Khách hàng',
      key: 'customer',
      render: (record: any) => (
        <div>
          <div className="font-medium">{record.customer_name}</div>
          <div className="text-xs text-gray-400">{record.customer_phone}</div>
        </div>
      ),
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'package_type',
      key: 'package_type',
      render: (type: number) => {
        const types = { 1: 'Điện nước', 2: 'Xây dựng', 3: 'Khác' };
        return <span>{types[type as keyof typeof types]}</span>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => {
        const colors = { 1: 'blue', 2: 'orange', 3: 'green' };
        const labels = { 1: 'Chờ xác nhận', 2: 'Đang xử lý', 3: 'Hoàn thành' };
        return <Tag color={colors[status as keyof typeof colors]}>{labels[status as keyof typeof labels]}</Tag>;
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} size="small">Chi tiết</Button>
          {record.status === 1 && (
            <Button 
              type="primary" 
              size="small" 
              icon={<CheckCircleOutlined />}
              onClick={() => handleUpdateStatus(record.id, 2)}
            >
              Xác nhận
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const stats = [
    { title: 'Yêu cầu mới', count: requests.filter(r => r.status === 1).length, color: 'blue' },
    { title: 'Đang thực hiện', count: requests.filter(r => r.status === 2).length, color: 'orange' },
    { title: 'Hoàn thành', count: requests.filter(r => r.status === 3).length, color: 'green' },
    { title: 'Tổng cộng', count: requests.length, color: 'purple' },
  ];

  return (
    <DashboardLayout role="ADMIN" menuItems={menuItems}>
      <h2 className="text-2xl font-semibold mb-6">Bảng điều khiển Admin</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx} className={`border-l-4 border-l-${stat.color}-500 shadow-sm`}>
            <div className="text-gray-500 text-sm mb-1">{stat.title}</div>
            <div className={`text-3xl font-bold text-${stat.color}-600`}>{stat.count}</div>
          </Card>
        ))}
      </div>

      <Card title="Danh sách yêu cầu gần đây" className="shadow-sm">
        <Table 
          columns={columns} 
          dataSource={requests} 
          rowKey="id" 
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </DashboardLayout>
  );
}
