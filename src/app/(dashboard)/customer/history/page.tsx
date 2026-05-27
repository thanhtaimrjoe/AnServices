'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  PlusCircleOutlined, 
  ContainerOutlined, 
  TagOutlined,
  CustomerServiceOutlined,
  HistoryOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { Table, Tag, Button, Card, message } from 'antd';
import { useState, useEffect } from 'react';
import { getServiceRequests } from '@/app/actions/serviceRequests';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function HistoryPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const menuItems = [
    { key: '1', icon: <PlusCircleOutlined />, label: 'Đặt dịch vụ' },
    { key: '2', icon: <ContainerOutlined />, label: 'Yêu cầu của tôi' },
    { key: '3', icon: <TagOutlined />, label: 'Khuyến mãi' },
    { key: '4', icon: <CustomerServiceOutlined />, label: 'Hỗ trợ' },
  ];

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getServiceRequests('CUSTOMER');
      setRequests(data);
    } catch (error) {
      message.error('Lỗi khi tải lịch sử yêu cầu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const columns = [
    {
      title: 'Mã số',
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => <span className="font-mono font-bold">REQ-{id.toString().padStart(4, '0')}</span>,
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
      title: 'Ngày đặt',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => {
        const colors = { 1: 'blue', 2: 'orange', 3: 'green' };
        const labels = { 1: 'Đang chờ', 2: 'Đang xử lý', 3: 'Hoàn thành' };
        return <Tag color={colors[status as keyof typeof colors]}>{labels[status as keyof typeof labels]}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Button size="small">Xem chi tiết</Button>
      ),
    },
  ];

  return (
    <DashboardLayout role="CUSTOMER" menuItems={menuItems}>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/customer">
          <Button icon={<ArrowLeftOutlined />} type="text" />
        </Link>
        <h2 className="text-2xl font-semibold">Lịch sử Yêu cầu</h2>
      </div>

      <Card className="shadow-sm">
        <Table 
          columns={columns} 
          dataSource={requests} 
          rowKey="id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </DashboardLayout>
  );
}
