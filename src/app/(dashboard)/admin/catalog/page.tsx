'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  DashboardOutlined, 
  TeamOutlined, 
  ToolOutlined, 
  SolutionOutlined,
  SettingOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Table, Button, Card, Tabs, message, Space, Tag, Modal, Form, Input, Select, Switch } from 'antd';
import { useState, useEffect } from 'react';
import { getServices, getMaterials, upsertService, upsertMaterial, getTypeJobs, getTypeServices } from '@/app/actions/catalog';

export default function CatalogPage() {
  const [services, setServices] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [typeJobs, setTypeJobs] = useState<any[]>([]);
  const [typeServices, setTypeServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Modals
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  const [form] = Form.useForm();

  const menuItems = [
    { key: '1', icon: <DashboardOutlined />, label: 'Tổng quan' },
    { key: '2', icon: <TeamOutlined />, label: 'Quản lý người dùng' },
    { key: '3', icon: <SolutionOutlined />, label: 'Quản lý yêu cầu' },
    { key: '4', icon: <ToolOutlined />, label: 'Dịch vụ & Vật tư' },
    { key: '5', icon: <SettingOutlined />, label: 'Cài đặt hệ thống' },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sData, mData, tjData, tsData] = await Promise.all([
        getServices(), 
        getMaterials(),
        getTypeJobs(),
        getTypeServices()
      ]);
      setServices(sData);
      setMaterials(mData);
      setTypeJobs(tjData);
      setTypeServices(tsData);
    } catch (error) {
      message.error('Lỗi khi tải dữ liệu danh mục');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditService = (record: any) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsServiceModalOpen(true);
  };

  const handleEditMaterial = (record: any) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsMaterialModalOpen(true);
  };

  const handleSaveService = async (values: any) => {
    try {
      await upsertService({ ...currentRecord, ...values });
      message.success('Cập nhật dịch vụ thành công');
      setIsServiceModalOpen(false);
      fetchData();
    } catch (error) {
      message.error('Lỗi khi lưu dịch vụ');
    }
  };

  const handleSaveMaterial = async (values: any) => {
    try {
      await upsertMaterial({ ...currentRecord, ...values });
      message.success('Cập nhật vật tư thành công');
      setIsMaterialModalOpen(false);
      fetchData();
    } catch (error) {
      message.error('Lỗi khi lưu vật tư');
    }
  };

  const serviceColumns = [
    { title: 'Tên dịch vụ', dataIndex: 'name', key: 'name' },
    { title: 'Loại thợ', dataIndex: ['type_jobs', 'name'], key: 'type_job' },
    { 
      title: 'Giá tham khảo', 
      dataIndex: ['type_services', 'value'], 
      key: 'price',
      render: (val: number) => val ? `${val.toLocaleString()}đ` : 'Liên hệ'
    },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: boolean) => <Tag color={status ? 'green' : 'red'}>{status ? 'Kinh doanh' : 'Ngừng'}</Tag>
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditService(record)}>Sửa</Button>
        </Space>
      ),
    },
  ];

  const materialColumns = [
    { title: 'Tên vật tư', dataIndex: 'name', key: 'name' },
    { title: 'Đơn vị tính', dataIndex: 'unit', key: 'unit' },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditMaterial(record)}>Sửa</Button>
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout role="ADMIN" menuItems={menuItems}>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Quản lý Danh mục</h2>

      <Tabs
        defaultActiveKey="services"
        className="custom-tabs"
        items={[
          {
            key: 'services',
            label: 'Danh sách Dịch vụ',
            children: (
              <Card extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setCurrentRecord(null); form.resetFields(); setIsServiceModalOpen(true); }}>Thêm dịch vụ</Button>}>
                <Table columns={serviceColumns} dataSource={services} rowKey="id" loading={loading} pagination={{ pageSize: 8 }} />
              </Card>
            ),
          },
          {
            key: 'materials',
            label: 'Danh sách Vật tư',
            children: (
              <Card extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setCurrentRecord(null); form.resetFields(); setIsMaterialModalOpen(true); }}>Thêm vật tư</Button>}>
                <Table columns={materialColumns} dataSource={materials} rowKey="id" loading={loading} pagination={{ pageSize: 8 }} />
              </Card>
            ),
          },
        ]}
      />

      {/* Service Modal */}
      <Modal
        title={currentRecord ? 'Sửa dịch vụ' : 'Thêm dịch vụ mới'}
        open={isServiceModalOpen}
        onCancel={() => setIsServiceModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveService}>
          <Form.Item name="name" label="Tên dịch vụ" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type_job_id" label="Loại thợ phụ trách" rules={[{ required: true }]}>
            <Select>
              {typeJobs.map(tj => <Select.Option key={tj.id} value={tj.id}>{tj.name}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="type_service_id" label="Phân loại giá">
            <Select>
              {typeServices.map(ts => <Select.Option key={ts.id} value={ts.id}>{ts.description} ({ts.value}đ)</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Đang kinh doanh" valuePropName="checked" initialValue={true}>
            <Switch />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Material Modal */}
      <Modal
        title={currentRecord ? 'Sửa vật tư' : 'Thêm vật tư mới'}
        open={isMaterialModalOpen}
        onCancel={() => setIsMaterialModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveMaterial}>
          <Form.Item name="name" label="Tên vật tư" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="unit" label="Đơn vị tính" rules={[{ required: true }]}>
            <Input placeholder="Ví dụ: cái, mét, bộ..." />
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
}
