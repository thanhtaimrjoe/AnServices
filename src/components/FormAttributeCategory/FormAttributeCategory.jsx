import { ProFormDigit, ProFormText } from '@ant-design/pro-form';

const FormAttributeCategory = (props) => {
  return (
    <div>
      <ProFormText
        rules={[{ required: true, message: 'Vui lòng nhập mã danh mục' }]}
        width="sm"
        name="code"
        label="Mã danh mục"
        initialValue={props.cate ? props.cate.code : ''}
        placeholder="Nhập mã danh mục"
      />
      <ProFormText
        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
        width="sm"
        name="name"
        label="Tên danh mục"
        initialValue={props.cate ? props.cate.name : ''}
        placeholder="Nhập tên danh mục"

      />
      <ProFormDigit
        rules={[{ required: true, message: 'Vui lòng nhập vị trí' }]}
        width="sm"
        name="position"
        label="Vị trí"
        initialValue={props.cate ? props.cate.position : ''}
        placeholder="Nhập vị trí"
      />
    </div>
  );
};

export default FormAttributeCategory;
