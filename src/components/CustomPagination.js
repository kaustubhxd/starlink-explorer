import React from 'react'
import CustomSpinner from './CustomSpinner'
import { ConfigProvider, Pagination, Select } from 'antd'
import CustomSelect from './CustomSelect'

const CustomPagination = ({starlinkData, loading, onPageChange, onLimitChange}) => {


  return (
    <div className='my-2 flex'>
        <CustomSpinner spinning={loading}>
            <ConfigProvider
            theme={{
                token: {
                colorPrimary: '#56ED5C',
                colorBgContainer: 'black',
                colorBgTextActive: '#56ED5C',
                colorText: 'white',
                colorBorder: 'transparent',
                colorBgElevated: 'black',
                colorTextDisabled: 'gray',
                },
            }}
            >
                <Pagination
                    size="default" 
                    showSizeChanger={false}
                    total={starlinkData?.totalDocs || 0} 
                    current={starlinkData?.page || 0}
                    showTotal={(total, range) => total > 0 ? `${range[0]}-${range[1]} of ${total} items` : '0 results'}
                    pageSize={starlinkData?.limit || 0}
                    onChange={onPageChange}
                />
            </ConfigProvider>
        </CustomSpinner>

        <CustomSelect 
            disabled={loading}
            value={starlinkData?.limit}
            onChange={onLimitChange}
            options={[
                { value: 10, label: '10 / page' },
                { value: 20, label: '20 / page' },
                { value: 50, label: '50 / page' },
            ]}
        />
    </div>
  )
}

export default CustomPagination