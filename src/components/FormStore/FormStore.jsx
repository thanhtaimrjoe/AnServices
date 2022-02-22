import { getAllBrand } from '@/services/brands';
import { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { useEffect, useState } from 'react';

const FormStore = ({ store }) => {
  const [selectList, setSelectList] = useState([]);

  useEffect(() => {
    getAllBrand({ page: 1, size: 1000 }).then((res) =>
      res.data.map((brand) =>
        setSelectList((prev) => [
          ...prev,
          { value: brand.id, label: `${brand.id}-${brand.brand_code}-${brand.brand_name}` },
        ]),
      ),
    );
  }, []);
  return (
    <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
      <ProFormText
        name="store_code"
        label="Mã cửa hàng"
        rules={[
          {
            required: true,
            type: 'string',
            message: 'Vui lòng nhập mã cửa hàng',
          },
        ]}
        initialValue={store ? store.store_name : ''}
        placeholder="Nhập mã cửa hàng"
      />
      <ProFormText
        rules={[
          {
            required: true,
            type: 'string',
            message: 'Vui lòng nhập tên cửa hàng',
          },
        ]}
        name="store_name"
        label="Tên cửa hàng"
        initialValue={store ? store.store_code : ''}
        placeholder="Nhập tên cửa hàng"
      />
      <ProFormSelect
        initialValue={store ? store.brandid : null}
        placeholder="Chọn mã thương hiệu"
        options={selectList}
        width="lg"
        name="brandid"
        label="Mã thương hiệu"
      />
    </div>
  );
};

export default FormStore;
