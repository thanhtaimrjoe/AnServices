import React from 'react';

import { Input, Row, Col, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import ProForm from '@ant-design/pro-form';
import CommonSelect from '@/components/CommonSelect/CommonSelect';
import { normalizeImg, normFile } from '@/utils/utils';
import ImageUploader from '@/components/ImageUploader/ImageUploader';

const BasicStep = () => {
  return (
    <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
      <Row gutter={16}>
        <Col span={12}>
          <span>Brand Image</span>
          <Avatar />
        </Col>
        <Col span={12}>
          <ProForm.Item
            valuePropName="fileList"
            getValueFromEvent={normFile}
            normalize={normalizeImg}
            name="pic_url"
            // label="Brand Image"
          >
            {/* <ImageUploader style={{ height: '100%' }} /> */}
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="name"
            label="Brand name"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please input brand name',
              }, 
            ]}
          >
            <Input placeholder='Input brand name' />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item
            name="hashTag"
            label="Hashtag"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Please input hashtag name',
              },
            ]}
          >
            <Input placeholder="Input hashtag name" />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        {/* <Col span={12}>
          <ProForm.Item
            name="businessId"
            label="Business Name"
            rules={[
              {
                required: true,
                message: 'Please select business',
              }, {
                pattern: '^[0-9]*$',
                type: 'integer',
                message: "Only number"
              }
            ]}
          >
            <CommonSelect.SelectBusinessById
            />
          </ProForm.Item>
        </Col> */}
        <Col span={12}>
          <ProForm.Item
            name="industryId"
            label="Industry Name"
            rules={[
              {
                required: true,
                message: 'Please select industry',
              }, 
              {
                pattern: '^[0-9]*$',
                type: 'integer',
                message: "Only number"
              }
            ]}
          >
            <CommonSelect.SelectIndustryById
            />
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
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('Image must smaller than 5MB!');
  }
  return isJpgOrPng && isLt5M;
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
        // action={`${API_URL}/brands`}
        // action="https://192.168.1.7:45455/api/v1/brands"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="image" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}