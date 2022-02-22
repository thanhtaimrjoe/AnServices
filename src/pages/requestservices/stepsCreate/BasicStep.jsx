import React from 'react';

import { Input, Row, Col, InputNumber, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ProForm, { ProFormDatePicker } from '@ant-design/pro-form';
import CommonSelect from '@/components/CommonSelect/CommonSelect';


const BasicStep = () => {
  return (
    <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="customerName"
            label="Tên khách hàng"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Vui lòng nhập tên khách hàng',
              }, 
            ]}
          >
            <Input placeholder='Nhập tên khách hàng' />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="customerPhone"
            label="Số điện thoại khách hàng"
          >
            <InputNumber  placeholder='0' style={{ width: '470px' }} disabled/>
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name="customerAddress"
            label="Địa chỉ khách hàng"
            rules={[
              {
                required: true,
                type: 'integer',
                message: 'Please input slot',
              }, 
            ]}
          >
            <InputNumber  placeholder='Input slot' style={{ width: '470px' }} />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="hashtag"
            label="Hashtag"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please input hashtag',
              }, 
            ]}
          >
            <Input placeholder='Input hashtag' />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name="linkBrand"
            label="Link Brand"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please input yoursite',
              }, 
            ]}
          >
            <Input addonBefore="https://" addonAfter=".com" placeholder='Input yoursite' />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProFormDatePicker
          placeholder= "Plese choose date" width={470}
            name="startDate"
            label="Start Date"
            rules={[
              {
                required: true,
                message: 'Please choose start date',
              }, 
            ]}
          >
          </ProFormDatePicker>
        </Col>
        <Col span={12}>
          <ProFormDatePicker
          placeholder= "Plese choose date" width={470}
            name="endDate"
            label="End Date"
            rules={[
              {
                required: true,
                message: 'Please choose end date',
              }, 
            ]}
          >
          </ProFormDatePicker>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="conditionApply"
            label="Condition Apply"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please input condition apply',
              }, 
            ]}
          >
            <Input placeholder='Input condition apply' />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name="brandId"
            label="Brand Name"
            rules={[
              {
                required: true,
                message: 'Please select brand',
              }, {
                pattern: '^[0-9]*$',
                type: 'integer',
                message: "Only number"
              }
            ]}
          >
            <CommonSelect.SelectBrandById
            />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="platformId"
            label="Platform"
            rules={[
              {
                required: true,
                message: 'Please select platform',
              }, {
                pattern: '^[0-9]*$',
                type: 'integer',
                message: "Only number"
              }
            ]}
          >
            <CommonSelect.SelectPlatformById
            />
          </ProForm.Item>
        </Col>
        {/* <Col span={12}>
          <ProForm.Item
            name="voucherId"
            label="Voucher"
            rules={[
              {
                required: true,
                message: 'Please select voucher',
              }, {
                pattern: '^[0-9]*$',
                type: 'integer',
                message: "Only number"
              }
            ]}
          >
            <CommonSelect.SelectVoucherById
            />
          </ProForm.Item>
        </Col> */}
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="workDescription"
            label="Work Description"
            // rules={[
            //   {
            //     required: true,
            //     type: 'string',
            //     message: 'Please input workDescription',
            //   }, 
            // ]}
          >
            <Input.TextArea rows={4} placeholder='Skip if no notes' />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name="campaignDecription"
            label="Campaign Description"
          >
            <Input.TextArea rows={4} placeholder='Skip if no notes' />
          </ProForm.Item>
        </Col>
      </Row>
    </div>
  );
};

export default BasicStep;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Upload
        name="image"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="image" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}