'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  PlusCircleOutlined, 
  ContainerOutlined, 
  TagOutlined,
  CustomerServiceOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  RightOutlined
} from '@ant-design/icons';
import { Modal, Form, Input, Select, message, Button, Tag, Empty, Card, Avatar, List, Typography } from 'antd';
import { useState, useEffect } from 'react';
import { createServiceRequest, getServiceRequests } from '@/app/actions/serviceRequests';
import { getServices } from '@/app/actions/catalog';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Title, Text } = Typography;

export default function CustomerDashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedRequest] = useState<any>(null);

  const menuItems = [
    { key: '1', icon: <PlusCircleOutlined />, label: 'Đặt dịch vụ', path: '/customer' },
    { key: '2', icon: <ContainerOutlined />, label: 'Yêu cầu của tôi', path: '/customer/history' },
    { key: '3', icon: <TagOutlined />, label: 'Khuyến mãi', path: '/customer' },
    { key: '4', icon: <CustomerServiceOutlined />, label: 'Hỗ trợ', path: '/customer' },
  ];

  const fetchData = async () => {
    try {
      const [reqData, sData] = await Promise.all([
        getServiceRequests('CUSTOMER'),
        getServices()
      ]);
      console.log('Fetched Services:', sData);
      setRequests(reqData);
      setServices(sData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateRequest = async (values: any) => {
    setLoading(true);
    try {
      await createServiceRequest(values);
      message.success('Đặt dịch vụ thành công! Vui lòng chờ Admin xác nhận.');
      setIsModalVisible(false);
      form.resetFields();
      fetchData();
    } catch (error: any) {
      message.error('Lỗi: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSelect = (service: any) => {
    setSelectedRequest(service);
    form.setFieldsValue({ 
      package_type: service.type_job_id,
      description: `Yêu cầu dịch vụ: ${service.name}\n` 
    });
    setIsModalVisible(true);
  };

  const getStatusTag = (status: number) => {
    switch (status) {
      case 1: return <Tag color="blue" className="rounded-full border-none px-3">Chờ xác nhận</Tag>;
      case 2: return <Tag color="orange" className="rounded-full border-none px-3">Đã gán thợ</Tag>;
      case 3: return <Tag color="green" className="rounded-full border-none px-3">Hoàn thành</Tag>;
      default: return <Tag color="default" className="rounded-full border-none px-3">Không xác định</Tag>;
    }
  };

  return (
    <DashboardLayout role="CUSTOMER" menuItems={menuItems}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Title level={4} className="text-gray-800 mb-6 flex items-center gap-2">
            <PlusCircleOutlined className="text-blue-500" /> Dịch vụ sửa chữa phổ biến
          </Title>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {services.map((service) => (
              <Card
                key={service.id}
                hoverable
                className="text-center rounded-2xl border-none shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                onClick={() => handleServiceSelect(service)}
                cover={
                  <div className="pt-6 flex justify-center bg-blue-50/50 group-hover:bg-blue-50 transition-colors">
                    <Avatar 
                      src={service.image_url} 
                      shape="square" 
                      size={64} 
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                }
              >
                <div className="mt-2">
                  <Text strong className="block text-gray-800 text-sm mb-1">{service.name}</Text>
                  <Text type="secondary" className="text-xs">{service.type_jobs?.name}</Text>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Title level={4} className="m-0 text-gray-800 flex items-center gap-2">
            <ClockCircleOutlined className="text-orange-500" /> Yêu cầu gần đây
          </Title>
          <Button type="link" onClick={fetchData}>Làm mới</Button>
        </div>
        
        <div className="space-y-4">
          {requests.length > 0 ? (
            requests.map((req) => (
              <Card key={req.id} className="rounded-2xl border-none shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {req.id.toString().slice(-1)}
                    </div>
                    <div>
                      <Text strong className="text-gray-800">Mã yêu cầu: REQ-{req.id.toString().padStart(4, '0')}</Text>
                      <div className="text-xs text-gray-400">
                        Ngày tạo: {dayjs(req.created_at).format('DD/MM/YYYY HH:mm')}
                      </div>
                    </div>
                  </div>
                  {getStatusTag(req.status)}
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 mb-4">
                  {req.description}
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <EnvironmentOutlined className="text-blue-500" /> {req.customer_address}
                  </div>
                  <Button type="text" size="small" icon={<RightOutlined />} className="text-blue-600">Xem chi tiết</Button>
                </div>
              </Card>
            ))
          ) : (
            <Empty description="Bạn chưa có yêu cầu nào" className="py-12 bg-gray-50 rounded-2xl" />
          )}
        </div>
      </div>

      <Modal
        title={
          <div className="flex items-center gap-2 text-lg">
            <PlusCircleOutlined className="text-blue-600" /> 
            <span>Đặt dịch vụ: {selectedService?.name || 'Mới'}</span>
          </div>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
        centered
        className="custom-modal"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateRequest}
          initialValues={{ package_type: 1 }}
          className="mt-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="customer_name"
              label="Họ tên người liên hệ"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
            >
              <Input placeholder="Ví dụ: Nguyễn Văn A" className="rounded-lg h-10" />
            </Form.Item>
            <Form.Item
              name="customer_phone"
              label="Số điện thoại"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            >
              <Input placeholder="Số điện thoại liên hệ" className="rounded-lg h-10" />
            </Form.Item>
          </div>

          <Form.Item
            name="customer_address"
            label="Địa chỉ sửa chữa"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <Input prefix={<EnvironmentOutlined className="text-blue-500" />} placeholder="Số nhà, tên đường, phường/xã..." className="rounded-lg h-10" />
          </Form.Item>

          <Form.Item
            name="package_type"
            label="Phân loại yêu cầu"
            rules={[{ required: true }]}
          >
            <Select className="rounded-lg h-10">
              <Select.Option value={1}>Nhôm - Kính</Select.Option>
              <Select.Option value={2}>Cơ khí</Select.Option>
              <Select.Option value={3}>Sơn sửa</Select.Option>
              <Select.Option value={4}>Xây dựng</Select.Option>
              <Select.Option value={5}>Điện - Nước</Select.Option>
              <Select.Option value={7}>Thạch cao</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả chi tiết hư hỏng"
            rules={[{ required: true, message: 'Vui lòng mô tả vấn đề cần sửa chữa' }]}
          >
            <TextArea rows={4} placeholder="Ví dụ: Vòi nước bồn rửa bát bị rò rỉ, cần thay mới..." className="rounded-lg" />
          </Form.Item>

          <div className="flex gap-3 mt-8">
            <Button onClick={() => setIsModalVisible(false)} className="flex-1 h-11 rounded-xl">
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={loading} className="flex-1 h-11 rounded-xl bg-blue-600 shadow-lg shadow-blue-200">
              Xác nhận đặt lịch
            </Button>
          </div>
        </Form>
      </Modal>
    </DashboardLayout>
  );
}
