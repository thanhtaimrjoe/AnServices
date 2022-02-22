import React, { useEffect, useState } from 'react';

import { Input, Row, Col, Select } from 'antd';

import ProForm from '@ant-design/pro-form';
import { getReportAttribute } from '@/services/storereport';
import { getAllCategories } from '@/services/categories';

const FormStoreReportTemplate = () => {
  const { Option } = Select;

  const [reportAttribute, setReportAttribute] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getReportAttribute(1).then((res) => {
      setReportAttribute(res.report_attribute);
    });
    getAllCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  const addOptionAttributeHandler = () => {
    return reportAttribute.map((att) => {
      return (
        // eslint-disable-next-line react/jsx-key
        <Option value={att.id} label={att.name}>
          <div className="demo-option-label-item">{att.name}</div>
        </Option>
      );
    });
  };
  const addOptionCategoriesHandler = () => {
    return categories.map((cate) => {
      return (
        // eslint-disable-next-line react/jsx-key
        <Option value={cate.id} label={cate.name}>
          <div className="demo-option-label-item">{cate.name}</div>
        </Option>
      );
    });
  };
  const handleChangeCate = (value) => {
    getReportAttribute(value).then((res) => {
      setReportAttribute(res.report_attribute);
      addOptionAttributeHandler();
    });
  };
  const handleChangeAtt = (value) => {
    const obj = {};
    const tmp = `${value}`;
    const propsArr = tmp.split(',');
    propsArr.forEach((s) => {
      const [key, values] = s.split(':');
      obj[key] = values;
    });
  };
  return (
    <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="categoryId"
            label="Tên danh mục"
            rules={[
              {
                required: true,
                type: 'number',
                message: 'Vui lòng chọn tên danh mục',
              },
            ]}
          >
            <Select
              style={{ width: '70%' }}
              placeholder="Chọn danh mục"
              onChange={handleChangeCate}
              optionLabelProp="label"
            >
              {addOptionCategoriesHandler()}
            </Select>
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="notes"
            label="Ghi chú"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Vui lòng nhập ghi chú',
              },
            ]}
          >
            <Input style={{ width: '70%' }} placeholder="Nhập ghi chú" />
          </ProForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ProForm.Item
            name="atts"
            label="Thuộc tính"
            rules={[{ required: true, message: 'Vui lòng chọn thuộc tính' }]}
          >
            <Select
              mode="multiple"
              style={{ width: '70%' }}
              placeholder="Chọn thuộc tính"
              onChange={handleChangeAtt}
              optionLabelProp="label"
            >
              {addOptionAttributeHandler()}
            </Select>
          </ProForm.Item>
        </Col>
      </Row>
    </div>
  );
};
export default FormStoreReportTemplate;
