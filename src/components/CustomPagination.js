import React, { useContext } from 'react'
import CustomSpinner from './CustomSpinner'
import { ConfigProvider, Pagination } from 'antd'
import CustomSelect from './CustomSelect'
import { MyContext } from '../store/Context'

const CustomPagination = ({ loading, onPageChange, onLimitChange }) => {
  const { starlinkData: data } = useContext(MyContext)

  return (
        <div className='my-2 flex lg:flex-row flex-col px-4'>
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
                    colorTextDisabled: 'gray'
                  }
                }}
                >
                    <div className='flex items-center justify-center mt-1'>
                        <Pagination
                            size="default"
                            responsive
                            showSizeChanger={false}
                            total={data?.totalDocs || 0}
                            current={data?.page || 0}
                            showTotal={(total, range) => total > 0 ? `${range[0]}-${range[1]} of ${total} items` : '0 results'}
                            pageSize={data?.limit || 0}
                            onChange={onPageChange}
                        />
                    </div>
                </ConfigProvider>
            </CustomSpinner>

            <div className='lg:w-[unset] w-full flex items-center justify-center'>
                <CustomSelect
                    disabled={loading}
                    value={data?.limit}
                    onChange={onLimitChange}
                    style={{
                      width: '110px'
                    }}
                    className='lg:my-0 my-2'
                    options={[
                      { value: 10, label: '10 / page' },
                      { value: 20, label: '20 / page' },
                      { value: 50, label: '50 / page' }
                    ]}
                />
            </div>
        </div>
  )
}

export default CustomPagination
