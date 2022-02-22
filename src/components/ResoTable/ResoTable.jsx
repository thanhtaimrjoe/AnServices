import React, { useRef, useState } from 'react';
import { Space } from 'antd';
import ProTable from '@ant-design/pro-table';
import { buildParamsWithPro, getTableData } from '@/utils/utils';
import { useHistory, useIntl } from 'umi';
import { useDebounceFn } from '@umijs/hooks';
import AsyncButton from '../AsyncButton';

const ResoTable = ({
  Parameters,
  resource,
  additionParams = {},
  isShowSelection = true,
  rowSelection,
  tableAlertOptionRender,
  tableAlertRender,
  toolBarRender,
  actionRef,
  columns,
  request,
  formRefInstance,
  pagination,
  dataSource,
  additionOptions,
  confirmProps,
  onDeleteSelection,
  onChangeFormItem,
  ...others
}) => {
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('SEARCH_QUERY') || '?');
  const { formatMessage } = useIntl();
  const ref = useRef();
  const history = useHistory();
  const { run: changeSearch } = useDebounceFn(
    () => {
      ref?.current?.submit();
    },
    [ref],
    500,
  );
  const [selectedRows, setSelectedRows] = useState(rowSelection?.initSelectedRows ?? []);

  const rowSelectionProps = rowSelection ?? {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
    ...rowSelection,
  };

  const defaultTableAlertOption = ({ onCleanSelected }) => {
    return [
      <AsyncButton
        key="confirm-button"
        isNeedConfirm={confirmProps}
        btnProps={{ danger: true, type: 'link' }}
        onClick={() => onDeleteSelection(selectedRows).then(onCleanSelected)}
        title={`Delete ${selectedRows.length + 1}`}
      />,
    ];
  };

  const tableAlertOptionRenderProps =
    tableAlertOptionRender === undefined ? defaultTableAlertOption : tableAlertOptionRender;

  const [columnsStateMap, setColumnsStateMap] = useState(() => {
    const defaultState = {};
    columns?.forEach((col, index) => {
      if (col.hasOwnProperty('show') && !col.show) {
        defaultState[index] = { show: col.show };
      }
    });
    return defaultState;
  });

  const handleConvertColumn = () => {
    const convertColumn = [];
    if (columns.length > 0) {
      columns.map((item) => {
        return convertColumn.push({
          ...item,
          title: formatMessage({ id: item.title }),
        });
      });
    }
    return convertColumn;
  };
  const setRef = (cb) => {
    ref.current = cb;
    // eslint-disable-next-line no-param-reassign
    if (formRefInstance) formRefInstance.current = cb;
  };

  return (
    <ProTable
      pagination={pagination}
      columns={[...handleConvertColumn()]}
      onLoadingChange={() => {
        history.push(`${window.location.pathname}${searchQuery}`);
      }}
      beforeSearchSubmit={(params) => {
        const formattedParams = {};
        setSearchQuery('?');
        Object.keys(params).forEach((key) => {
          const formatedKey = key.replace('_', '-');
          if (
            formatedKey !== '-timestamp' &&
            formatedKey !== 'current' &&
            formatedKey !== 'pageSize'
          ) {
            formattedParams[formatedKey] = params[key];
            setSearchQuery((prev) => [`${prev}${formatedKey}=${formattedParams[formatedKey]}&`]);
          }
        });
        return formattedParams;
      }}
      onColumnsStateChange={(currentCol) => setColumnsStateMap(currentCol)}
      form={{
        onValuesChange: () => {
          changeSearch();
        },
      }}
      tableAlertRender={tableAlertRender}
      tableAlertOptionRender={tableAlertOptionRenderProps}
      rowSelection={
        isShowSelection
          ? {
              ...rowSelectionProps,
              onChange: (selectedKey, selectedRowsSelection) => {
                setSelectedRows(selectedKey);
                if (rowSelectionProps?.onChange) {
                  rowSelectionProps?.onChange(selectedKey, selectedRowsSelection);
                }
                onChangeFormItem(selectedRowsSelection);
              },
            }
          : false
      }
      request={(params, sort, filters) => {
        if (dataSource)
          return Promise.resolve({
            data: dataSource,
            success: true,
          });
        return request(params, sort, filters, additionParams, resource, additionOptions, Parameters);
      }}
      scroll={{
        x: 500,
        y: 700,
      }}
      search={{
        layout: 'vertical',
        defaultCollapsed: true,
        resetText: 'Làm mới',
        searchText:'Tìm'
      }}
      rowKey="id"
      toolBarRender={toolBarRender}
      columnsStateMap={columnsStateMap}
      actionRef={actionRef}
      formRef={setRef}
      dataSource={dataSource}
      {...others}
    />
  );
};

ResoTable.defaultProps = {
  pagination: {
    defaultPageSize: 10,
  },
  confirmProps: {
    title: 'Xác nhận xoá',
    content: 'Bạn có muốn xoá không?',
    okText: 'Xác nhận',
    cancelText: 'Huỷ',
  },
  onChangeFormItem: () => null,
  tableAlertRender: ({ onCleanSelected }) => (
    <Space size={24}>
      <span>
        <a
          style={{
            marginLeft: 8,
          }}
          onClick={onCleanSelected}
        >
          Huỷ chọn
        </a>
      </span>
    </Space>
  ),
  tableAlertOptionRender: null,
  // additionParams: { fields: ['id', 'description'] },
  request: (params, sort, filters, additionParams, resource, additionOptions = {}) => {
    const options = {
      params: {
        ...buildParamsWithPro(params, sort, filters),
        ...additionParams,
      },

      // arameters được thêm
      Parameters: {
        ...buildParamsWithPro(params, sort, filters),
        ...additionParams,
      },
      ...additionOptions,
    };
    return getTableData(resource, options);
  },
};

export default ResoTable;
