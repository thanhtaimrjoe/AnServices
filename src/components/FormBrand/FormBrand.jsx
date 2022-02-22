import { ProFormText } from '@ant-design/pro-form';

const FormBrand = (props) => {
  return (
    <div>
      <ProFormText
        rules={[{ required: true, type: 'string', message: 'Vui lòng nhập mã thương hiệu' }]}
        name="brand_code"
        label="Mã thương hiệu"
        width="sm"
        initialValue={props.brand ? props.brand.brand_code : ''}
        placeholder="Nhập mã thương hiệu"
      />
      <ProFormText
        rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu' }]}
        name="brand_name"
        label="Tên thương hiệu"
        width="sm"
        initialValue={props.brand ? props.brand.brand_name : ''}
        placeholder="Nhập tên thương hiệu"
      />
    </div>
  );
};

export default FormBrand;
