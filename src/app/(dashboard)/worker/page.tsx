'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  UnorderedListOutlined, 
  HistoryOutlined, 
  WalletOutlined,
  UserOutlined,
  EnvironmentOutlined,
  SendOutlined,
  ToolOutlined,
  CheckCircleOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { getServiceRequests } from '@/app/actions/serviceRequests';
import { submitWorkerReport } from '@/app/actions/workerActions';
import { getMaterials, requestMaterials, getUsedMaterials } from '@/app/actions/materials';
import { createInvoice } from '@/app/actions/invoices';
import { Card, Tag, Button, Modal, Form, Input, message, Empty, Spin, Select, InputNumber, Space, Divider, List, Tabs } from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;

export default function WorkerDashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Modals
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isMaterialModalVisible, setIsMaterialModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [usedMaterials, setUsedMaterials] = useState<any[]>([]);
  
  const [reportForm] = Form.useForm();
  const [materialForm] = Form.useForm();

  const menuItems = [
    { key: '1', icon: <UnorderedListOutlined />, label: 'Việc mới', path: '/worker' },
    { key: '2', icon: <HistoryOutlined />, label: 'Lịch sử công việc', path: '/worker' },
    { key: '3', icon: <WalletOutlined />, label: 'Thu nhập', path: '/worker' },
    { key: '4', icon: <UserOutlined />, label: 'Hồ sơ cá nhân', path: '/worker' },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const [reqData, matData] = await Promise.all([
        getServiceRequests('WORKER'),
        getMaterials()
      ]);
      setRequests(reqData);
      setMaterials(matData);
    } catch (error) {
      message.error('Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenReport = (request: any) => {
    setSelectedRequest(request);
    setIsReportModalVisible(true);
  };

  const handleOpenMaterial = async (request: any) => {
    setSelectedRequest(request);
    setIsMaterialModalVisible(true);
    try {
      const data = await getUsedMaterials(request.id);
      setUsedMaterials(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishReport = async (values: any) => {
    try {
      await submitWorkerReport(selectedRequest.id, values.title, values.description);
      message.success('Báo cáo đã được gửi');
      setIsReportModalVisible(false);
      reportForm.resetFields();
      fetchData();
    } catch (error) {
      message.error('Lỗi khi gửi báo cáo');
    }
  };

  const onFinishMaterial = async (values: any) => {
    try {
      const items = values.items.map((item: any) => ({
        material_id: item.material_id,
        quantity: item.quantity,
        note: item.note
      }));
      await requestMaterials(selectedRequest.id, items);
      message.success('Đã gửi yêu cầu vật tư');
      setIsMaterialModalVisible(false);
      materialForm.resetFields();
      fetchData();
    } catch (error) {
      message.error('Lỗi khi yêu cầu vật tư');
    }
  };

  const handleCompleteTask = async (requestId: number) => {
    Modal.confirm({
      title: 'Xác nhận hoàn thành',
      content: 'Bạn có chắc chắn muốn hoàn thành công việc này và tạo hóa đơn?',
      onOk: async () => {
        try {
          await createInvoice(requestId);
          message.success('Công việc đã hoàn thành!');
          fetchData();
        } catch (error) {
          message.error('Lỗi khi hoàn thành công việc');
        }
      }
    });
  };

  return (
    <DashboardLayout role="WORKER" menuItems={menuItems}>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Giao diện Thợ sửa chữa</h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-blue-600 text-white rounded-xl shadow-md flex justify-between items-center">
          <div>
            <div className="text-xs opacity-80 uppercase tracking-wider">Trạng thái làm việc</div>
            <div className="text-lg font-bold">Đang trực tuyến</div>
          </div>
          <Tag color="green" className="border-none px-3 rounded-full">ONLINE</Tag>
        </div>
        
        <h3 className="font-medium text-gray-700 pt-2 flex justify-between items-center">
          Công việc được gán
          <Button type="link" size="small" onClick={fetchData}>Làm mới</Button>
        </h3>

        {loading ? (
          <div className="text-center py-12"><Spin tip="Đang tải..." /></div>
        ) : requests.length > 0 ? (
          requests.map((req) => (
            <Card key={req.id} className="shadow-sm border-gray-100 rounded-xl overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded text-xs">REQ-{req.id.toString().padStart(4, '0')}</span>
                <Tag color={req.status === 2 ? 'orange' : 'green'} className="m-0 rounded-full border-none">
                  {req.status === 2 ? 'Đang thực hiện' : 'Hoàn thành'}
                </Tag>
              </div>
              <div className="font-bold text-gray-800 text-base mb-1">{req.customer_name}</div>
              <div className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                <EnvironmentOutlined className="text-blue-500" /> {req.customer_address}
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 mb-4 border border-gray-100">
                <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Mô tả hư hỏng:</div>
                {req.description}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button block icon={<SendOutlined />} onClick={() => handleOpenReport(req)}>Báo cáo</Button>
                <Button block icon={<ToolOutlined />} onClick={() => handleOpenMaterial(req)}>Vật tư</Button>
                <Button 
                  block 
                  type="primary" 
                  className="col-span-2 mt-1 bg-green-600 hover:bg-green-700" 
                  icon={<CheckCircleOutlined />}
                  onClick={() => handleCompleteTask(req.id)}
                  disabled={req.status === 3}
                >
                  Hoàn thành công việc
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <Empty description="Hiện tại chưa có công việc nào" className="py-12 bg-gray-50 rounded-xl" />
        )}
      </div>

      {/* Report Modal */}
      <Modal
        title={`Báo cáo tiến độ: REQ-${selectedRequest?.id.toString().padStart(4, '0')}`}
        open={isReportModalVisible}
        onCancel={() => setIsReportModalVisible(false)}
        footer={null}
        className="rounded-xl"
      >
        <Form form={reportForm} layout="vertical" onFinish={onFinishReport}>
          <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
            <Input placeholder="Ví dụ: Đã đến khảo sát, Đang thực hiện..." />
          </Form.Item>
          <Form.Item name="description" label="Chi tiết" rules={[{ required: true }]}>
            <TextArea rows={4} placeholder="Mô tả cụ thể nội dung công việc đã làm..." />
          </Form.Item>
          <Form.Item className="mb-0 text-right">
            <Button onClick={() => setIsReportModalVisible(false)} className="mr-2">Hủy</Button>
            <Button type="primary" htmlType="submit" icon={<SendOutlined />}>Gửi báo cáo</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Material Modal */}
      <Modal
        title="Quản lý Vật tư sửa chữa"
        open={isMaterialModalVisible}
        onCancel={() => setIsMaterialModalVisible(false)}
        onOk={() => materialForm.submit()}
        width={600}
      >
        <Tabs defaultActiveKey="request" items={[
          {
            key: 'request',
            label: 'Yêu cầu mới',
            children: (
              <Form form={materialForm} layout="vertical" onFinish={onFinishMaterial}>
                <Form.List name="items" initialValue={[{}]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className="bg-gray-50 p-3 rounded-lg mb-3 relative border border-gray-100">
                          <Space align="baseline" className="w-full flex-wrap">
                            <Form.Item {...restField} name={[name, 'material_id']} label="Vật tư" rules={[{ required: true }]} style={{ minWidth: 200 }}>
                              <Select placeholder="Chọn vật tư">
                                {materials.map(m => <Select.Option key={m.id} value={m.id}>{m.name} ({m.unit})</Select.Option>)}
                              </Select>
                            </Form.Item>
                            <Form.Item {...restField} name={[name, 'quantity']} label="Số lượng" rules={[{ required: true }]} initialValue={1}>
                              <InputNumber min={1} />
                            </Form.Item>
                            <Form.Item {...restField} name={[name, 'note']} label="Ghi chú">
                              <Input placeholder="Lý do cần..." />
                            </Form.Item>
                            {fields.length > 1 && <Button type="text" danger onClick={() => remove(name)}>Xóa</Button>}
                          </Space>
                        </div>
                      ))}
                      <Button type="dashed" onClick={() => add()} block icon={<PlusCircleOutlined />}>Thêm vật tư khác</Button>
                    </>
                  )}
                </Form.List>
              </Form>
            )
          },
          {
            key: 'list',
            label: 'Đã yêu cầu',
            children: (
              <List
                dataSource={usedMaterials}
                renderItem={(item: any) => (
                  <List.Item extra={<Tag color={item.status === 2 ? 'green' : 'orange'}>{item.status === 2 ? 'Đã duyệt' : 'Chờ duyệt'}</Tag>}>
                    <List.Item.Meta title={item.materials?.name} description={`Số lượng: ${item.quantity} ${item.materials?.unit}`} />
                  </List.Item>
                )}
              />
            )
          }
        ]} />
      </Modal>
    </DashboardLayout>
  );
}
